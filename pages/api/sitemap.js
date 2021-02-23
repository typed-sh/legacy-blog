import sitemap from '../../fns/sitemap'

export let cache

export default async (req, res) => {
  if (!cache) {
    const data = await sitemap()

    cache = data.toString()
  }

  res.setHeader('Content-Type', 'text/xml')

  res.send(cache)
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}
