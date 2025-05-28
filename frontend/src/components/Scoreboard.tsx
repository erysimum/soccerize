import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { postGoal } from "@/lib/api"


type MatchEvent =
  | { type: "goal"; selectedTeam: string; player: string, second:number }
  | { type: "card"; selectedTeam: string; player: string; cardType: string, second:number }

type ScoreboardProps = {
  homeTeam: string
  awayTeam: string
  onEvent: (event: MatchEvent) => void
  isRunning: boolean
  events: MatchEvent[]
  currentSeconds:number
  matchId:string
}

export const Scoreboard = ({
  homeTeam,
  awayTeam,
  onEvent,
  isRunning,
  events,
  currentSeconds,
  matchId
}: ScoreboardProps) => {
  const [homeScorer, setHomeScorer] = useState("")
  const [awayScorer, setAwayScorer] = useState("")

  const handleGoal = async (team: string, player: string,currentSeconds:number) => {
    if (!player.trim()) {
      alert("Please enter the goal scorer's name!")
      return
    }

    try {
      // fire the event locally to App
      onEvent({ type: "goal", selectedTeam: team, player,second:currentSeconds })
      //POST to backend
      const result = await postGoal(team, player,currentSeconds, matchId)
      console.log('Goal is saved', result.message)



    } catch (error) {
      console.error('Failed to send the Goal and GoalScorer to backend', error)
      alert('Failed to record a Gaol,Try again Later')

    }

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
        <span>{'\u26BD'} Goals</span>
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
              handleGoal(homeTeam, homeScorer,currentSeconds)
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
              handleGoal(awayTeam, awayScorer,currentSeconds)
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
                {goal.selectedTeam}{" "}- at {goal.second}

              </span>

            </div>
          ))}
      </div>
    </div>
  )
}
