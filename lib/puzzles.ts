export type StoneColor = 'black' | 'white'

export type BoardPoint = {
  x: number
  y: number
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
  successMessage: string
  failureMessage: string
  lessonNote: string
}

export const puzzles: GoPuzzleData[] = [
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

function pointKey(point: BoardPoint) {
  return `${point.x}-${point.y}`
}

function isPointOnBoard(point: BoardPoint, boardSize: number) {
  return point.x >= 0 && point.x < boardSize && point.y >= 0 && point.y < boardSize
}

export function getPuzzleSteps(puzzle: GoPuzzleData): PuzzleStep[] {
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
  const occupied = new Set<string>()

  if (!puzzle.id.trim()) errors.push('Puzzle id is required.')
  if (puzzle.boardSize < 2) errors.push(`${puzzle.id}: boardSize must be at least 2.`)
  if (!puzzle.solutions.length && !puzzle.steps?.length) {
    errors.push(`${puzzle.id}: at least one solution or step is required.`)
  }

  for (const stone of puzzle.stones) {
    const key = pointKey(stone)

    if (!isPointOnBoard(stone, puzzle.boardSize)) {
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

      if (!isPointOnBoard(solution, puzzle.boardSize)) {
        errors.push(`${puzzle.id}: solution ${key} in step ${index + 1} is outside the board.`)
      }

      if (occupied.has(key)) {
        errors.push(`${puzzle.id}: solution ${key} in step ${index + 1} is already occupied.`)
      }
    }

    if (step.opponentReply) {
      const key = pointKey(step.opponentReply)

      if (!isPointOnBoard(step.opponentReply, puzzle.boardSize)) {
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
