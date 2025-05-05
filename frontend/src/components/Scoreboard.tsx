import { Button } from "@/components/ui/button"

type MatchEvent =
  | { type: "goal"; team: string }
  | { type: "card"; team: string; player: string; cardType: string }

type ScoreboardProps = {
  homeTeam: string
  awayTeam: string
  onEvent: (event: MatchEvent) => void
  isRunning: boolean
  events: MatchEvent[]
}

export const Scoreboard = ({
  homeTeam,
  awayTeam,
  onEvent,
  isRunning,
  events,
}: ScoreboardProps) => {
  const handleGoal = (team: string) => {
    if (isRunning) {
      onEvent({ type: "goal", team })
    }
  }

  const homeScore = events.filter(
    (e) => e.type === "goal" && e.team === homeTeam
  ).length

  const awayScore = events.filter(
    (e) => e.type === "goal" && e.team === awayTeam
  ).length

  return (
    <div className="flex flex-col items-center my-4">
      <div className="text-xl mb-2 font-bold">
        {homeTeam} {homeScore} - {awayScore} {awayTeam}
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        <Button
          onClick={() => handleGoal(homeTeam)}
          disabled={!isRunning}
          variant="default"
        >
          ⚽ {homeTeam} Goal
        </Button>
        <Button
          onClick={() => handleGoal(awayTeam)}
          disabled={!isRunning}
          variant="default"
        >
          ⚽ {awayTeam} Goal
        </Button>
      </div>
    </div>
  )
}
