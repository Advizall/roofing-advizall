
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // First, add a 'contacted' column to the contact_submissions table if it doesn't exist
    await supabaseClient.rpc("add_column_if_not_exists", {
      p_table_name: "contact_submissions",
      p_column_name: "contacted",
      p_data_type: "boolean",
      p_default_value: "false"
    });

    // Then, add a 'contacted' column to the chat_conversations table if it doesn't exist
    await supabaseClient.rpc("add_column_if_not_exists", {
      p_table_name: "chat_conversations",
      p_column_name: "contacted",
      p_data_type: "boolean",
      p_default_value: "false"
    });

    // Add address column if it doesn't exist
    await supabaseClient.rpc("add_column_if_not_exists", {
      p_table_name: "contact_submissions",
      p_column_name: "address",
      p_data_type: "text",
      p_default_value: "null"
    });

    // Add city column if it doesn't exist
    await supabaseClient.rpc("add_column_if_not_exists", {
      p_table_name: "contact_submissions",
      p_column_name: "city",
      p_data_type: "text",
      p_default_value: "null"
    });

    // Add state column if it doesn't exist
    await supabaseClient.rpc("add_column_if_not_exists", {
      p_table_name: "contact_submissions",
      p_column_name: "state",
      p_data_type: "text",
      p_default_value: "null"
    });

    // Add zip_code column if it doesn't exist
    await supabaseClient.rpc("add_column_if_not_exists", {
      p_table_name: "contact_submissions",
      p_column_name: "zip_code",
      p_data_type: "text",
      p_default_value: "null"
    });

    // Add referral_source column if it doesn't exist
    await supabaseClient.rpc("add_column_if_not_exists", {
      p_table_name: "contact_submissions",
      p_column_name: "referral_source",
      p_data_type: "text",
      p_default_value: "null"
    });

    // Add other_source column if it doesn't exist
    await supabaseClient.rpc("add_column_if_not_exists", {
      p_table_name: "contact_submissions",
      p_column_name: "other_source",
      p_data_type: "text",
      p_default_value: "null"
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Database tables updated successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
