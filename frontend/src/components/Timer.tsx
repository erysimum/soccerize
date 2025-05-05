import { Card, CardContent } from "@/components/ui/card"

type TimerProps = {
    seconds: number
  }
  
export const Timer = ({seconds}:TimerProps) => {
 

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secsPart = seconds % 60
    return `${mins}' ${secsPart.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full max-w-md mx-auto text-center mt-4">
      <CardContent>
        <h2 className="text-2xl font-bold">Match Time</h2>
        <p className="text-xl mt-2">{formatTime(seconds)}</p>
      </CardContent>
    </Card>
  )
}
