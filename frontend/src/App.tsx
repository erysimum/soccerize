import { useState } from "react"
import { Cards } from "./components/Cards"
import { Commentary } from "./components/Commentary"
import { MatchControls } from "./components/MatchControls"
import { Scoreboard } from "./components/Scoreboard"
import { TeamSelector } from "./components/TeamSelector"

type MatchEvent =
  | { type: "goal"; selectedTeam: string; player: string, second:number }
  | { type: "card"; selectedTeam: string; player: string; cardType: string,second:number }

function App() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [homeTeam, setHomeTeam] = useState("")
  const [awayTeam, setAwayTeam] = useState("")
  const [events, setEvents] = useState<MatchEvent[]>([])
  const [matchId,setMatchId]= useState("")

  const handleEvent = (event: MatchEvent) => {
    if (isRunning) setEvents((prev) => [...prev, event])
  }

  if (!homeTeam || !awayTeam) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        <TeamSelector
          onTeamsSet={(home, away,matchId) => {
            setHomeTeam(home)
            setAwayTeam(away)
            setMatchId(matchId)
          }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex justify-center">
      <div className="w-full max-w-4xl px-4 py-10 space-y-10">
        <h1 className="text-4xl font-bold text-center">{'\u{26BD}'} Soccerize</h1>

        <MatchControls
          onSecondsUpdate={setSeconds}
          setIsRunning={setIsRunning}
        />

        <Scoreboard
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          onEvent={handleEvent}
          isRunning={isRunning}
          events={events}
          currentSeconds={seconds}
          matchId={matchId}
        />

        <Cards
          currentSeconds={seconds}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          onCardEvent={(player, type, selectedTeam,currentSeconds) =>
            handleEvent({
              type: "card",
              selectedTeam,
              player,
              cardType: type,
              second:currentSeconds
            })
          }
          isRunning={isRunning}
          matchId={matchId}
          
        />

        <Commentary
        isRunning={isRunning}
        />
      </div>
    </div>
  )
}

export default App
