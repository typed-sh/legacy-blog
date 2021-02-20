import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsRoot = path.resolve(process.cwd(), './contents/posts')

export const cache = {
  post: {}
}

export const getList = force => {
  if (cache.list && !force) {
    return cache.list
  }

  const result = {}
  const folders = fs.readdirSync(postsRoot)

  for (let i = 0, l = folders.length; i < l; i++) {
    const filename = folders[i]
    const slug = filename
      .trim()
      .replace(/\W/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase()

    result[slug] = filename
  }

  cache.list = result

  return result
}

export const bySlug = slug => {
  const list = getList()

  if (!list[slug]) {
    return {}
  }
  if (cache.post[slug]) {
    return cache.post[slug]
  }

  const postPath = path.join(postsRoot, list[slug], 'index.mdx')
  const source = fs.readFileSync(postPath)
  const result = matter(source)

  result.data.slug = slug
  result.data.source = list[slug]

  cache.post[slug] = result

  return result
}
