import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsRoot = path.resolve(process.cwd(), './posts')

export const cache = {}

export const getList = force => {
  if (cache.list && !force) {
    return cache.list
  }

  const result = {}
  const files = fs
    .readdirSync(postsRoot)
    .filter(filename => {
      return filename.endsWith('.mdx')
    })

  for (let i = 0, l = files.length; i < l; i++) {
    const filename = files[i]
    const slug = filename
      .trim()
      .replace(/\.mdx$/, '')
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
    return false
  }

  const postPath = path.join(postsRoot, list[slug])
  const source = fs.readFileSync(postPath)
  const result = matter(source)

  return result
}
