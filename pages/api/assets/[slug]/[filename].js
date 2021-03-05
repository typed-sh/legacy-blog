import * as crypto from 'crypto'
import * as fs from 'fs'
import * as path from 'path'
import * as mime from 'mime-types'

import * as post from '../../../../fns/post'

const postsRoot = path.resolve(process.cwd(), 'contents', 'posts')
const postList = post.getList()

const etags = {}

const readBytes = (location, bytes) => {
  return new Promise((resolve, reject) => {
    fs.open(location, 'r', (status, fd) => {
      if (status) {
        reject(new Error('file is busy or unavailable:', status.message))
      }

      const buffer = Buffer.alloc(bytes)

      fs.read(fd, buffer, 0, bytes, 0, (error, x) => {
        if (error) {
          reject(new Error('cannot read bytes from file:', error))
        }

        resolve(buffer.toString('utf8', 0, x))
      })
    })
  })
}

export default async (req, res) => {
  const [slug, filename] = req.url
    .split('?')[0]
    .split('/')
    .slice(-2)
  const assetPath = path.join(postsRoot, postList[slug], filename)

  if (!fs.existsSync(assetPath)) {
    res.status(404)
    res.end()

    return
  }

  if (!etags[assetPath]) {
    const firstBytes = await readBytes(assetPath, 256)

    etags[assetPath] = crypto.createHash('md5').update(firstBytes).digest('hex')
  }

  const hash = req.headers['if-none-match']

  if (hash && hash === etags[assetPath]) {
    res.status(304)
    res.end()

    return
  }

  const stream = fs.createReadStream(assetPath)

  res.setHeader('Content-Type', mime.contentType(path.extname(assetPath)))
  res.setHeader('ETag', etags[assetPath])

  stream.pipe(res)
}

export const config = {
  api: {
    bodyParser: false
  }
}
