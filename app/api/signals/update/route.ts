import { supabase } from '@/lib/supabase';

export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, ...updates } = body;

  const { data, error } = await supabase
    .from('sniper_signals')
    .update(updates)
    .eq('id', id)
    .select();

  return Response.json({ data, error });
}
