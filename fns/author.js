import authors from '../contents/authors.yml'

export const getList = () => {
  return Object.keys(authors)
}

export const byId = identifier => {
  return authors[identifier]
}
