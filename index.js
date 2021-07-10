import { expandNode, createNode } from './Node.js'
const goalState = [1, 2, 3, 4, 5, 6, 7, 8, ' ']

const displayBoard = (state) => {
  console.log(`| ${state[0]} | ${state[1]} | ${state[2]} |\n| ${state[3]} | ${state[4]} | ${state[5]} |\n| ${state[6]} | ${state[7]} | ${state[8]} |`)
}

const uniformCost = (startState, goalState) => {
  const startNode = createNode(startState, null, null, 0, 0)
  let fringe = []
  const path = []
  fringe.push(startNode)
  let current = fringe.pop()
  while (current.state != goalState) {
    const temp = expandNode(current)
    for (const node in temp) {
      node.depth += current.depth
      fringe.push(node)
    }
    fringe = fringe.sort((nodeA, nodeB) => nodeA.depth < nodeB.depth)
    current = fringe.pop(0)
  }
  while (current.parent != null) {
    path.push(0, current.operator)
    current = current.parent
  }
  return path
}

uniformCost([' ', 2, 3, 4, 5, 6, 7, 8, 1], goalState)
