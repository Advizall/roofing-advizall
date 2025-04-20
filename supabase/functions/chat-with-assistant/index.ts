
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import OpenAI from "https://esm.sh/openai@4.26.0"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
})

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, threadId, userInfo } = await req.json()
    
    // Set the header explicitly for Assistants v2
    const customHeaders = { 'OpenAI-Beta': 'assistants=v2' }
    
    let thread, conversationId
    if (!threadId) {
      // Create a new thread
      thread = await openai.beta.threads.create({}, {
        headers: customHeaders
      })
      
      const { data: conversation, error: conversationError } = await supabase
        .from('chat_conversations')
        .insert([{
          thread_id: thread.id,
          user_name: userInfo?.name,
          user_email: userInfo?.email,
          user_phone: userInfo?.phone
        }])
        .select('id')
        .single()
      
      if (conversationError) throw conversationError
      conversationId = conversation.id
    } else {
      thread = { id: threadId }
      // Get existing conversation ID
      const { data: conversation } = await supabase
        .from('chat_conversations')
        .select('id')
        .eq('thread_id', threadId)
        .single()
      
      conversationId = conversation?.id
    }

    // Store user message
    await supabase
      .from('chat_messages')
      .insert([{
        conversation_id: conversationId,
        content: message,
        sender: 'user'
      }])

    // Add the message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    }, {
      headers: customHeaders
    })

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: "asst_9fA8QCJtaSVQ05HNfpTs6IjZ",
    }, {
      headers: customHeaders
    })

    // Poll for the run completion
    let assistantResponse = null
    let attempts = 0
    const maxAttempts = 30 // Timeout after ~30 seconds
    
    while (!assistantResponse && attempts < maxAttempts) {
      attempts++
      const runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id, {
        headers: customHeaders
      })
      
      if (runStatus.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(thread.id, {
          headers: customHeaders
        })
        if (messages.data.length > 0 && messages.data[0].content.length > 0) {
          assistantResponse = messages.data[0].content[0].text.value
          
          // Store assistant message
          await supabase
            .from('chat_messages')
            .insert([{
              conversation_id: conversationId,
              content: assistantResponse,
              sender: 'assistant'
            }])
        }
        break
      } else if (runStatus.status === 'failed' || runStatus.status === 'cancelled') {
        throw new Error(`Assistant run ${runStatus.status}: ${runStatus.last_error?.message || 'Unknown error'}`)
      }
      
      // Wait before polling again
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    if (!assistantResponse) {
      throw new Error('Assistant response timeout or no content returned')
    }
    
    return new Response(JSON.stringify({
      response: assistantResponse,
      threadId: thread.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'Failed to send message. Please try again.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
