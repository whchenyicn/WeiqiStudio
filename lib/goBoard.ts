import { pointKey, type BoardPoint, type PuzzleStone, type StoneColor } from './puzzles'

export type MoveResult =
  | {
      ok: true
      stones: PuzzleStone[]
      captured: PuzzleStone[]
    }
  | {
      ok: false
      reason: string
    }

function getOpponentColor(color: StoneColor): StoneColor {
  return color === 'black' ? 'white' : 'black'
}

export function getNeighbors(point: BoardPoint, boardSize: number): BoardPoint[] {
  return [
    { x: point.x, y: point.y - 1 },
    { x: point.x - 1, y: point.y },
    { x: point.x + 1, y: point.y },
    { x: point.x, y: point.y + 1 },
  ].filter((neighbor) => neighbor.x >= 0 && neighbor.x < boardSize && neighbor.y >= 0 && neighbor.y < boardSize)
}

function createStoneMap(stones: PuzzleStone[]) {
  return new Map(stones.map((stone) => [pointKey(stone), stone]))
}

export function getGroup(point: BoardPoint, stones: PuzzleStone[], boardSize: number): PuzzleStone[] {
  const stoneMap = createStoneMap(stones)
  const start = stoneMap.get(pointKey(point))

  if (!start) return []

  const group: PuzzleStone[] = []
  const visited = new Set<string>()
  const queue: BoardPoint[] = [point]

  while (queue.length > 0) {
    const current = queue.shift()
    if (!current) continue

    const key = pointKey(current)
    const stone = stoneMap.get(key)

    if (!stone || visited.has(key) || stone.color !== start.color) continue

    visited.add(key)
    group.push(stone)

    for (const neighbor of getNeighbors(current, boardSize)) {
      const neighborStone = stoneMap.get(pointKey(neighbor))

      if (neighborStone?.color === start.color) {
        queue.push(neighbor)
      }
    }
  }

  return group
}

export function getLiberties(group: PuzzleStone[], stones: PuzzleStone[], boardSize: number): BoardPoint[] {
  const stoneMap = createStoneMap(stones)
  const liberties = new Map<string, BoardPoint>()

  for (const stone of group) {
    for (const neighbor of getNeighbors(stone, boardSize)) {
      if (!stoneMap.has(pointKey(neighbor))) {
        liberties.set(pointKey(neighbor), neighbor)
      }
    }
  }

  return Array.from(liberties.values())
}

export function applyMove(stones: PuzzleStone[], move: PuzzleStone, boardSize: number): MoveResult {
  if (move.x < 0 || move.x >= boardSize || move.y < 0 || move.y >= boardSize) {
    return { ok: false, reason: 'That move is outside the board.' }
  }

  const initialStoneMap = createStoneMap(stones)

  if (initialStoneMap.has(pointKey(move))) {
    return { ok: false, reason: 'That point is already occupied.' }
  }

  let nextStones: PuzzleStone[] = [...stones, move]
  const opponentColor = getOpponentColor(move.color)
  const capturedMap = new Map<string, PuzzleStone>()

  for (const neighbor of getNeighbors(move, boardSize)) {
    const neighborStone = createStoneMap(nextStones).get(pointKey(neighbor))

    if (!neighborStone || neighborStone.color !== opponentColor) continue

    const opponentGroup = getGroup(neighbor, nextStones, boardSize)
    const opponentLiberties = getLiberties(opponentGroup, nextStones, boardSize)

    if (opponentLiberties.length === 0) {
      for (const capturedStone of opponentGroup) {
        capturedMap.set(pointKey(capturedStone), capturedStone)
      }

      nextStones = nextStones.filter((stone) => !capturedMap.has(pointKey(stone)))
    }
  }

  const ownGroup = getGroup(move, nextStones, boardSize)
  const ownLiberties = getLiberties(ownGroup, nextStones, boardSize)

  if (ownLiberties.length === 0) {
    return { ok: false, reason: 'That move has no liberties and would be suicide.' }
  }

  return {
    ok: true,
    stones: nextStones,
    captured: Array.from(capturedMap.values()),
  }
}
