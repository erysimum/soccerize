import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

type MatchControlsProps = {
  onSecondsUpdate: (sec: number) => void
  setIsRunning: (running: boolean) => void
}

export const MatchControls = ({ onSecondsUpdate, setIsRunning }: MatchControlsProps) => {
  const [seconds, setSeconds] = useState(0)
  const [isRunningLocal, setIsRunningLocal] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    onSecondsUpdate(seconds)
  }, [seconds, onSecondsUpdate])

  useEffect(() => {
    if (isRunningLocal) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunningLocal])

  const handleStart = () => {
    setIsRunningLocal(true)
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunningLocal(false)
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunningLocal(false)
    setSeconds(0)
    setIsRunning(false)
    onSecondsUpdate(0)
  }

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
    const secsPart = secs % 60
    return `${mins}' ${secsPart.toString().padStart(2, "0")}" `
  }

  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-bold">{'\u23F1\uFE0F'} Match Time: {formatTime(seconds)}</h2>
      <div className="flex gap-4 justify-center">
        <Button onClick={handleStart} disabled={isRunningLocal}>▶️ Start</Button>
        <Button onClick={handlePause} disabled={!isRunningLocal}>⏸️ Pause</Button>
        <Button onClick={handleReset}>🔁 Reset</Button>
      </div>
    </div>
  )
}
