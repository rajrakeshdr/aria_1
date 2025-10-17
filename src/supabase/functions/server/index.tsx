import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";

const app = new Hono();

app.use("*", logger(console.log));
app.use("*", cors());

// Cybersecurity AI Search endpoint
app.post("/make-server-f8eac8da/search", async (c) => {
  try {
    const { query } = await c.req.json();

    if (!query || typeof query !== "string") {
      return c.json({ error: "Query is required and must be a string" }, 400);
    }

    const groqApiKey = Deno.env.get("GROQ_API_KEY");
    if (!groqApiKey) {
      console.error("GROQ_API_KEY environment variable is not set");
      return c.json({ error: "Server configuration error: API key not found" }, 500);
    }

    // Call Groq API with cybersecurity context
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: "You are a cybersecurity expert AI assistant. Provide detailed, accurate, and actionable information about cybersecurity topics. Focus on security best practices, threat analysis, vulnerability assessment, incident response, and defense strategies. Always prioritize security and ethical considerations in your responses."
          },
          {
            role: "user",
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 2048,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Groq API error: ${response.status} - ${errorText}`);
      return c.json({ 
        error: `Groq API error: ${response.status}`,
        details: errorText 
      }, response.status);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected Groq API response format:", data);
      return c.json({ error: "Unexpected API response format" }, 500);
    }

    return c.json({
      response: data.choices[0].message.content,
      model: data.model,
      usage: data.usage
    });

  } catch (error) {
    console.error("Error in search endpoint:", error);
    return c.json({ 
      error: "Internal server error while processing search",
      details: error.message 
    }, 500);
  }
});

// Health check endpoint
app.get("/make-server-f8eac8da/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
