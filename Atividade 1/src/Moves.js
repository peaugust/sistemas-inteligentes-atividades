// ACTIONS
const UP_MOVE = -3
const DOWN_MOVE = 3
const LEFT_MOVE = -1
const RIGHT_MOVE = +1

const isEmptyTile = (element) => element === ' '

export const moveUp = (state) => {
  const newState = [...state]
  const emptyTileIndex = newState.findIndex(isEmptyTile)
  if (emptyTileIndex !== 0 && emptyTileIndex !== 1 && emptyTileIndex !== 2) {
    const temp = newState[emptyTileIndex + UP_MOVE]
    newState[emptyTileIndex + UP_MOVE] = newState[emptyTileIndex]
    newState[emptyTileIndex] = temp
    return newState
  }
  return null
}

export const moveDown = (state) => {
  const newState = [...state]
  const emptyTileIndex = newState.findIndex(isEmptyTile)
  if (emptyTileIndex !== 6 && emptyTileIndex !== 7 && emptyTileIndex !== 8) {
    const temp = newState[emptyTileIndex + DOWN_MOVE]
    newState[emptyTileIndex + DOWN_MOVE] = newState[emptyTileIndex]
    newState[emptyTileIndex] = temp
    return newState
  }
  return null
}

export const moveLeft = (state) => {
  const newState = [...state]
  const emptyTileIndex = newState.findIndex(isEmptyTile)
  if (emptyTileIndex !== 0 && emptyTileIndex !== 3 && emptyTileIndex !== 6) {
    const temp = newState[emptyTileIndex + LEFT_MOVE]
    newState[emptyTileIndex + LEFT_MOVE] = newState[emptyTileIndex]
    newState[emptyTileIndex] = temp
    return newState
  }
  return null
}

export const moveRight = (state) => {
  const newState = [...state]
  const emptyTileIndex = newState.findIndex(isEmptyTile)
  if (emptyTileIndex !== 2 && emptyTileIndex !== 5 && emptyTileIndex !== 8) {
    const temp = newState[emptyTileIndex + RIGHT_MOVE]
    newState[emptyTileIndex + RIGHT_MOVE] = newState[emptyTileIndex]
    newState[emptyTileIndex] = temp
    return newState
  }
  return null
}
