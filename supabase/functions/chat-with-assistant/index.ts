
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import OpenAI from "https://esm.sh/openai@4.26.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
})

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, threadId, userInfo } = await req.json()
    
    // Use the v2 Assistants API by setting the proper header
    openai.baseOptions.headers = {
      ...openai.baseOptions.headers,
      'OpenAI-Beta': 'assistants=v2'
    }
    
    let thread
    if (!threadId) {
      // Create a new thread, optionally with metadata about the user
      const metadata = userInfo ? {
        user_id: userInfo.userId || 'anonymous',
        name: userInfo.name || undefined,
        email: userInfo.email || undefined,
        phone: userInfo.phone || undefined
      } : undefined;
      
      thread = await openai.beta.threads.create({
        metadata
      })
    } else {
      thread = { id: threadId }
    }

    // Add the message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    })

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: "asst_9fA8QCJtaSVQ05HNfpTs6IjZ",
    })

    // Poll for the run completion
    let assistantResponse = null
    while (!assistantResponse) {
      const runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
      
      if (runStatus.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(thread.id)
        assistantResponse = messages.data[0].content[0].text.value
        break
      } else if (runStatus.status === 'failed') {
        throw new Error('Assistant failed to respond')
      }
      
      // Wait before polling again
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    // Store conversation in Supabase
    // (This information can be accessed from the 'chat_conversations' table)
    // We don't need to wait for this to complete before responding
    
    return new Response(JSON.stringify({
      response: assistantResponse,
      threadId: thread.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
