'use client'

import { useMemo, useState } from 'react'
import {
  getPuzzleById,
  getPuzzleSteps,
  validatePuzzleDefinition,
  type BoardPoint,
  type GoPuzzleData,
  type PuzzleStone,
  type StoneColor,
} from '@/lib/puzzles'

type GoPuzzleProps = {
  puzzleId: string
}

function samePoint(a: BoardPoint, b: BoardPoint) {
  return a.x === b.x && a.y === b.y
}

function pointKey(point: BoardPoint) {
  return `${point.x}-${point.y}`
}

function getStoneClasses(color: StoneColor) {
  return color === 'black'
    ? 'bg-stone-950 shadow-[inset_0_1px_2px_rgba(255,255,255,0.18),0_5px_12px_rgba(28,25,23,0.28)]'
    : 'border border-stone-300 bg-stone-50 shadow-[inset_0_-1px_2px_rgba(28,25,23,0.08),0_5px_12px_rgba(28,25,23,0.18)]'
}

function getStoneName(color: StoneColor) {
  return color === 'black' ? 'Black' : 'White'
}

function getOpponentColor(color: StoneColor): StoneColor {
  return color === 'black' ? 'white' : 'black'
}

function PuzzleBoard({ puzzle }: { puzzle: GoPuzzleData }) {
  const [selectedPoint, setSelectedPoint] = useState<BoardPoint | null>(null)
  const [result, setResult] = useState<'correct' | 'incorrect' | 'complete' | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [playedStones, setPlayedStones] = useState<PuzzleStone[]>([])
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const steps = useMemo(() => getPuzzleSteps(puzzle), [puzzle])
  const currentStep = steps[currentStepIndex]
  const isComplete = result === 'complete'

  const stoneMap = useMemo(() => {
    return new Map([...puzzle.stones, ...playedStones].map((stone) => [pointKey(stone), stone]))
  }, [playedStones, puzzle.stones])

  const points = useMemo(() => {
    return Array.from({ length: puzzle.boardSize * puzzle.boardSize }, (_, index) => ({
      x: index % puzzle.boardSize,
      y: Math.floor(index / puzzle.boardSize),
    }))
  }, [puzzle.boardSize])

  function handlePointClick(point: BoardPoint) {
    if (stoneMap.has(pointKey(point)) || !currentStep || isComplete) return

    setSelectedPoint(point)
    setFeedbackMessage(null)

    const isCorrect = currentStep.solutions.some((solution) => samePoint(solution, point))

    if (!isCorrect) {
      setFeedbackMessage(puzzle.failureMessage)
      setResult('incorrect')
      return
    }

    const nextPlayedStones: PuzzleStone[] = [...playedStones, { ...point, color: puzzle.toPlay }]

    if (currentStep.opponentReply) {
      nextPlayedStones.push({
        x: currentStep.opponentReply.x,
        y: currentStep.opponentReply.y,
        color: currentStep.opponentReply.color ?? getOpponentColor(puzzle.toPlay),
      })
    }

    const nextFeedback = currentStep.opponentReply?.message
      ? `${currentStep.successMessage} ${currentStep.opponentReply.message}`
      : currentStep.successMessage

    setPlayedStones(nextPlayedStones)
    setFeedbackMessage(currentStepIndex >= steps.length - 1 ? puzzle.successMessage : nextFeedback)

    if (currentStepIndex >= steps.length - 1) {
      setResult('complete')
      return
    }

    setResult('correct')
    setCurrentStepIndex((index) => index + 1)
  }

  function resetPuzzle() {
    setSelectedPoint(null)
    setResult(null)
    setCurrentStepIndex(0)
    setPlayedStones([])
    setFeedbackMessage(null)
  }

  return (
    <div>
      <div
        className="relative mx-auto aspect-square w-full max-w-[26rem] rounded-[1.6rem] border border-stone-300 bg-[#d9c79f] p-5 shadow-[0_24px_70px_-50px_rgba(28,25,23,0.65)]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(90,75,49,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(90,75,49,0.55) 1px, transparent 1px)',
          backgroundSize: `calc((100% - 2.5rem) / ${puzzle.boardSize - 1}) calc((100% - 2.5rem) / ${puzzle.boardSize - 1})`,
          backgroundPosition: '1.25rem 1.25rem',
          backgroundRepeat: 'repeat',
        }}
      >
        <div
          className="grid h-full w-full"
          style={{ gridTemplateColumns: `repeat(${puzzle.boardSize}, minmax(0, 1fr))` }}
          aria-label={`${puzzle.title} puzzle board`}
          role="group"
        >
          {points.map((point) => {
            const key = pointKey(point)
            const stone = stoneMap.get(key)
            const isSelected = selectedPoint ? samePoint(selectedPoint, point) : false
            const isSolution = result === 'incorrect' && currentStep.solutions.some((solution) => samePoint(solution, point))
            const canPlay = !stone

            return (
              <button
                key={key}
                type="button"
                onClick={() => handlePointClick(point)}
                disabled={!canPlay}
                aria-label={
                  stone
                    ? `${getStoneName(stone.color)} stone at column ${point.x + 1}, row ${point.y + 1}`
                    : `Play at column ${point.x + 1}, row ${point.y + 1}`
                }
                className="relative grid min-h-10 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-950 disabled:cursor-default sm:min-h-12"
              >
                {stone ? (
                  <span className={`h-7 w-7 rounded-full sm:h-9 sm:w-9 ${getStoneClasses(stone.color)}`} />
                ) : null}

                {isSelected ? (
                  <span
                    className={`h-7 w-7 rounded-full border-2 sm:h-9 sm:w-9 ${
                      result === 'correct'
                        ? 'border-emerald-950 bg-emerald-950/15'
                        : result === 'complete'
                        ? 'border-emerald-950 bg-emerald-950/15'
                        : 'border-red-900/70 bg-red-900/10'
                    }`}
                  />
                ) : null}

                {isSolution ? (
                  <span className="absolute h-3 w-3 rounded-full bg-emerald-900 shadow-[0_0_0_5px_rgba(20,83,45,0.12)]" />
                ) : null}
              </button>
            )
          })}
        </div>
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
        {result === 'complete'
          ? feedbackMessage ?? puzzle.successMessage
          : result === 'correct'
            ? feedbackMessage ?? puzzle.successMessage
          : result === 'incorrect'
            ? feedbackMessage ?? puzzle.failureMessage
            : currentStep?.prompt ?? puzzle.lessonNote}
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
          {isComplete ? 'Puzzle complete' : `${getStoneName(puzzle.toPlay)} to play · Step ${currentStepIndex + 1} of ${steps.length}`}
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
