import { moveUp, moveDown, moveLeft, moveRight } from './Moves.js'

export const createNode = (state, parent, operator, depth, cost) => {
  return { state, parent, operator, depth, cost }
}

export const expandNode = (node) => {
  const expandedNodes = []
  expandedNodes.push(createNode(moveUp(node.state), node, 'UP', node.depth + 1, 0))
  expandedNodes.push(createNode(moveDown(node.state), node, 'DOWN', node.depth + 1, 0))
  expandedNodes.push(createNode(moveLeft(node.state), node, 'LEFT', node.depth + 1, 0))
  expandedNodes.push(createNode(moveRight(node.state), node, 'RIGHT', node.depth + 1, 0))

  return expandedNodes.filter((node) => node.state !== null)
}
