import authors from '../contents/authors.yml'

export const cache = {}

export const getList = force => {
  if (cache.list && !force) {
    return cache.list
  }

  const list = Object.keys(authors)

  cache.list = list

  return list
}

export const byId = identifier => {
  const list = getList()

  if (list.indexOf(identifier) < 0) {
    return false
  }

  return authors[identifier]
}
