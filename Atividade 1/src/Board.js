export const goalState = [1, 2, 3, 4, 5, 6, 7, 8, ' ']

const isSolvable = (array) => {
  let inversion_counter = 0
  if (array[3] !== ' ' && array[3] > array[1]) inversion_counter += 1
  if (array[6] !== ' ' && array[6] > array[2]) inversion_counter += 1
  if (array[7] !== ' ' && array[7] > array[5]) inversion_counter += 1

  return inversion_counter > 0 && inversion_counter % 2 == 0
}

export const generateNewBoard = () => {
  let valid = false
  const board = []
  while (!valid) {
    board.splice(0, board.length)
    board.push(...generateRandomBoard([...goalState]))
    valid = isSolvable(board)
  }

  console.log('Board generated: \n')
  displayBoard(board)

  return board
}

const generateRandomBoard = (array) => {
  let currentIndex = goalState.length,
    randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export const displayBoard = (state) => {
  console.log(`| ${state[0]} | ${state[1]} | ${state[2]} |\n| ${state[3]} | ${state[4]} | ${state[5]} |\n| ${state[6]} | ${state[7]} | ${state[8]} |\n`)
}
