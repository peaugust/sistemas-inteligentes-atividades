import { expandNode, createNode } from './Node.js'

// Adding array comparison
// Warn if overriding existing method
if (Array.prototype.equals)
  console.warn(
    "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
  )
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array) return false

  // compare lengths - can save a lot of time
  if (this.length != array.length) return false

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false
    }
  }
  return true
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, 'equals', { enumerable: false })

const goalState = [1, 2, 3, 4, 5, 6, 7, 8, ' ']

const displayBoard = (state) => {
  console.log(`| ${state[0]} | ${state[1]} | ${state[2]} |\n| ${state[3]} | ${state[4]} | ${state[5]} |\n| ${state[6]} | ${state[7]} | ${state[8]} |\n`)
}

const uniformCost = (startState, goalState) => {
  const startNode = createNode(startState, null, null, 0, 0)
  let fringe = []
  const path = []
  fringe.push(startNode)
  let current = fringe.shift()
  let iteration = 0
  console.log()
  while (!current.state.equals(goalState)) {
    console.log(`Iteration: ${iteration}`)
    console.log(`current: ${displayBoard(current.state)}`)
    const temp = expandNode(current)
    for (let node of temp) {
      console.log(`node in loop: ${displayBoard(node.state)}`)
      node.depth += current.depth
      fringe.push(node)
    }
    fringe = fringe.sort((nodeA, nodeB) => nodeA.depth < nodeB.depth)
    console.log('Fringe: ', fringe, '\n')
    current = fringe.shift()
    iteration++
    console.log('\n\n')
  }
  console.log('xanfs', current, displayBoard(current.state))
  let table = []
  while (current != null) {
    console.log(current)
    displayBoard(current.state)
    if (current.operator != null) {
      table.unshift(current.state)
      path.unshift(current.operator)
    }
    current = current.parent
  }
  console.log(path)
  for (const item of table) {
    displayBoard(item)
  }
}

uniformCost([1, 2, 3, 4, 5, 6, ' ', 7, 8], goalState)
