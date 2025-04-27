import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey);

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  let userId;
  try {
    userId = event.queryStringParameters?.id || (event.body && JSON.parse(event.body).id);
  } catch (parseErr) {
    console.error('Error parsing userId from request:', parseErr);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request body', details: String(parseErr) }),
    };
  }

  if (!userId) {
    console.error('No userId provided');
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing userId' }),
    };
  }

  console.log('Attempting to delete user:', userId);

  try {
    // Delete from admin_logs (performed_by ou target_id)
    const { error: logsError } = await supabase
      .from('admin_logs')
      .delete()
      .or(`performed_by.eq.${userId},target_id.eq.${userId}`);
    if (logsError) {
      console.error('Failed to delete from admin_logs:', logsError.message);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete admin logs', details: logsError.message }),
      };
    }
    console.log('Deleted from admin_logs:', userId);

    // Delete from profiles
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
    if (profileError) {
      console.error('Failed to delete from profiles:', profileError.message);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete profile', details: profileError.message }),
      };
    }
    console.log('Deleted from profiles:', userId);

    // Delete from auth.users (requires service_role)
    const { error: userError } = await supabase.auth.admin.deleteUser(userId);
    if (userError) {
      if (userError.message && userError.message.includes('User not found')) {
        console.warn('User not found in auth.users, treating as success:', userId);
        // Considera como sucesso
      } else {
        console.error('Failed to delete from auth.users:', userError.message);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to delete user', details: userError.message }),
        };
      }
    } else {
      console.log('Deleted from auth.users:', userId);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err: any) {
    let message = 'Unknown error';
    if (err && typeof err === 'object' && 'message' in err) {
      message = err.message;
    } else if (typeof err === 'string') {
      message = err;
    }
    console.error('Unexpected error in deleteUser:', message, err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unexpected error', details: message }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};

export { handler }; 