import {
  SitemapStream,
  streamToPromise
} from 'sitemap'

import * as author from './author'
import * as post from './post'

export const hostname = 'https://typed.sh'
export const changefreq = 'weekly'
export const priority = 0.8

export default async () => {
  const sitemap = new SitemapStream({
    hostname
  })

  const posts = Object.keys(post.getList())
  const authors = author.getList()

  for (let i = 0, l = posts.length; i < l; i++) {
    const slug = posts[i]
    const { data: article } = post.bySlug(slug)

    sitemap.write({
      url: '/post/' + slug,
      changefreq,
      priority,
      img: {
        url: article.thumbnail
      }
    })
  }
  for (let i = 0, l = authors.length; i < l; i++) {
    const author = authors[i]

    sitemap.write({
      url: '/author/' + author,
      changefreq,
      priority
    })
  }

  sitemap.end()

  const data = await streamToPromise(sitemap)

  return data
}
