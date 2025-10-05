import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-024db3b8/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-024db3b8/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Error creating user during signup: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Store user in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      createdAt: new Date().toISOString()
    });

    return c.json({ user: data.user });
  } catch (error) {
    console.log(`Unexpected error during signup: ${error}`);
    return c.json({ error: "Signup failed" }, 500);
  }
});

// Get all threads for a user
app.get("/make-server-024db3b8/threads", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get thread IDs for user
    const threadIds = await kv.get(`user_threads:${user.id}`) || [];
    
    // Get all threads
    const threads = await kv.mget(threadIds.map((id: string) => `thread:${id}`));
    
    // Sort by updatedAt descending
    const sortedThreads = threads
      .filter(t => t !== null)
      .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return c.json({ threads: sortedThreads });
  } catch (error) {
    console.log(`Error fetching threads: ${error}`);
    return c.json({ error: "Failed to fetch threads" }, 500);
  }
});

// Get messages for a thread
app.get("/make-server-024db3b8/threads/:threadId/messages", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const threadId = c.req.param('threadId');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get message IDs for thread
    const messageIds = await kv.get(`thread_messages:${threadId}`) || [];
    
    // Get all messages
    const messages = await kv.mget(messageIds.map((id: string) => `message:${id}`));
    
    // Sort by createdAt ascending
    const sortedMessages = messages
      .filter(m => m !== null)
      .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return c.json({ messages: sortedMessages });
  } catch (error) {
    console.log(`Error fetching messages: ${error}`);
    return c.json({ error: "Failed to fetch messages" }, 500);
  }
});

// Create a new thread
app.post("/make-server-024db3b8/threads", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { title } = await c.req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const threadId = crypto.randomUUID();
    const now = new Date().toISOString();

    const thread = {
      id: threadId,
      userId: user.id,
      title: title || "New Chat",
      createdAt: now,
      updatedAt: now
    };

    // Save thread
    await kv.set(`thread:${threadId}`, thread);

    // Add to user's threads
    const userThreads = await kv.get(`user_threads:${user.id}`) || [];
    userThreads.unshift(threadId);
    await kv.set(`user_threads:${user.id}`, userThreads);

    // Initialize empty messages array
    await kv.set(`thread_messages:${threadId}`, []);

    return c.json({ thread });
  } catch (error) {
    console.log(`Error creating thread: ${error}`);
    return c.json({ error: "Failed to create thread" }, 500);
  }
});

// Chat endpoint - send message and get AI response
app.post("/make-server-024db3b8/chat", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { threadId, message } = await c.req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get thread to verify ownership
    const thread = await kv.get(`thread:${threadId}`);
    if (!thread || thread.userId !== user.id) {
      return c.json({ error: 'Thread not found or unauthorized' }, 404);
    }

    // Save user message
    const userMessageId = crypto.randomUUID();
    const userMessage = {
      id: userMessageId,
      threadId,
      userId: user.id,
      role: 'user',
      content: message,
      createdAt: new Date().toISOString()
    };
    await kv.set(`message:${userMessageId}`, userMessage);

    // Add to thread messages
    const threadMessages = await kv.get(`thread_messages:${threadId}`) || [];
    threadMessages.push(userMessageId);

    // Get last 5 messages for context
    const lastMessageIds = threadMessages.slice(-5);
    const contextMessages = await kv.mget(lastMessageIds.map((id: string) => `message:${id}`));
    
    const formattedContext = contextMessages
      .filter(m => m !== null)
      .map((m: any) => ({
        role: m.role,
        content: m.content
      }));

    // Add current user message to context
    formattedContext.push({ role: 'user', content: message });

    // Call Groq API
    const groqApiKey = Deno.env.get('GROQ_API_KEY');
    if (!groqApiKey) {
      return c.json({ error: 'GROQ_API_KEY not configured' }, 500);
    }

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: formattedContext,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.log(`Groq API error: ${errorText}`);
      return c.json({ error: 'Failed to get AI response' }, 500);
    }

    const groqData = await groqResponse.json();
    const aiContent = groqData.choices[0].message.content;

    // Save AI message
    const aiMessageId = crypto.randomUUID();
    const aiMessage = {
      id: aiMessageId,
      threadId,
      userId: user.id,
      role: 'assistant',
      content: aiContent,
      createdAt: new Date().toISOString()
    };
    await kv.set(`message:${aiMessageId}`, aiMessage);

    // Add AI message to thread
    threadMessages.push(aiMessageId);
    await kv.set(`thread_messages:${threadId}`, threadMessages);

    // Update thread timestamp
    thread.updatedAt = new Date().toISOString();

    // Auto-generate title if this is the first message
    if (threadMessages.length === 2 && thread.title === "New Chat") {
      // Use first few words of user message as title
      const words = message.split(' ').slice(0, 6).join(' ');
      thread.title = words.length < message.length ? words + '...' : words;
    }

    await kv.set(`thread:${threadId}`, thread);

    return c.json({ 
      userMessage, 
      aiMessage,
      thread 
    });
  } catch (error) {
    console.log(`Error in chat endpoint: ${error}`);
    return c.json({ error: "Chat request failed" }, 500);
  }
});

Deno.serve(app.fetch);