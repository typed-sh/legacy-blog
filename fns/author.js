import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'

const location = path.resolve(process.cwd(), 'contents', 'authors.yml')
const file = fs.readFileSync(location)
const authors = yaml.load(file)

export const getList = () => {
  return Object.keys(authors)
}

export const byId = identifier => {
  return authors[identifier]
}
