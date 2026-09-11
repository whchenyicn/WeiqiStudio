'use client'

import { useMemo, useState } from 'react'
import {
  getDefaultViewport,
  getPuzzleById,
  getPuzzlePosition,
  getPuzzleSteps,
  isPointInViewport,
  pointKey,
  validatePuzzleDefinition,
  type BoardPoint,
  type BoardViewport,
  type GoPuzzleData,
  type ParsedSgfMove,
  type PuzzleStone,
  type StoneColor,
} from '@/lib/puzzles'

type GoPuzzleProps = {
  puzzleId: string
}

type PuzzleResult = 'correct' | 'incorrect' | 'complete' | null

const boardPadding = 28
const gridSpacing = 34
const stoneRadius = 13

function samePoint(a: BoardPoint, b: BoardPoint) {
  return a.x === b.x && a.y === b.y
}

function getStoneName(color: StoneColor) {
  return color === 'black' ? 'Black' : 'White'
}

function getOpponentColor(color: StoneColor): StoneColor {
  return color === 'black' ? 'white' : 'black'
}

function getViewportPoints(viewport: BoardViewport) {
  return Array.from({ length: viewport.width * viewport.height }, (_, index) => ({
    x: viewport.xStart + (index % viewport.width),
    y: viewport.yStart + Math.floor(index / viewport.width),
  }))
}

function getViewCoordinate(point: BoardPoint, viewport: BoardViewport) {
  return {
    cx: boardPadding + (point.x - viewport.xStart) * gridSpacing,
    cy: boardPadding + (point.y - viewport.yStart) * gridSpacing,
  }
}

function getCurrentSgfUserMove(moves: ParsedSgfMove[], moveCursor: number, toPlay: StoneColor) {
  return moves.find((move, index) => index >= moveCursor && move.color === toPlay)
}

function PuzzleStoneSvg({
  stone,
  viewport,
  shadowFilterId,
}: {
  stone: PuzzleStone
  viewport: BoardViewport
  shadowFilterId: string
}) {
  const { cx, cy } = getViewCoordinate(stone, viewport)

  return (
    <circle
      cx={cx}
      cy={cy}
      r={stoneRadius}
      fill={stone.color === 'black' ? '#1c1917' : '#fafaf8'}
      stroke={stone.color === 'black' ? '#1c1917' : '#a8a29e'}
      strokeWidth={stone.color === 'black' ? 0 : 1.3}
      filter={`url(#${shadowFilterId})`}
    />
  )
}

function PuzzleBoard({ puzzle }: { puzzle: GoPuzzleData }) {
  const position = useMemo(() => getPuzzlePosition(puzzle), [puzzle])
  const viewport = puzzle.viewport ?? getDefaultViewport(position.boardSize)
  const isSgfPuzzle = Boolean(puzzle.sgf)
  const legacySteps = useMemo(() => getPuzzleSteps(puzzle), [puzzle])
  const [selectedPoint, setSelectedPoint] = useState<BoardPoint | null>(null)
  const [result, setResult] = useState<PuzzleResult>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [moveCursor, setMoveCursor] = useState(0)
  const [playedStones, setPlayedStones] = useState<PuzzleStone[]>([])
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const isComplete = result === 'complete'
  const currentLegacyStep = legacySteps[currentStepIndex]
  const currentSgfMove = getCurrentSgfUserMove(position.moves, moveCursor, position.toPlay)
  const stonesInView = useMemo(() => {
    return [...position.stones, ...playedStones].filter((stone) => isPointInViewport(stone, viewport))
  }, [playedStones, position.stones, viewport])
  const stoneMap = useMemo(() => {
    return new Map([...position.stones, ...playedStones].map((stone) => [pointKey(stone), stone]))
  }, [playedStones, position.stones])
  const points = useMemo(() => getViewportPoints(viewport), [viewport])
  const boardWidth = boardPadding * 2 + (viewport.width - 1) * gridSpacing
  const boardHeight = boardPadding * 2 + (viewport.height - 1) * gridSpacing
  const shadowFilterId = `stone-shadow-${puzzle.id}`

  function playSgfMove(point: BoardPoint) {
    if (!currentSgfMove) return

    const isCorrect = samePoint(currentSgfMove, point)

    if (!isCorrect) {
      setFeedbackMessage(puzzle.failureMessage)
      setResult('incorrect')
      return
    }

    const nextPlayedStones: PuzzleStone[] = [...playedStones, { ...point, color: currentSgfMove.color }]
    let nextCursor = position.moves.findIndex((move, index) => index >= moveCursor && samePoint(move, currentSgfMove))

    if (nextCursor === -1) nextCursor = moveCursor
    nextCursor += 1

    const autoReplies: string[] = []

    while (nextCursor < position.moves.length && position.moves[nextCursor].color !== position.toPlay) {
      const reply = position.moves[nextCursor]
      nextPlayedStones.push({ x: reply.x, y: reply.y, color: reply.color })
      autoReplies.push(`${getStoneName(reply.color)} replies automatically.`)
      nextCursor += 1
    }

    setPlayedStones(nextPlayedStones)
    setMoveCursor(nextCursor)

    if (nextCursor >= position.moves.length) {
      setFeedbackMessage(puzzle.successMessage)
      setResult('complete')
      return
    }

    setFeedbackMessage(autoReplies.length ? `Correct. ${autoReplies.join(' ')}` : 'Correct. Continue the sequence.')
    setResult('correct')
  }

  function playLegacyMove(point: BoardPoint) {
    if (!currentLegacyStep) return

    const isCorrect = currentLegacyStep.solutions.some((solution) => samePoint(solution, point))

    if (!isCorrect) {
      setFeedbackMessage(puzzle.failureMessage)
      setResult('incorrect')
      return
    }

    const nextPlayedStones: PuzzleStone[] = [...playedStones, { ...point, color: puzzle.toPlay }]

    if (currentLegacyStep.opponentReply) {
      nextPlayedStones.push({
        x: currentLegacyStep.opponentReply.x,
        y: currentLegacyStep.opponentReply.y,
        color: currentLegacyStep.opponentReply.color ?? getOpponentColor(puzzle.toPlay),
      })
    }

    const nextFeedback = currentLegacyStep.opponentReply?.message
      ? `${currentLegacyStep.successMessage} ${currentLegacyStep.opponentReply.message}`
      : currentLegacyStep.successMessage

    setPlayedStones(nextPlayedStones)
    setFeedbackMessage(currentStepIndex >= legacySteps.length - 1 ? puzzle.successMessage : nextFeedback)

    if (currentStepIndex >= legacySteps.length - 1) {
      setResult('complete')
      return
    }

    setResult('correct')
    setCurrentStepIndex((index) => index + 1)
  }

  function handlePointClick(point: BoardPoint) {
    if (stoneMap.has(pointKey(point)) || isComplete) return

    setSelectedPoint(point)
    setFeedbackMessage(null)

    if (isSgfPuzzle) {
      playSgfMove(point)
    } else {
      playLegacyMove(point)
    }
  }

  function handlePointKeyDown(event: React.KeyboardEvent<SVGGElement>, point: BoardPoint) {
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    handlePointClick(point)
  }

  function resetPuzzle() {
    setSelectedPoint(null)
    setResult(null)
    setCurrentStepIndex(0)
    setMoveCursor(0)
    setPlayedStones([])
    setFeedbackMessage(null)
  }

  const currentPrompt = isSgfPuzzle
    ? currentSgfMove
      ? puzzle.objective
      : puzzle.lessonNote
    : currentLegacyStep?.prompt ?? puzzle.lessonNote
  const currentStepLabel = isSgfPuzzle
    ? `Move ${position.moves.filter((move, index) => index < moveCursor && move.color === position.toPlay).length + 1} of ${position.moves.filter((move) => move.color === position.toPlay).length}`
    : `Step ${currentStepIndex + 1} of ${legacySteps.length}`

  return (
    <div>
      <div className="mx-auto w-full max-w-[26rem] rounded-[1.6rem] border border-stone-300 bg-[#d9c79f] p-3 shadow-[0_24px_70px_-50px_rgba(28,25,23,0.65)]">
        <svg
          viewBox={`0 0 ${boardWidth} ${boardHeight}`}
          className="block h-auto w-full"
          role="group"
          aria-label={`${puzzle.title} puzzle board`}
        >
          <defs>
            <filter id={shadowFilterId} x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1c1917" floodOpacity="0.24" />
            </filter>
          </defs>

          <rect width={boardWidth} height={boardHeight} rx="16" fill="#d9c79f" />

          {Array.from({ length: viewport.height }, (_, index) => {
            const y = boardPadding + index * gridSpacing
            return (
              <line
                key={`row-${index}`}
                x1={boardPadding}
                y1={y}
                x2={boardWidth - boardPadding}
                y2={y}
                stroke="#6f5f42"
                strokeWidth="1.15"
                opacity="0.72"
              />
            )
          })}

          {Array.from({ length: viewport.width }, (_, index) => {
            const x = boardPadding + index * gridSpacing
            return (
              <line
                key={`column-${index}`}
                x1={x}
                y1={boardPadding}
                x2={x}
                y2={boardHeight - boardPadding}
                stroke="#6f5f42"
                strokeWidth="1.15"
                opacity="0.72"
              />
            )
          })}

          {stonesInView.map((stone) => (
            <PuzzleStoneSvg
              key={`${stone.color}-${pointKey(stone)}`}
              stone={stone}
              viewport={viewport}
              shadowFilterId={shadowFilterId}
            />
          ))}

          {selectedPoint && isPointInViewport(selectedPoint, viewport) ? (
            <circle
              {...getViewCoordinate(selectedPoint, viewport)}
              r={stoneRadius + 4}
              fill="none"
              stroke={result === 'incorrect' ? '#7f1d1d' : '#064e3b'}
              strokeWidth="2"
              opacity="0.8"
            />
          ) : null}

          {points.map((point) => {
            const stone = stoneMap.get(pointKey(point))
            const canPlay = !stone && !isComplete
            const expectedSolutions = isSgfPuzzle && currentSgfMove ? [currentSgfMove] : currentLegacyStep?.solutions ?? []
            const isSolution = result === 'incorrect' && expectedSolutions.some((solution) => samePoint(solution, point))
            const { cx, cy } = getViewCoordinate(point, viewport)

            return (
              <g
                key={pointKey(point)}
                role="button"
                tabIndex={canPlay ? 0 : -1}
                aria-disabled={!canPlay}
                aria-label={
                  stone
                    ? `${getStoneName(stone.color)} stone at full-board column ${point.x + 1}, row ${point.y + 1}`
                    : `Play at full-board column ${point.x + 1}, row ${point.y + 1}`
                }
                onClick={() => handlePointClick(point)}
                onKeyDown={(event) => handlePointKeyDown(event, point)}
                className={canPlay ? 'cursor-pointer outline-none' : 'cursor-default outline-none'}
              >
                <circle cx={cx} cy={cy} r={gridSpacing / 2} fill="transparent" />
                {isSolution ? (
                  <circle cx={cx} cy={cy} r="5" fill="#064e3b" opacity="0.9" />
                ) : null}
              </g>
            )
          })}
        </svg>
      </div>

      <div
        className={`mt-5 rounded-2xl border px-4 py-3 text-sm leading-6 ${
          result === 'correct' || result === 'complete'
            ? 'border-emerald-900/15 bg-emerald-950/[0.04] text-emerald-950'
            : result === 'incorrect'
              ? 'border-red-900/15 bg-red-950/[0.04] text-red-950'
              : 'border-stone-200 bg-stone-50 text-stone-600'
        }`}
        aria-live="polite"
      >
        {feedbackMessage ?? currentPrompt}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={resetPuzzle}
          className="rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-700 transition hover:border-emerald-900/25 hover:text-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
        >
          Reset puzzle
        </button>
        <p className="text-xs font-medium text-stone-500">
          {isComplete ? 'Puzzle complete' : `${getStoneName(position.toPlay)} to play · ${currentStepLabel}`}
        </p>
      </div>
    </div>
  )
}

export function GoPuzzle({ puzzleId }: GoPuzzleProps) {
  const puzzle = getPuzzleById(puzzleId)

  if (!puzzle) {
    return (
      <div className="rounded-2xl border border-red-900/15 bg-red-950/[0.04] p-5 text-sm text-red-950">
        Puzzle not found: {puzzleId}
      </div>
    )
  }

  const validationErrors = validatePuzzleDefinition(puzzle)

  if (validationErrors.length > 0) {
    return (
      <div className="rounded-2xl border border-red-900/15 bg-red-950/[0.04] p-5 text-sm text-red-950">
        <p className="font-semibold">Puzzle definition error: {puzzleId}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <section className="rounded-[2rem] bg-white p-5 shadow-[0_18px_60px_-48px_rgba(28,25,23,0.55)] ring-1 ring-stone-900/[0.06] sm:p-6">
      <div className="mb-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
          Interactive puzzle
        </p>
        <h3 className="text-2xl font-semibold tracking-[-0.035em] text-stone-950">{puzzle.title}</h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">{puzzle.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.12em]">
          <span className="rounded-full bg-[#f4f4ef] px-3 py-1.5 text-stone-600">{puzzle.difficulty}</span>
          {puzzle.category ? (
            <span className="rounded-full bg-[#f4f4ef] px-3 py-1.5 text-stone-600">{puzzle.category}</span>
          ) : null}
          {puzzle.sgf ? (
            <span className="rounded-full bg-[#f4f4ef] px-3 py-1.5 text-stone-600">SGF source</span>
          ) : null}
          <span className="rounded-full bg-emerald-950 px-3 py-1.5 text-white">{getStoneName(puzzle.toPlay)} to play</span>
        </div>
      </div>

      <PuzzleBoard puzzle={puzzle} />

      <p className="mt-5 rounded-2xl bg-[#f8f8f5] px-4 py-3 text-sm leading-6 text-stone-600">
        <span className="font-semibold text-stone-900">Goal:</span> {puzzle.objective}
      </p>
    </section>
  )
}
