export type StoneColor = 'black' | 'white'

export type BoardPoint = {
  x: number
  y: number
}

export type BoardViewport = {
  xStart: number
  yStart: number
  width: number
  height: number
}

export type PuzzleStone = BoardPoint & {
  color: StoneColor
}

export type PuzzleReply = BoardPoint & {
  color?: StoneColor
  message?: string
}

export type PuzzleStep = {
  prompt: string
  solutions: BoardPoint[]
  successMessage: string
  opponentReply?: PuzzleReply
}

export type ParsedSgfMove = BoardPoint & {
  color: StoneColor
}

export type ParsedSgfPuzzle = {
  boardSize: number
  toPlay: StoneColor
  stones: PuzzleStone[]
  moves: ParsedSgfMove[]
}

export type GoPuzzleData = {
  id: string
  title: string
  description: string
  boardSize: number
  toPlay: StoneColor
  objective: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category?: string
  tags?: string[]
  stones: PuzzleStone[]
  solutions: BoardPoint[]
  steps?: PuzzleStep[]
  sgf?: string
  viewport?: BoardViewport
  successMessage: string
  failureMessage: string
  lessonNote: string
}

const topRightCornerViewport: BoardViewport = {
  xStart: 10,
  yStart: 0,
  width: 9,
  height: 9,
}

export const puzzles: GoPuzzleData[] = [
  {
    id: 'sgf-atari-corner-001',
    title: 'Corner Atari Sequence',
    description: 'Black to play on a cropped corner of a full 19×19 board. Follow the forcing sequence.',
    boardSize: 19,
    toPlay: 'black',
    objective: 'Use the SGF sequence to put White under pressure, then continue after White replies.',
    difficulty: 'Beginner',
    category: 'Atari',
    tags: ['sgf', 'atari', 'corner', 'sequence'],
    stones: [],
    solutions: [],
    sgf: '(;SZ[19]PL[B]AB[qc][pd]AW[qd];B[rd];W[qe];B[re])',
    viewport: topRightCornerViewport,
    successMessage: 'Correct. You completed the SGF sequence and kept pressure in the corner.',
    failureMessage: 'Not quite. Stay inside the corner shape and follow the forcing moves.',
    lessonNote: 'This puzzle uses a full 19×19 SGF position, but only the relevant 9×9 corner is shown.',
  },
  {
    id: 'atari-001',
    title: 'Find the Atari',
    description: 'Black to play. Put the white stone into atari by taking away one liberty.',
    boardSize: 5,
    toPlay: 'black',
    objective: 'Play the move that leaves White with only one liberty.',
    difficulty: 'Beginner',
    category: 'Atari',
    tags: ['atari', 'liberties', 'beginner'],
    stones: [
      { x: 2, y: 2, color: 'white' },
      { x: 2, y: 1, color: 'black' },
      { x: 1, y: 2, color: 'black' },
    ],
    solutions: [{ x: 3, y: 2 }],
    successMessage: 'Correct. White now has only one liberty, so the stone is in atari.',
    failureMessage: 'Not quite. Look for the move that removes one of White’s remaining liberties.',
    lessonNote: 'Atari means a stone or group has only one liberty left.',
  },
  {
    id: 'capture-001',
    title: 'Capture the Stone',
    description: 'Black to play. Capture the white stone by filling its last liberty.',
    boardSize: 5,
    toPlay: 'black',
    objective: 'Play on the last liberty of the surrounded white stone.',
    difficulty: 'Beginner',
    category: 'Capturing',
    tags: ['capture', 'liberties', 'beginner'],
    stones: [
      { x: 2, y: 2, color: 'white' },
      { x: 2, y: 1, color: 'black' },
      { x: 1, y: 2, color: 'black' },
      { x: 3, y: 2, color: 'black' },
    ],
    solutions: [{ x: 2, y: 3 }],
    successMessage: 'Correct. That move removes White’s final liberty and captures the stone.',
    failureMessage: 'Not quite. The capturing move must fill the white stone’s last open liberty.',
    lessonNote: 'A stone is captured when all of its liberties are occupied by the opponent.',
  },
  {
    id: 'liberty-001',
    title: 'Defend the Weak Stone',
    description: 'Black to play. Give the black stone more breathing space.',
    boardSize: 5,
    toPlay: 'black',
    objective: 'Extend from the black stone to add liberties and make it harder to capture.',
    difficulty: 'Beginner',
    category: 'Defense',
    tags: ['liberties', 'defense', 'weak stones'],
    stones: [
      { x: 2, y: 2, color: 'black' },
      { x: 2, y: 1, color: 'white' },
      { x: 1, y: 2, color: 'white' },
      { x: 3, y: 2, color: 'white' },
    ],
    solutions: [{ x: 2, y: 3 }],
    successMessage: 'Correct. Extending gives Black more liberties and keeps the stone alive for now.',
    failureMessage: 'Not quite. Black is short on liberties, so look for the direct extension.',
    lessonNote: 'When your group is weak, adding liberties is often the first priority.',
  },
  {
    id: 'atari-sequence-001',
    title: 'Follow Up After Atari',
    description: 'Black to play. Put the white stone in danger, then answer White’s escape.',
    boardSize: 5,
    toPlay: 'black',
    objective: 'Play the forcing move, watch White reply, then find the follow-up.',
    difficulty: 'Beginner',
    category: 'Atari',
    tags: ['atari', 'sequence', 'forcing move', 'beginner'],
    stones: [
      { x: 2, y: 2, color: 'white' },
      { x: 2, y: 1, color: 'black' },
      { x: 1, y: 2, color: 'black' },
    ],
    solutions: [{ x: 3, y: 2 }],
    steps: [
      {
        prompt: 'Step 1: Put the white stone into atari.',
        solutions: [{ x: 3, y: 2 }],
        successMessage: 'Good. White is under pressure and must respond.',
        opponentReply: {
          x: 2,
          y: 3,
          color: 'white',
          message: 'White extends to create more liberties.',
        },
      },
      {
        prompt: 'Step 2: Keep the pressure on White.',
        solutions: [{ x: 3, y: 3 }],
        successMessage: 'Correct. You followed White’s escape and kept the group under pressure.',
      },
    ],
    successMessage: 'Correct. You found the forcing sequence.',
    failureMessage: 'Not quite. Follow the liberties around the white stone and keep the pressure connected.',
    lessonNote: 'Some puzzles take more than one move. After your first forcing move, watch how the opponent replies.',
  },
]

export function getPuzzleById(id: string) {
  return puzzles.find((puzzle) => puzzle.id === id)
}

export function pointKey(point: BoardPoint) {
  return `${point.x}-${point.y}`
}

function sgfColorToStoneColor(color: string): StoneColor {
  return color === 'W' ? 'white' : 'black'
}

function stoneColorToSgfColor(color: StoneColor) {
  return color === 'white' ? 'W' : 'B'
}

function sgfPointToBoardPoint(value: string): BoardPoint {
  return {
    x: value.charCodeAt(0) - 97,
    y: value.charCodeAt(1) - 97,
  }
}

function getSgfPropertyValues(sgf: string, property: string) {
  const match = sgf.match(new RegExp(`${property}((?:\\[[a-z]{2}\\])+)`))
  if (!match) return []

  return Array.from(match[1].matchAll(/\[([a-z]{2})\]/g), (valueMatch) => valueMatch[1])
}

export function parseSgfPuzzle(sgf: string): ParsedSgfPuzzle {
  const sizeMatch = sgf.match(/SZ\[(\d+)\]/)
  const playerMatch = sgf.match(/PL\[([BW])\]/)
  const boardSize = sizeMatch ? Number(sizeMatch[1]) : 19
  const toPlay = playerMatch ? sgfColorToStoneColor(playerMatch[1]) : 'black'
  const setupBlack = getSgfPropertyValues(sgf, 'AB').map((value) => ({
    ...sgfPointToBoardPoint(value),
    color: 'black' as const,
  }))
  const setupWhite = getSgfPropertyValues(sgf, 'AW').map((value) => ({
    ...sgfPointToBoardPoint(value),
    color: 'white' as const,
  }))
  const setupEndIndex = sgf.search(/;[BW]\[[a-z]{2}\]/)
  const moveSource = setupEndIndex === -1 ? '' : sgf.slice(setupEndIndex)
  const moves = Array.from(moveSource.matchAll(/;([BW])\[([a-z]{2})\]/g), (match) => ({
    ...sgfPointToBoardPoint(match[2]),
    color: sgfColorToStoneColor(match[1]),
  }))

  return {
    boardSize,
    toPlay,
    stones: [...setupBlack, ...setupWhite],
    moves,
  }
}

export function isPointOnBoard(point: BoardPoint, boardSize: number) {
  return point.x >= 0 && point.x < boardSize && point.y >= 0 && point.y < boardSize
}

export function isPointInViewport(point: BoardPoint, viewport: BoardViewport) {
  return (
    point.x >= viewport.xStart &&
    point.x < viewport.xStart + viewport.width &&
    point.y >= viewport.yStart &&
    point.y < viewport.yStart + viewport.height
  )
}

export function getDefaultViewport(boardSize: number): BoardViewport {
  return {
    xStart: 0,
    yStart: 0,
    width: boardSize,
    height: boardSize,
  }
}

export function getPuzzlePosition(puzzle: GoPuzzleData): ParsedSgfPuzzle {
  if (puzzle.sgf) return parseSgfPuzzle(puzzle.sgf)

  return {
    boardSize: puzzle.boardSize,
    toPlay: puzzle.toPlay,
    stones: puzzle.stones,
    moves: [],
  }
}

export function getPuzzleSteps(puzzle: GoPuzzleData): PuzzleStep[] {
  if (puzzle.sgf) {
    const parsed = parseSgfPuzzle(puzzle.sgf)
    const playerMoves = parsed.moves.filter((move) => move.color === parsed.toPlay)

    return playerMoves.map((move, index) => ({
      prompt: index === 0 ? puzzle.objective : `Step ${index + 1}: Continue the solution sequence.`,
      solutions: [{ x: move.x, y: move.y }],
      successMessage: index === playerMoves.length - 1 ? puzzle.successMessage : 'Good. Continue the sequence.',
    }))
  }

  return puzzle.steps ?? [
    {
      prompt: puzzle.objective,
      solutions: puzzle.solutions,
      successMessage: puzzle.successMessage,
    },
  ]
}

export function validatePuzzleDefinition(puzzle: GoPuzzleData): string[] {
  const errors: string[] = []
  const parsed = getPuzzlePosition(puzzle)
  const occupied = new Set<string>()
  const viewport = puzzle.viewport ?? getDefaultViewport(parsed.boardSize)
  const sgfPlayer = stoneColorToSgfColor(parsed.toPlay)

  if (!puzzle.id.trim()) errors.push('Puzzle id is required.')
  if (parsed.boardSize < 2) errors.push(`${puzzle.id}: board size must be at least 2.`)
  if (puzzle.sgf && parsed.boardSize !== 19) errors.push(`${puzzle.id}: SGF puzzles must use SZ[19].`)
  if (puzzle.sgf && !puzzle.sgf.includes(`PL[${sgfPlayer}]`)) {
    errors.push(`${puzzle.id}: SGF puzzle must define PL[${sgfPlayer}].`)
  }
  if (viewport.width < 2 || viewport.height < 2) {
    errors.push(`${puzzle.id}: viewport must show at least 2x2 intersections.`)
  }
  if (!isPointOnBoard({ x: viewport.xStart, y: viewport.yStart }, parsed.boardSize)) {
    errors.push(`${puzzle.id}: viewport starts outside the board.`)
  }
  if (!isPointOnBoard({ x: viewport.xStart + viewport.width - 1, y: viewport.yStart + viewport.height - 1 }, parsed.boardSize)) {
    errors.push(`${puzzle.id}: viewport extends outside the board.`)
  }
  if (!parsed.moves.length && !puzzle.solutions.length && !puzzle.steps?.length) {
    errors.push(`${puzzle.id}: at least one SGF move, solution, or step is required.`)
  }

  for (const stone of parsed.stones) {
    const key = pointKey(stone)

    if (!isPointOnBoard(stone, parsed.boardSize)) {
      errors.push(`${puzzle.id}: stone ${key} is outside the board.`)
    }

    if (occupied.has(key)) {
      errors.push(`${puzzle.id}: duplicate setup stone at ${key}.`)
    }

    occupied.add(key)
  }

  const steps = getPuzzleSteps(puzzle)

  steps.forEach((step, index) => {
    if (!step.solutions.length) {
      errors.push(`${puzzle.id}: step ${index + 1} has no solutions.`)
    }

    for (const solution of step.solutions) {
      const key = pointKey(solution)

      if (!isPointOnBoard(solution, parsed.boardSize)) {
        errors.push(`${puzzle.id}: solution ${key} in step ${index + 1} is outside the board.`)
      }

      if (occupied.has(key)) {
        errors.push(`${puzzle.id}: solution ${key} in step ${index + 1} is already occupied.`)
      }

      if (puzzle.sgf && !isPointInViewport(solution, viewport)) {
        errors.push(`${puzzle.id}: SGF solution ${key} in step ${index + 1} is outside the visible viewport.`)
      }
    }

    if (step.opponentReply) {
      const key = pointKey(step.opponentReply)

      if (!isPointOnBoard(step.opponentReply, parsed.boardSize)) {
        errors.push(`${puzzle.id}: opponent reply ${key} in step ${index + 1} is outside the board.`)
      }

      if (occupied.has(key)) {
        errors.push(`${puzzle.id}: opponent reply ${key} in step ${index + 1} is already occupied.`)
      }
    }
  })

  return errors
}

export function validatePuzzles(puzzleList = puzzles) {
  return puzzleList.flatMap(validatePuzzleDefinition)
}
