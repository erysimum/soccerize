import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

type Props = {
  currentSeconds: number
  isRunning: boolean
}

type Comment = {
  message: string
  time: number
}

export const Commentary = ({ currentSeconds, isRunning }: Props) => {
  const [comments, setComments] = useState<Comment[]>([])
  const socketRef = useRef<WebSocket | null>(null)

  const formatTime = (secs: number) =>
    `${Math.floor(secs / 60)}' ${String(secs % 60).padStart(2, "0")}"`

  useEffect(() => {
    if (!isRunning) return

    const socketUrl = import.meta.env.VITE_SOCKET_URL
    socketRef.current = new WebSocket(socketUrl)

    socketRef.current.onopen = () => {
      console.log(" WebSocket connected")
    }

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const newComment: Comment = {
        message: data.commentary,
        time: currentSeconds
      }
      setComments((prev) => [...prev, newComment])
    }

    socketRef.current.onerror = (err) => {
      console.error(" WebSocket error", err)
    }

    socketRef.current.onclose = () => {
      console.log(" WebSocket closed")
    }

    return () => {
      socketRef.current?.close()
    }
  }, [isRunning])

  return (
    <Card className="w-full max-w-md mx-auto mt-8 p-4">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">🎙️ Commentary</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {comments.length === 0 ? (
            <p className="italic text-muted-foreground">Waiting for commentary…</p>
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
