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

export type SgfTriangle = BoardPoint & {
  type: 'triangle'
}

export type SgfLabel = BoardPoint & {
  type: 'label'
  text: string
}

export type SgfMarkup = SgfTriangle | SgfLabel

export type ParsedSgfNode = {
  move?: ParsedSgfMove
  markup: SgfMarkup[]
  children: ParsedSgfNode[]
}

export type ParsedSgfPuzzle = {
  boardSize: number
  toPlay: StoneColor
  stones: PuzzleStone[]
  root: ParsedSgfNode
  markup: SgfMarkup[]
  allMoves: ParsedSgfMove[]
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
  sgfPath?: string
  viewport?: BoardViewport
  successMessage: string
  failureMessage: string
  lessonNote: string
}

export const puzzles: GoPuzzleData[] = [
  {
    id: 'triangles',
    title: 'SGF Triangle Markup Test',
    description: 'A display test for triangle markup loaded directly from SGF.',
    boardSize: 19,
    toPlay: 'black',
    objective: 'Inspect the triangle markers and their alignment with stones and intersections.',
    difficulty: 'Beginner',
    category: 'SGF Test',
    tags: ['sgf', 'markup', 'triangles'],
    stones: [],
    solutions: [],
    sgfPath: '/puzzles/triangles.sgf',
    successMessage: 'Triangle markup loaded correctly.',
    failureMessage: 'This SGF is a markup display test.',
    lessonNote: 'Triangle markers are read from the SGF TR property and do not affect board state.',
  },
  {
    id: 'alphabets',
    title: 'SGF Alphabet Label Test',
    description: 'A display test for alphabet labels loaded directly from SGF.',
    boardSize: 19,
    toPlay: 'black',
    objective: 'Inspect the alphabet labels and their alignment with stones and intersections.',
    difficulty: 'Beginner',
    category: 'SGF Test',
    tags: ['sgf', 'markup', 'labels'],
    stones: [],
    solutions: [],
    sgfPath: '/puzzles/alphabets.sgf',
    successMessage: 'Alphabet labels loaded correctly.',
    failureMessage: 'This SGF is a markup display test.',
    lessonNote: 'Alphabet labels are read from the SGF LB property and do not affect board state.',
  },
  {
    id: 'numbers',
    title: 'SGF Number Label Test',
    description: 'A display test for numeric labels loaded directly from SGF.',
    boardSize: 19,
    toPlay: 'black',
    objective: 'Inspect the numeric labels and their alignment with stones and intersections.',
    difficulty: 'Beginner',
    category: 'SGF Test',
    tags: ['sgf', 'markup', 'labels', 'numbers'],
    stones: [],
    solutions: [],
    sgfPath: '/puzzles/numbers.sgf',
    successMessage: 'Numeric labels loaded correctly.',
    failureMessage: 'This SGF is a markup display test.',
    lessonNote: 'Numeric labels use the same SGF LB property as alphabet labels.',
  },
  {
    id: 'variations',
    title: 'SGF Variation Tree Test',
    description: 'Black to play. The first SGF variation is correct; the other recorded branches remain playable.',
    boardSize: 19,
    toPlay: 'black',
    objective: 'Choose a recorded SGF branch and follow it to the end.',
    difficulty: 'Beginner',
    category: 'SGF Test',
    tags: ['sgf', 'variations', 'branches'],
    stones: [],
    solutions: [],
    sgfPath: '/puzzles/variations.sgf',
    successMessage: 'Correct. You completed the first SGF variation.',
    failureMessage: 'That move is not part of any available SGF variation.',
    lessonNote: 'The first SGF variation is treated as correct. Other recorded variations are playable but finish as incorrect.',
  },
  {
    id: 'puzzle1',
    title: 'Uploaded Test Puzzle 1',
    description: 'Black to play from an uploaded SGF test position.',
    boardSize: 13,
    toPlay: 'black',
    objective: 'Find the capturing move from the SGF main line.',
    difficulty: 'Beginner',
    category: 'Capturing',
    tags: ['sgf', 'uploaded', 'capture'],
    stones: [],
    solutions: [],
    sgfPath: '/puzzles/puzzle1.sgf',
    successMessage: 'Correct. You found the SGF solution move.',
    failureMessage: 'Not quite. Look for the move that removes the last liberty.',
    lessonNote: 'This uploaded SGF uses a 13×13 board and is shown through an auto-centered 9×9 crop.',
  },
  {
    id: 'puzzle2',
    title: 'Uploaded Test Puzzle 2',
    description: 'Black to play from an uploaded SGF test position.',
    boardSize: 13,
    toPlay: 'black',
    objective: 'Find the move that captures the connected white stones.',
    difficulty: 'Beginner',
    category: 'Capturing',
    tags: ['sgf', 'uploaded', 'group capture'],
    stones: [],
    solutions: [],
    sgfPath: '/puzzles/puzzle2.sgf',
    successMessage: 'Correct. The white group is captured.',
    failureMessage: 'Not quite. Connected stones are captured when all group liberties are gone.',
    lessonNote: 'This uploaded SGF uses a 13×13 board and is shown through an auto-centered 9×9 crop.',
  },
  {
    id: 'puzzle3',
    title: 'Uploaded Test Puzzle 3',
    description: 'Black to play from an uploaded SGF sequence.',
    boardSize: 13,
    toPlay: 'black',
    objective: 'Follow the SGF main sequence and continue after White replies.',
    difficulty: 'Beginner',
    category: 'Capturing',
    tags: ['sgf', 'uploaded', 'sequence'],
    stones: [],
    solutions: [],
    sgfPath: '/puzzles/puzzle3.sgf',
    successMessage: 'Correct. You completed the uploaded SGF sequence.',
    failureMessage: 'Not quite. Follow the forcing sequence in the visible shape.',
    lessonNote: 'This uploaded SGF uses a 13×13 board and is shown through an auto-centered 9×9 crop.',
  },
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
    sgfPath: '/puzzles/sgf-atari-corner-001.sgf',
    successMessage: 'Correct. You completed the SGF sequence and kept pressure in the corner.',
    failureMessage: 'Not quite. Stay inside the corner shape and follow the forcing moves.',
    lessonNote: 'This puzzle uses a full 19×19 SGF position, but only the relevant 9×9 corner is shown.',
  },
  {
    id: 'sgf-capture-single-001',
    title: 'Capture a Corner Stone',
    description: 'Black to play on a full 19×19 board. Capture White by filling the final liberty.',
    boardSize: 19,
    toPlay: 'black',
    objective: 'Find the move that removes White’s last liberty in the corner.',
    difficulty: 'Beginner',
    category: 'Capturing',
    tags: ['sgf', 'capture', 'corner', 'liberties'],
    stones: [],
    solutions: [],
    sgfPath: '/puzzles/sgf-capture-single-001.sgf',
    successMessage: 'Correct. The white stone has no liberties and is removed from the board.',
    failureMessage: 'Not quite. Look for the final open liberty beside the white stone.',
    lessonNote: 'Captures are now calculated on the full 19×19 board, even when only one corner is visible.',
  },
  {
    id: 'sgf-capture-group-001',
    title: 'Capture the Small Group',
    description: 'Black to play. Capture two connected white stones by filling their shared final liberty.',
    boardSize: 19,
    toPlay: 'black',
    objective: 'Play the move that removes the last liberty from the white group.',
    difficulty: 'Beginner',
    category: 'Capturing',
    tags: ['sgf', 'capture', 'group', 'liberties'],
    stones: [],
    solutions: [],
    sgfPath: '/puzzles/sgf-capture-group-001.sgf',
    successMessage: 'Correct. The whole white group is captured together.',
    failureMessage: 'Not quite. Connected stones are captured as a group when all liberties are gone.',
    lessonNote: 'A connected group is removed together when the group has no liberties.',
  },
  {
    id: 'sgf-auto-capture-001',
    title: 'Watch the Reply Capture',
    description: 'Black to play. After your move, White replies automatically and captures a stone.',
    boardSize: 19,
    toPlay: 'black',
    objective: 'Play the expected move, then watch White’s automatic reply resolve through capture logic.',
    difficulty: 'Beginner',
    category: 'Capturing',
    tags: ['sgf', 'capture', 'automatic reply'],
    stones: [],
    solutions: [],
    sgfPath: '/puzzles/sgf-auto-capture-001.sgf',
    successMessage: 'Correct. White’s reply captured the black stone through the same board engine.',
    failureMessage: 'Not quite. Follow the SGF sequence in the corner.',
    lessonNote: 'Automatic replies use the same full-board move logic as learner moves.',
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

function sgfPointToBoardPoint(value: string): BoardPoint {
  return {
    x: value.charCodeAt(0) - 97,
    y: value.charCodeAt(1) - 97,
  }
}

type SgfProperties = Record<string, string[]>

type RawSgfNode = {
  properties: SgfProperties
  children: RawSgfNode[]
}

function parseSgfCollection(sgf: string): RawSgfNode {
  let cursor = 0

  function skipWhitespace() {
    while (/\s/.test(sgf[cursor] ?? '')) cursor += 1
  }

  function readValue() {
    let value = ''
    cursor += 1

    while (cursor < sgf.length) {
      const character = sgf[cursor]

      if (character === ']') {
        cursor += 1
        break
      }

      if (character === '\\') {
        cursor += 1
        const escaped = sgf[cursor]

        if (escaped === '\r' && sgf[cursor + 1] === '\n') cursor += 1
        else if (escaped !== '\r' && escaped !== '\n' && escaped !== undefined) value += escaped

        cursor += 1
        continue
      }

      value += character
      cursor += 1
    }

    return value
  }

  function readNode(): RawSgfNode {
    const properties: SgfProperties = {}
    cursor += 1

    while (cursor < sgf.length) {
      skipWhitespace()
      const propertyMatch = sgf.slice(cursor).match(/^([A-Z]+)/)

      if (!propertyMatch) break

      const property = propertyMatch[1]
      cursor += property.length
      skipWhitespace()
      const values: string[] = []

      while (sgf[cursor] === '[') {
        values.push(readValue())
        skipWhitespace()
      }

      properties[property] = [...(properties[property] ?? []), ...values]
    }

    return { properties, children: [] }
  }

  function readGameTree(): RawSgfNode {
    skipWhitespace()
    if (sgf[cursor] !== '(') throw new Error('Invalid SGF: expected a game tree.')
    cursor += 1
    skipWhitespace()

    const sequence: RawSgfNode[] = []
    while (sgf[cursor] === ';') {
      sequence.push(readNode())
      skipWhitespace()
    }

    if (!sequence.length) throw new Error('Invalid SGF: game tree has no nodes.')

    for (let index = 0; index < sequence.length - 1; index += 1) {
      sequence[index].children.push(sequence[index + 1])
    }

    const tail = sequence[sequence.length - 1]
    while (sgf[cursor] === '(') {
      tail.children.push(readGameTree())
      skipWhitespace()
    }

    if (sgf[cursor] !== ')') throw new Error('Invalid SGF: game tree is not closed.')
    cursor += 1

    return sequence[0]
  }

  return readGameTree()
}

function getNodeMove(node: RawSgfNode): ParsedSgfMove | undefined {
  const color = node.properties.B?.[0] !== undefined ? 'B' : node.properties.W?.[0] !== undefined ? 'W' : null
  if (!color) return undefined

  const value = node.properties[color][0]
  if (!/^[a-z]{2}$/.test(value)) return undefined

  return {
    ...sgfPointToBoardPoint(value),
    color: sgfColorToStoneColor(color),
  }
}

function getNodeMarkup(node: RawSgfNode): SgfMarkup[] {
  const triangles: SgfTriangle[] = (node.properties.TR ?? [])
    .filter((value) => /^[a-z]{2}$/.test(value))
    .map((value) => ({ ...sgfPointToBoardPoint(value), type: 'triangle' as const }))
  const labels: SgfLabel[] = (node.properties.LB ?? []).flatMap((value) => {
    if (!/^[a-z]{2}:/.test(value)) return []
    return [{ ...sgfPointToBoardPoint(value.slice(0, 2)), type: 'label' as const, text: value.slice(3) }]
  })

  return [...triangles, ...labels]
}

function convertSgfNode(node: RawSgfNode): ParsedSgfNode {
  return {
    move: getNodeMove(node),
    markup: getNodeMarkup(node),
    children: node.children.map(convertSgfNode),
  }
}

function flattenSgfMoves(root: ParsedSgfNode): ParsedSgfMove[] {
  const moves: ParsedSgfMove[] = []

  function visit(node: ParsedSgfNode) {
    if (node.move) moves.push(node.move)
    node.children.forEach(visit)
  }

  visit(root)
  return moves
}

function getFirstVariationMoves(root: ParsedSgfNode): ParsedSgfMove[] {
  const moves: ParsedSgfMove[] = []
  let node: ParsedSgfNode | undefined = root

  while (node) {
    if (node.move) moves.push(node.move)
    node = node.children[0]
  }

  return moves
}

export function parseSgfPuzzle(sgf: string): ParsedSgfPuzzle {
  const rawRoot = parseSgfCollection(sgf)
  const root = convertSgfNode(rawRoot)
  const boardSize = Number(rawRoot.properties.SZ?.[0] ?? 19)
  const setupBlack = (rawRoot.properties.AB ?? []).filter((value) => /^[a-z]{2}$/.test(value)).map((value) => ({
    ...sgfPointToBoardPoint(value),
    color: 'black' as const,
  }))
  const setupWhite = (rawRoot.properties.AW ?? []).filter((value) => /^[a-z]{2}$/.test(value)).map((value) => ({
    ...sgfPointToBoardPoint(value),
    color: 'white' as const,
  }))
  const allMoves = flattenSgfMoves(root)
  const explicitPlayer = rawRoot.properties.PL?.[0]
  const toPlay = explicitPlayer === 'B' || explicitPlayer === 'W'
    ? sgfColorToStoneColor(explicitPlayer)
    : root.move?.color ?? root.children.find((child) => child.move)?.move?.color ?? 'black'

  return {
    boardSize,
    toPlay,
    stones: [...setupBlack, ...setupWhite],
    root,
    markup: root.markup,
    allMoves,
    moves: getFirstVariationMoves(root),
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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getViewportStart({
  boardSize,
  center,
  preferredStart,
  requiredMin,
  requiredMax,
  viewportSize,
}: {
  boardSize: number
  center: number
  preferredStart: number
  requiredMin: number
  requiredMax: number
  viewportSize: number
}) {
  let start = clamp(Math.round(center - (viewportSize - 1) / 2), preferredStart, boardSize - viewportSize)

  if (start > requiredMin) start = requiredMin
  if (start + viewportSize - 1 < requiredMax) start = requiredMax - viewportSize + 1

  return clamp(start, preferredStart, boardSize - viewportSize)
}

export function getAutoViewport(position: ParsedSgfPuzzle, preferredSize = 9, padding = 2): BoardViewport {
  const relevantPoints: BoardPoint[] = [...position.stones, ...position.allMoves, ...position.markup]

  if (!relevantPoints.length) return getDefaultViewport(position.boardSize)

  const minX = Math.min(...relevantPoints.map((point) => point.x))
  const maxX = Math.max(...relevantPoints.map((point) => point.x))
  const minY = Math.min(...relevantPoints.map((point) => point.y))
  const maxY = Math.max(...relevantPoints.map((point) => point.y))
  const requiredMinX = Math.max(0, minX - padding)
  const requiredMaxX = Math.min(position.boardSize - 1, maxX + padding)
  const requiredMinY = Math.max(0, minY - padding)
  const requiredMaxY = Math.min(position.boardSize - 1, maxY + padding)
  const requiredWidth = requiredMaxX - requiredMinX + 1
  const requiredHeight = requiredMaxY - requiredMinY + 1
  const width = Math.min(position.boardSize, Math.max(preferredSize, requiredWidth))
  const height = Math.min(position.boardSize, Math.max(preferredSize, requiredHeight))
  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2
  const xStart = getViewportStart({
    boardSize: position.boardSize,
    center: centerX,
    preferredStart: 0,
    requiredMin: requiredMinX,
    requiredMax: requiredMaxX,
    viewportSize: width,
  })
  const yStart = getViewportStart({
    boardSize: position.boardSize,
    center: centerY,
    preferredStart: 0,
    requiredMin: requiredMinY,
    requiredMax: requiredMaxY,
    viewportSize: height,
  })

  return {
    xStart,
    yStart,
    width,
    height,
  }
}

export function getPuzzleViewport(
  puzzle: GoPuzzleData,
  position: ParsedSgfPuzzle,
  sgfSource?: string | null,
): BoardViewport {
  if (sgfSource || puzzle.sgf) return getAutoViewport(position)

  return puzzle.viewport ?? getDefaultViewport(position.boardSize)
}

export function getPuzzlePosition(puzzle: GoPuzzleData, sgfSource?: string | null): ParsedSgfPuzzle {
  if (sgfSource || puzzle.sgf) return parseSgfPuzzle(sgfSource ?? puzzle.sgf ?? '')

  return {
    boardSize: puzzle.boardSize,
    toPlay: puzzle.toPlay,
    stones: puzzle.stones,
    root: { markup: [], children: [] },
    markup: [],
    allMoves: [],
    moves: [],
  }
}

export function getPuzzleSteps(puzzle: GoPuzzleData, sgfSource?: string | null): PuzzleStep[] {
  if (sgfSource || puzzle.sgf) {
    const parsed = parseSgfPuzzle(sgfSource ?? puzzle.sgf ?? '')
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

export function validatePuzzleDefinition(puzzle: GoPuzzleData, sgfSource?: string | null): string[] {
  const errors: string[] = []
  const parsed = getPuzzlePosition(puzzle, sgfSource)
  const occupied = new Set<string>()
  const viewport = getPuzzleViewport(puzzle, parsed, sgfSource)

  if (!puzzle.id.trim()) errors.push('Puzzle id is required.')
  if (parsed.boardSize < 2) errors.push(`${puzzle.id}: board size must be at least 2.`)
  if ((puzzle.sgf || puzzle.sgfPath) && !sgfSource && !puzzle.sgf) return errors
  if ((sgfSource || puzzle.sgf) && parsed.boardSize !== puzzle.boardSize) {
    errors.push(`${puzzle.id}: SGF SZ[${parsed.boardSize}] does not match puzzle boardSize ${puzzle.boardSize}.`)
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
  if (!parsed.allMoves.length && !parsed.markup.length && !puzzle.solutions.length && !puzzle.steps?.length) {
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

  for (const markup of parsed.markup) {
    const key = pointKey(markup)

    if (!isPointOnBoard(markup, parsed.boardSize)) {
      errors.push(`${puzzle.id}: markup ${key} is outside the board.`)
    }

    if (!isPointInViewport(markup, viewport)) {
      errors.push(`${puzzle.id}: markup ${key} is outside the visible viewport.`)
    }
  }

  for (const move of parsed.allMoves) {
    const key = pointKey(move)

    if (!isPointOnBoard(move, parsed.boardSize)) {
      errors.push(`${puzzle.id}: SGF move ${key} is outside the board.`)
    }

    if (!isPointInViewport(move, viewport)) {
      errors.push(`${puzzle.id}: SGF move ${key} is outside the visible viewport.`)
    }
  }

  const steps = getPuzzleSteps(puzzle, sgfSource)

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

      if ((sgfSource || puzzle.sgf) && !isPointInViewport(solution, viewport)) {
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
  return puzzleList.flatMap((puzzle) => validatePuzzleDefinition(puzzle))
}
