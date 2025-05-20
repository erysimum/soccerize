import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

type Props = {
  currentSeconds: number
  events: { type: "goal" | "card"; selectedTeam?: string; player?: string; cardType?: string }[]
  isRunning: boolean
}

type Comment = {
  message: string
  time: number
}

export const Commentary = ({ currentSeconds, events, isRunning }: Props) => {
  const [comments, setComments] = useState<Comment[]>([])
  const secondsRef = useRef(currentSeconds)

  useEffect(() => {
    secondsRef.current = currentSeconds
  }, [currentSeconds])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      const quotes = [
        "What a run down the wing!",
        "The crowd is on its feet!",
        "A risky backpass, but it worked.",
        "The tension is palpable!",
        "That was inches away from glory!",
      ]
      const quote = quotes[Math.floor(Math.random() * quotes.length)]
      setComments((prev) => [...prev, { message: quote, time: secondsRef.current }])
    }, 15000)

    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    const lastEvent = events[events.length - 1]
    if (!lastEvent) return

    const newComment: Comment = {
      message:
        lastEvent.type === "goal"
          ? `GOAL! ${lastEvent.player} from ${lastEvent.selectedTeam} finds the net!`
          : `${lastEvent.player} from ${lastEvent.selectedTeam} receives a ${lastEvent.cardType} card!`,
      time: secondsRef.current,
    }

    setComments((prev) => [...prev, newComment])
  }, [events])

  const formatTime = (secs: number) =>
    `${Math.floor(secs / 60)}' ${String(secs % 60).padStart(2, "0")}"`

  return (
    <Card className="w-full max-w-md mx-auto mt-8 p-4">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">{'\u{1F399}'}Commentary</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {comments.length === 0 ? (
            <p className="italic text-muted-foreground">Waiting for kick-off…</p>
          ) : (
            comments.map((c, i) => (
              <div key={i} className="text-sm text-muted-foreground border-l-4 border-neutral-500 pl-3">
                <span className="text-white font-semibold">{formatTime(c.time)}</span>
                <span className="ml-2">{c.message}</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
