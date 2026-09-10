export type StoneColor = 'black' | 'white'

export type BoardPoint = {
  x: number
  y: number
}

export type PuzzleStone = BoardPoint & {
  color: StoneColor
}

export type GoPuzzleData = {
  id: string
  title: string
  description: string
  boardSize: number
  toPlay: StoneColor
  objective: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  stones: PuzzleStone[]
  solutions: BoardPoint[]
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
]

export function getPuzzleById(id: string) {
  return puzzles.find((puzzle) => puzzle.id === id)
}
