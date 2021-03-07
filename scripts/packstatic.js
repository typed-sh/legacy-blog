console.log('Finalizing the exportion to ensure seamless experience')

const fs = require('fs')
const path = require('path')

const outRoot = path.resolve(process.cwd(), 'out')

console.log('Copying index page as rewrite rule specified')

fs.copyFileSync(
  path.join(outRoot, 'page', '1', 'index.html'),
  path.join(outRoot, 'index.html')
)
