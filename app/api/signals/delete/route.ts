import { supabase } from '@/lib/supabase';

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const { data, error } = await supabase
    .from('sniper_signals')
    .delete()
    .eq('id', id)
    .select();

  return Response.json({ data, error });
}
