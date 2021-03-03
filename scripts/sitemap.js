console.log('Creating sitemap from directory hierarchy')

const esm = require('esm')
const fs = require('fs')
const path = require('path')

const esmImport = esm(module)

const sitemap = esmImport('../fns/sitemap')

sitemap
  .default()
  .then(data => {
    const file = path.resolve(process.cwd(), 'out/sitemap.xml')

    fs.writeFileSync(file, data.toString(), 'utf8')

    console.log('Wrote into', file)
  })
