import { headers } from 'next/headers'

export default async function Home() {
  const host = headers().get('host')
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const baseUrl = `${protocol}://${host}`

  const res = await fetch(`${baseUrl}/api/episodes`, { cache: 'no-store' })
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
