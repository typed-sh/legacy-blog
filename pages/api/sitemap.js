import sitemap from '../../fns/sitemap'

export let cache

export default async (req, res) => {
  if (!cache) {
    const data = await sitemap()

    cache = data.toString()
  }

  res.send(cache)
  res.end()
}
