import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('sniper_signals')
    .select('*');

  return Response.json({ data, error });
}
