import { useState } from 'react'

const useInput = value => {
  const [state, setState] = useState(value)

  const handleInput = event => setState(event.target.value)

  return [
    state,
    handleInput
  ]
}

export default useInput
