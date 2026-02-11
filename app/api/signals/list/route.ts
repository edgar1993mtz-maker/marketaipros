import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('sniper_signals')
    .select('*')
    .order('created_at', { ascending: false });

  return Response.json({ data, error });
}
