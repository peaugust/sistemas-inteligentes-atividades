import { moveUp, moveDown, moveLeft, moveRight } from './Moves.js'

export const createNode = (state, parent, operator, depth, cost) => {
  return { state, parent, operator, depth, cost }
}

export const expandNode = (node, visitedNodes) => {
  const expandedNodes = []
  const mirrorMoves = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' }

  expandedNodes.push(createNode(moveUp(node.state), node, 'UP', node.depth + 1, 0))
  expandedNodes.push(createNode(moveDown(node.state), node, 'DOWN', node.depth + 1, 0))
  expandedNodes.push(createNode(moveLeft(node.state), node, 'LEFT', node.depth + 1, 0))
  expandedNodes.push(createNode(moveRight(node.state), node, 'RIGHT', node.depth + 1, 0))

  let filteredNodes = []

  if (node.operator !== null) {
    filteredNodes = expandedNodes.filter((expandedNode) => expandedNode.state !== null && expandedNode.operator !== mirrorMoves[node.operator])
  } else {
    filteredNodes = expandedNodes.filter((expandedNode) => expandedNode.state !== null)
  }

  visitedNodes.map(
    (visited) =>
      (filteredNodes = filteredNodes.filter(
        (filtered) =>
          !(
            filtered.state.length === visited.state.length &&
            filtered.state.every(function (value, index) {
              return value === visited.state[index]
            })
          )
      ))
  )

  return filteredNodes
}
