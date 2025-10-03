import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2";

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
app.get("/make-server-448e58af/health", (c) => {
  return c.json({ status: "ok" });
});

// Signup endpoint
app.post("/make-server-448e58af/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Sign in the user to get access token
    const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('Sign in after signup error:', signInError);
      return c.json({ error: signInError.message }, 400);
    }

    return c.json({
      user: data.user,
      access_token: sessionData.session?.access_token,
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    return c.json({ error: error.message || 'Failed to create account' }, 500);
  }
});

// Groq API search endpoint
app.post("/make-server-448e58af/search", async (c) => {
  try {
    const { query, context } = await c.req.json();

    if (!query) {
      return c.json({ error: "Query is required" }, 400);
    }

    const groqApiKey = Deno.env.get('GROQ_API_KEY');
    
    if (!groqApiKey) {
      return c.json({ 
        error: "GROQ_API_KEY not configured",
        response: "I'm a demo AI response. Configure GROQ_API_KEY to use real AI search capabilities. Your query: " + query 
      }, 200);
    }

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a cybersecurity AI assistant. Provide helpful, accurate information about security topics, threat analysis, and incident response. Be concise but thorough.',
          },
          {
            role: 'user',
            content: query + (context ? `\n\nContext: ${context}` : ''),
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API error:', errorData);
      return c.json({ error: 'Failed to get AI response', details: errorData }, response.status);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'No response generated';

    return c.json({
      response: aiResponse,
      model: data.model,
      usage: data.usage,
    });
  } catch (error: any) {
    console.error('Search error:', error);
    return c.json({ error: error.message || 'Failed to process search' }, 500);
  }
});

Deno.serve(app.fetch);