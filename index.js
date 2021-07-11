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
  let visited = []
  let expanded = 0
  let deepestExpanded = 0
  const path = []
  fringe.push(startNode)
  let greaterFringeSize = fringe.length
  let current = fringe.shift()
  while (!current.state.equals(goalState)) {
    const temp = expandNode(current)
    expanded += temp.length
    for (let node of temp) {
      node.depth += current.depth
      if (deepestExpanded < node.depth) deepestExpanded = node.depth
      fringe.push(node)
    }
    fringe = fringe.sort((nodeA, nodeB) => nodeA.depth < nodeB.depth)
    if (fringe.length > greaterFringeSize) greaterFringeSize = fringe.length
    visited.push(current)
    current = fringe.shift()
  }

  let statesToSolution = []
  while (current != null) {
    if (current.operator != null) {
      statesToSolution.unshift(current.state)
      path.unshift(current.operator)
    }
    current = current.parent
  }

  console.log(`Number of visited nodes: ${visited.length}\n`)
  console.log(`Number of expanded nodes: ${expanded}\n`)
  console.log(`Greater fringe size: ${greaterFringeSize}\n`)
  console.log(`Deepest level expanded: ${deepestExpanded}\n`)

  console.log(`Path size: ${path.length} \n Path: ${path} \n`)
  // for (const state of statesToSolution) {
  //   displayBoard(state)
  // }
}

console.log('Uniform Cost \n')
console.time()
uniformCost([4, 1, 3, 7, 2, 5, 8, ' ', 6], goalState)
console.timeEnd()
console.time()
uniformCost([1, ' ', 2, 5, 7, 3, 4, 8, 6], goalState)
console.timeEnd()
console.log('--------------------------------------\n')
// uniformCost([7, 4, 8, ' ', 5, 2, 1, 3, 6], goalState)

const getHeuristic = (state, goal) => {
  let distanceToMatch = 0
  for (let i = 0; i < 10; i += 1) {
    if (state.state[i] != goal[i]) {
      distanceToMatch += 1
    }
  }
  state.heuristic = distanceToMatch
}

const aStar = (startState, goalState) => {
  const startNode = createNode(startState, null, null, 0, 0)
  let fringe = []
  let visited = []
  let expanded = 0
  let deepestExpanded = 0
  const path = []
  fringe.push(startNode)
  let greaterFringeSize = fringe.length
  let current = fringe.shift()
  while (!current.state.equals(goalState)) {
    const temp = expandNode(current)
    expanded += temp.length
    fringe.push(...temp)
    for (let node of fringe) {
      getHeuristic(node, goalState)
      node.heuristic += node.depth
      if (deepestExpanded < node.depth) deepestExpanded = node.depth
    }
    fringe = fringe.sort((nodeA, nodeB) => nodeA.heuristic < nodeB.heuristic)
    if (fringe.length > greaterFringeSize) greaterFringeSize = fringe.length
    visited.push(current)
    current = fringe.shift()
  }

  let statesToSolution = []
  while (current != null) {
    if (current.operator != null) {
      statesToSolution.unshift(current.state)
      path.unshift(current.operator)
    }
    current = current.parent
  }

  console.log(`Number of visited nodes: ${visited.length}\n`)
  console.log(`Number of expanded nodes: ${expanded}\n`)
  console.log(`Greater fringe size: ${greaterFringeSize}\n`)
  console.log(`Deepest level expanded: ${deepestExpanded}\n`)

  console.log(`Path size: ${path.length} \n Path: ${path} \n`)
  // for (const state of statesToSolution) {
  //   displayBoard(state)
  // }
}

console.log('A * \n')
console.time()
aStar([4, 1, 3, 7, 2, 5, 8, ' ', 6], goalState)
console.timeEnd()
console.time()
aStar([1, ' ', 2, 5, 7, 3, 4, 8, 6], goalState)
console.timeEnd()
console.log('--------------------------------------\n')

// aStar([7, 4, 8, ' ', 5, 2, 1, 3, 6], goalState)
