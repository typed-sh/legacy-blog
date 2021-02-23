export const initialToUpperCase = text => {
  return text[0].toUpperCase() + text.slice(1)
}
export const startsWithUpperCase = text => {
  return text[0] === text[0].toUpperCase()
}

export const initialToLowerCase = text => {
  return text[0].toLowerCase() + text.slice(1)
}
export const startsWithLowerCase = text => {
  return text[0] === text[0].toLowerCase()
}
