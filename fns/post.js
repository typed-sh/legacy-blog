import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'

const postsRoot = path.resolve(process.cwd(), './contents/posts')

export const groupSize = 10

export const cache = {}

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

  return cache.list
}

export const getGroupCount = force => {
  if (cache.groupCount && !force) {
    return cache.groupCount
  }

  cache.groupCount = Math.ceil(Object.keys(getList()).length / groupSize)

  return cache.groupCount
}

export const bySlug = slug => {
  const list = getList()

  if (!list[slug]) {
    return
  }

  const postPath = path.join(postsRoot, list[slug], 'index.mdx')
  const source = fs.readFileSync(postPath)
  const result = matter(source)

  result.data.slug = slug
  result.data.source = list[slug]
  result.data.date = new Date(result.data.date).getTime()

  return result
}

export const byAuthor = (author, force) => {
  const key = 'list_' + author

  if (cache[key] && !force) {
    return cache[key]
  }

  const list = Object.keys(getList())
  const result = []

  for (let i = 0, l = list.length; i < l; i++) {
    const slug = list[i]
    const { data } = bySlug(slug)

    if (data.author === author) {
      result.push(data)
    }
  }

  cache[key] = result

  return result
}
