import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type MatchEvent =
  | { type: "goal"; selectedTeam: string; player: string }
  | { type: "card"; selectedTeam: string; player: string; cardType: string }

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
  const [homeScorer, setHomeScorer] = useState("")
  const [awayScorer, setAwayScorer] = useState("")

  const handleGoal = (team: string, player: string) => {
    if (!player.trim()) {
      alert("Please enter the goal scorer's name!")
      return
    }

    onEvent({ type: "goal", selectedTeam: team, player })
  }


  const homeScore = events.filter(
    (e) => e.type === "goal" && e.selectedTeam === homeTeam
  ).length

  const awayScore = events.filter(
    (e) => e.type === "goal" && e.selectedTeam === awayTeam
  ).length

  return (
    <div className="flex flex-col items-center my-6 gap-6 w-full">
      {/* Heading */}
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <span>{'\u26BD'}</span> Goals
      </h2>

      {/* Scoreline */}
      <div className="text-xl font-bold">
        {homeTeam} {homeScore} - {awayScore} {awayTeam}
      </div>

      {/* Goal input buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <div className="flex flex-1 flex-col gap-2">
          <Input
            disabled={!isRunning}
            placeholder={`Goal scorer for ${homeTeam}`}
            value={homeScorer}
            onChange={(e) => setHomeScorer(e.target.value)}
          />
          <Button
            onClick={() => {
              handleGoal(homeTeam, homeScorer)
              setHomeScorer("")
            }}
            disabled={!isRunning}
            className="w-full"
          >
            ⚽ {homeTeam} Goal
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <Input
            disabled={!isRunning}
            placeholder={`Goal scorer for ${awayTeam}`}
            value={awayScorer}
            onChange={(e) => setAwayScorer(e.target.value)}
          />
          <Button
            onClick={() => {
              handleGoal(awayTeam, awayScorer)
              setAwayScorer("")
            }}
            disabled={!isRunning}
            className="w-full"
          >
            ⚽ {awayTeam} Goal
          </Button>
        </div>
      </div>

      {/* Goal Feed / Who Scored */}
      <div className="w-full max-w-md space-y-2 mt-6">
        {events
          .filter((e) => e.type === "goal")
          .map((goal, index) => (
            <div
              key={index}
              className="text-sm bg-neutral-800 text-white p-2 rounded shadow-sm flex items-center gap-2"
            >
              <span className="text-sm font-medium">
                {goal.player}{" "}
                <span>scored for</span>{" "}
                {goal.selectedTeam}{" "}

              </span>

            </div>
          ))}
      </div>
    </div>
  )
}
