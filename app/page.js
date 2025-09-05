export default async function Home() {
  const maintenance = process.env.MAINTENANCE_MODE === 'true'

  if (maintenance) {
    return (
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>🚧 Site under maintenance</h1>
        <p>Please check back soon.</p>
      </main>
    )
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/episodes`, {
    cache: 'no-store',
  })
  const { episodes } = await res.json()

  return (
    <main style={{ padding: '2rem' }}>
      <h1>The Seen and the Unseen</h1>
      <ul>
        {episodes.map((ep) => (
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
