import { supabaseServer } from '@/lib/supabaseServer'

export default async function Home() {
  // maintenance toggle
  if (process.env.MAINTENANCE_MODE === 'true') {
    return (
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>🚧 Site under maintenance</h1>
        <p>Please check back soon.</p>
      </main>
    )
  }

  // direct DB query
  const { data: episodes, error } = await supabaseServer
    .from('episode')
    .select('id, number, title, url')
    .order('number', { ascending: false })
    .limit(10)

  if (error) {
    console.error('Supabase error:', error)
    return (
      <main style={{ padding: '2rem' }}>
        <h2>Failed to load episodes</h2>
      </main>
    )
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>The Seen and the Unseen</h1>
      <ul>
        {episodes.map(ep => (
          <li key={ep.id}>
            <a href={ep.url} target="_blank" rel="noopener noreferrer">
              Episode {ep.number}: {ep.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
