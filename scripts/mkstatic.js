console.log('Copying static assets from post directory')

const esm = require('esm')
const fs = require('fs')
const path = require('path')

const esmImport = esm(module)

const post = esmImport('../fns/post')

const postsRoot = path.resolve(process.cwd(), 'contents', 'posts')
const assetsRoot = path.resolve(process.cwd(), 'out', 'post')

const list = post.getList()
const slugs = Object.keys(list)

for (let i = 0, l = slugs.length; i < l; i++) {
  const slug = slugs[i]
  const dir = list[slug]

  const postDir = path.join(postsRoot, dir)
  const assetsDir = path.join(assetsRoot, slug)
  const assets = fs
    .readdirSync(postDir)
    .filter(filename => filename !== 'index.mdx')

  console.log('Found new post:', slug, 'with', assets.length, 'assets')

  for (let k = 0, s = assets.length; k < s; k++) {
    const origin = path.join(postDir, assets[k])
    const target = path.join(assetsDir, assets[k])

    console.log('Copying', origin, 'to', target)

    fs.copyFileSync(origin, target)
  }
}
