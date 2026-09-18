'use client'

import { useEffect, useMemo, useState } from 'react'
import { applyMove } from '@/lib/goBoard'
import {
  getPuzzleById,
  getPuzzlePosition,
  getPuzzleSteps,
  getPuzzleViewport,
  isPointInViewport,
  pointKey,
  validatePuzzleDefinition,
  type BoardPoint,
  type BoardViewport,
  type GoPuzzleData,
  type ParsedSgfNode,
  type PuzzleStone,
  type SgfMarkup,
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

function getSgfNodeAtPath(root: ParsedSgfNode, path: number[]) {
  return path.reduce((node, childIndex) => node.children[childIndex] ?? node, root)
}

function getSgfNodesAtPath(root: ParsedSgfNode, path: number[]) {
  const nodes: ParsedSgfNode[] = []
  let node = root

  for (const childIndex of path) {
    const child = node.children[childIndex]
    if (!child) break
    nodes.push(child)
    node = child
  }

  return nodes
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

function PuzzleMarkupSvg({
  markup,
  viewport,
  stone,
}: {
  markup: SgfMarkup
  viewport: BoardViewport
  stone?: PuzzleStone
}) {
  const { cx, cy } = getViewCoordinate(markup, viewport)
  const color = stone?.color === 'black' ? '#fafaf8' : '#173f31'

  if (markup.type === 'triangle') {
    const radius = 7.5
    const points = [
      `${cx},${cy - radius}`,
      `${cx - radius * 0.86},${cy + radius * 0.5}`,
      `${cx + radius * 0.86},${cy + radius * 0.5}`,
    ].join(' ')

    return <polygon points={points} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" pointerEvents="none" />
  }

  return (
    <text
      x={cx}
      y={cy}
      fill={color}
      fontSize="13"
      fontWeight="700"
      textAnchor="middle"
      dominantBaseline="central"
      pointerEvents="none"
    >
      {markup.text}
    </text>
  )
}

function PuzzleBoard({ puzzle }: { puzzle: GoPuzzleData }) {
  const isSgfPuzzle = Boolean(puzzle.sgf || puzzle.sgfPath)
  const [sgfSource, setSgfSource] = useState<string | null>(puzzle.sgf ?? null)
  const [sgfLoadError, setSgfLoadError] = useState<string | null>(null)
  const position = useMemo(() => getPuzzlePosition(puzzle, sgfSource), [puzzle, sgfSource])
  const viewport = useMemo(() => getPuzzleViewport(puzzle, position, sgfSource), [position, puzzle, sgfSource])
  const legacySteps = useMemo(() => getPuzzleSteps(puzzle, sgfSource), [puzzle, sgfSource])
  const validationErrors = useMemo(() => validatePuzzleDefinition(puzzle, sgfSource), [puzzle, sgfSource])
  const [selectedPoint, setSelectedPoint] = useState<BoardPoint | null>(null)
  const [result, setResult] = useState<PuzzleResult>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [sgfNodePath, setSgfNodePath] = useState<number[]>([])
  const [isCorrectBranch, setIsCorrectBranch] = useState(true)
  const [boardStones, setBoardStones] = useState<PuzzleStone[]>(position.stones)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const isComplete = result === 'complete'
  const isLoadingSgf = Boolean(puzzle.sgfPath && !sgfSource && !sgfLoadError)
  const currentLegacyStep = legacySteps[currentStepIndex]
  const currentSgfNode = useMemo(() => getSgfNodeAtPath(position.root, sgfNodePath), [position.root, sgfNodePath])
  const availableSgfMoves = useMemo(
    () => currentSgfNode.children.filter((child) => child.move?.color === position.toPlay),
    [currentSgfNode, position.toPlay],
  )
  const stonesInView = useMemo(() => {
    return boardStones.filter((stone) => isPointInViewport(stone, viewport))
  }, [boardStones, viewport])
  const markupInView = useMemo(
    () => position.markup.filter((markup) => isPointInViewport(markup, viewport)),
    [position.markup, viewport],
  )
  const stoneMap = useMemo(() => {
    return new Map(boardStones.map((stone) => [pointKey(stone), stone]))
  }, [boardStones])
  const points = useMemo(() => getViewportPoints(viewport), [viewport])
  const boardWidth = boardPadding * 2 + (viewport.width - 1) * gridSpacing
  const boardHeight = boardPadding * 2 + (viewport.height - 1) * gridSpacing
  const shadowFilterId = `stone-shadow-${puzzle.id}`

  useEffect(() => {
    if (!puzzle.sgfPath) {
      setSgfSource(puzzle.sgf ?? null)
      setSgfLoadError(null)
      return
    }

    let isActive = true

    setSgfSource(null)
    setSgfLoadError(null)

    fetch(puzzle.sgfPath)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load SGF file: ${puzzle.sgfPath}`)
        return response.text()
      })
      .then((source) => {
        if (isActive) setSgfSource(source)
      })
      .catch((error: unknown) => {
        if (isActive) setSgfLoadError(error instanceof Error ? error.message : 'Could not load SGF file.')
      })

    return () => {
      isActive = false
    }
  }, [puzzle.sgf, puzzle.sgfPath])

  useEffect(() => {
    setSelectedPoint(null)
    setResult(null)
    setCurrentStepIndex(0)
    setSgfNodePath([])
    setIsCorrectBranch(true)
    setBoardStones(position.stones)
    setFeedbackMessage(null)
  }, [position.stones, puzzle.id, sgfSource])

  function playSgfMove(point: BoardPoint) {
    const selectedChildIndex = currentSgfNode.children.findIndex(
      (child) => child.move?.color === position.toPlay && samePoint(child.move, point),
    )

    if (selectedChildIndex === -1) {
      setFeedbackMessage(puzzle.failureMessage)
      setResult('incorrect')
      return
    }

    const selectedChild = currentSgfNode.children[selectedChildIndex]
    if (!selectedChild.move) return

    const learnerMoveResult = applyMove(boardStones, selectedChild.move, position.boardSize)

    if (!learnerMoveResult.ok) {
      setFeedbackMessage(learnerMoveResult.reason)
      setResult('incorrect')
      return
    }

    let nextStones = learnerMoveResult.stones
    const nextPath = [...sgfNodePath, selectedChildIndex]
    let nextNode = selectedChild
    let nextBranchIsCorrect = isCorrectBranch && selectedChildIndex === 0

    const autoReplies: string[] = []

    while (true) {
      const replyNode = nextNode.children[0]
      if (!replyNode?.move || replyNode.move.color === position.toPlay) break
      const reply = replyNode.move

      const replyResult = applyMove(nextStones, reply, position.boardSize)

      if (!replyResult.ok) {
        setFeedbackMessage(replyResult.reason)
        setResult('incorrect')
        return
      }

      nextStones = replyResult.stones
      autoReplies.push(
        replyResult.captured.length > 0
          ? `${getStoneName(reply.color)} replies automatically and captures ${replyResult.captured.length} stone${
              replyResult.captured.length === 1 ? '' : 's'
            }.`
          : `${getStoneName(reply.color)} replies automatically.`,
      )
      nextPath.push(0)
      nextNode = replyNode
    }

    setBoardStones(nextStones)
    setSgfNodePath(nextPath)
    setIsCorrectBranch(nextBranchIsCorrect)

    if (nextNode.children.length === 0) {
      if (nextBranchIsCorrect) {
        setFeedbackMessage(puzzle.successMessage)
        setResult('complete')
      } else {
        setFeedbackMessage('This recorded variation reaches an incorrect result. Reset the puzzle and try again.')
        setResult('incorrect')
      }
      return
    }

    const captureText =
      learnerMoveResult.captured.length > 0
        ? ` You captured ${learnerMoveResult.captured.length} stone${learnerMoveResult.captured.length === 1 ? '' : 's'}.`
        : ''

    setFeedbackMessage(
      autoReplies.length
        ? `${nextBranchIsCorrect ? 'Correct.' : 'Recorded variation.'}${captureText} ${autoReplies.join(' ')}`
        : `${nextBranchIsCorrect ? 'Correct.' : 'Recorded variation.'}${captureText} Continue the sequence.`,
    )
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

    const moveResult = applyMove(boardStones, { ...point, color: puzzle.toPlay }, position.boardSize)

    if (!moveResult.ok) {
      setFeedbackMessage(moveResult.reason)
      setResult('incorrect')
      return
    }

    let nextStones = moveResult.stones

    if (currentLegacyStep.opponentReply) {
      const replyResult = applyMove(
        nextStones,
        {
          x: currentLegacyStep.opponentReply.x,
          y: currentLegacyStep.opponentReply.y,
          color: currentLegacyStep.opponentReply.color ?? getOpponentColor(puzzle.toPlay),
        },
        position.boardSize,
      )

      if (!replyResult.ok) {
        setFeedbackMessage(replyResult.reason)
        setResult('incorrect')
        return
      }

      nextStones = replyResult.stones
    }

    const nextFeedback = currentLegacyStep.opponentReply?.message
      ? `${currentLegacyStep.successMessage} ${currentLegacyStep.opponentReply.message}`
      : currentLegacyStep.successMessage

    setBoardStones(nextStones)
    setFeedbackMessage(currentStepIndex >= legacySteps.length - 1 ? puzzle.successMessage : nextFeedback)

    if (currentStepIndex >= legacySteps.length - 1) {
      setResult('complete')
      return
    }

    setResult('correct')
    setCurrentStepIndex((index) => index + 1)
  }

  function handlePointClick(point: BoardPoint) {
    if (stoneMap.has(pointKey(point)) || isComplete || isLoadingSgf || validationErrors.length > 0) return

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
    setSgfNodePath([])
    setIsCorrectBranch(true)
    setBoardStones(position.stones)
    setFeedbackMessage(null)
  }

  if (sgfLoadError) {
    return (
      <div className="rounded-2xl border border-red-900/15 bg-red-950/[0.04] p-5 text-sm text-red-950">
        {sgfLoadError}
      </div>
    )
  }

  if (validationErrors.length > 0) {
    return (
      <div className="rounded-2xl border border-red-900/15 bg-red-950/[0.04] p-5 text-sm text-red-950">
        <p className="font-semibold">Puzzle definition error: {puzzle.id}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    )
  }

  const currentPrompt = isLoadingSgf
    ? 'Loading puzzle…'
    : isSgfPuzzle
      ? availableSgfMoves.length > 0
        ? puzzle.objective
        : puzzle.lessonNote
      : currentLegacyStep?.prompt ?? puzzle.lessonNote
  const playedSgfNodes = getSgfNodesAtPath(position.root, sgfNodePath)
  const currentStepLabel = isSgfPuzzle
    ? position.moves.length > 0
      ? `Move ${Math.min(playedSgfNodes.filter((node) => node.move?.color === position.toPlay).length + 1, position.moves.filter((move) => move.color === position.toPlay).length)} of ${position.moves.filter((move) => move.color === position.toPlay).length}`
      : 'SGF markup preview'
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

          {markupInView.map((markup, index) => (
            <PuzzleMarkupSvg
              key={`${markup.type}-${pointKey(markup)}-${markup.type === 'label' ? markup.text : index}`}
              markup={markup}
              viewport={viewport}
              stone={stoneMap.get(pointKey(markup))}
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
            const canPlay = !stone && !isComplete && !isLoadingSgf && (!isSgfPuzzle || availableSgfMoves.length > 0)
            const expectedSolutions = isSgfPuzzle
              ? currentSgfNode.children[0]?.move
                ? [currentSgfNode.children[0].move]
                : []
              : currentLegacyStep?.solutions ?? []
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
          {puzzle.sgf || puzzle.sgfPath ? (
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
