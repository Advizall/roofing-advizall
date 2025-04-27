
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type AdminLogInsert = Database['public']['Tables']['admin_logs']['Insert'];

/**
 * Utility function to create admin log entries
 */
export const createAdminLog = async (
  action: string,
  targetId: string | null,
  details: Record<string, any>
): Promise<void> => {
  try {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user.id;

    if (!userId) {
      console.error('Cannot create admin log: No authenticated user');
      return;
    }

    const adminLog: AdminLogInsert = {
      action,
      performed_by: userId,
      target_id: targetId,
      details: details as any,
    };

    const { error } = await supabase.from('admin_logs').insert(adminLog);
    
    if (error) {
      console.error('Error creating admin log:', error);
    }
  } catch (error) {
    console.error('Error in createAdminLog:', error);
  }
};
