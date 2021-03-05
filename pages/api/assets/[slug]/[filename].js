import * as fs from 'fs'
import * as path from 'path'

import * as post from '../../../../fns/post'

const postsRoot = path.resolve(process.cwd(), 'contents', 'posts')
const postList = post.getList()

export default async (req, res) => {
  const [slug, filename] = req.url
    .split('?')[0]
    .split('/')
    .slice(-2)
  const assetPath = path.join(postsRoot, postList[slug], filename)

  if (!fs.existsSync(assetPath)) {
    res.status(404)
    res.end()
  }

  fs
    .createReadStream(assetPath)
    .pipe(res)
}

export const config = {
  api: {
    bodyParser: false
  }
}
