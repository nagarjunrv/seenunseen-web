import { supabaseServer } from '@/lib/supabaseServer'

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from('episode')
      .select('id, number, title, url')
      .order('number', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Supabase error:', error)
      return new Response(JSON.stringify({ error: 'Database query failed' }), { status: 500 })
    }

    return Response.json({ episodes: data ?? [] })
  } catch (err) {
    console.error('Unexpected error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 })
  }
}
