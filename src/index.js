import { expandNode, createNode } from './Node.js'
import { goalState, displayBoard, generateNewBoard } from './Board.js'

const uniformCost = (startState, goalState) => {
  console.log('----------- Running Uniform Cost -----------')

  console.time()
  const startNode = createNode(startState, null, null, 0, 0)
  let fringe = []
  let visited = []
  let expanded = 0
  let deepestExpanded = 0
  const path = []
  fringe.push(startNode)
  let greaterFringeSize = fringe.length
  let current = fringe.shift()
  while (
    !(
      current.state.length === goalState.length &&
      current.state.every(function (value, index) {
        return value === goalState[index]
      })
    )
  ) {
    const temp = expandNode(current, visited)
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
  console.timeEnd()
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
  for (const state of statesToSolution) {
    displayBoard(state)
  }
}

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
  console.log('----------- Running A* -----------')
  console.time()
  const startNode = createNode(startState, null, null, 0, 0)
  let fringe = []
  let visited = []
  let expanded = 0
  let deepestExpanded = 0
  const path = []
  fringe.push(startNode)
  let greaterFringeSize = fringe.length
  let current = fringe.shift()
  while (
    !(
      current.state.length === goalState.length &&
      current.state.every(function (value, index) {
        return value === goalState[index]
      })
    )
  ) {
    const temp = expandNode(current, visited)
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
  console.timeEnd()
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
  for (const state of statesToSolution) {
    displayBoard(state)
  }
}

const getHeuristicSpecialization = (node, goal) => {
  let distanceToMatch = 0
  const lines = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, ' '],
  ]
  let currentLine = null
  let currentColumn = null

  for (let i = 0; i < 10; i += 1) {
    if (node.state[i] != goal[i]) {
      lines.map((line, index) => {
        if (line.includes(node.state[i])) {
          currentLine = index + 1
          currentColumn = line.indexOf(node.state[i]) + 1
          distanceToMatch += calculateDistance(currentLine, currentColumn, node.state[i])
        }
      })
    }
  }

  node.heuristic = distanceToMatch
}

const calculateDistance = function (line, column, value) {
  switch (value) {
    case 1:
      return Math.abs(1 - line) + Math.abs(1 - column)
      break
    case 2:
      return Math.abs(1 - line) + Math.abs(2 - column)
      break
    case 3:
      return Math.abs(1 - line) + Math.abs(3 - column)
      break
    case 4:
      return Math.abs(2 - line) + Math.abs(1 - column)
      break
    case 5:
      return Math.abs(2 - line) + Math.abs(2 - column)
      break
    case 6:
      return Math.abs(2 - line) + Math.abs(3 - column)
      break
    case 7:
      return Math.abs(3 - line) + Math.abs(1 - column)
      break
    case 8:
      return Math.abs(3 - line) + Math.abs(2 - column)
      break
    default:
      return Math.abs(3 - line) + Math.abs(3 - column)
  }
}

const aStarSpecialization = (startState, goalState) => {
  console.log('----------- Running A* Special -----------')
  console.time()
  const startNode = createNode(startState, null, null, 0, 0)
  let fringe = []
  let visited = []
  let expanded = 0
  let deepestExpanded = 0
  const path = []
  fringe.push(startNode)
  let greaterFringeSize = fringe.length
  let current = fringe.shift()
  while (
    !(
      current.state.length === goalState.length &&
      current.state.every(function (value, index) {
        return value === goalState[index]
      })
    )
  ) {
    const temp = expandNode(current, visited)
    expanded += temp.length
    fringe.push(...temp)
    for (let node of fringe) {
      getHeuristicSpecialization(node, goalState)
      node.heuristic += node.depth
      if (deepestExpanded < node.depth) deepestExpanded = node.depth
    }
    fringe = fringe.sort((nodeA, nodeB) => nodeA.heuristic < nodeB.heuristic)
    if (fringe.length > greaterFringeSize) greaterFringeSize = fringe.length
    visited.push(current)
    current = fringe.shift()
  }
  console.timeEnd()
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
  for (const state of statesToSolution) {
    displayBoard(state)
  }
}

uniformCost([4, 1, 3, 7, 2, 5, 8, ' ', 6], goalState)
aStar([4, 1, 3, 7, 2, 5, 8, ' ', 6], goalState)
aStarSpecialization([4, 1, 3, 7, 2, 5, 8, ' ', 6], goalState)

let board = generateNewBoard()
uniformCost(board, goalState)
aStar(board, goalState)
aStarSpecialization(board, goalState)
