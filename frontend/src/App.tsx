import { useState } from "react"
import { Cards } from "./components/Cards"
import { Commentary } from "./components/Commentary"
import { MatchControls } from "./components/MatchControls"
import { Scoreboard } from "./components/Scoreboard"
import { TeamSelector } from "./components/TeamSelector"

type MatchEvent =
  | { type: "goal"; team: string }
  | { type: "card"; team: string; player: string; cardType: string }

function App() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [homeTeam, setHomeTeam] = useState("")
  const [awayTeam, setAwayTeam] = useState("")
  const [events, setEvents] = useState<MatchEvent[]>([])

  const handleEvent = (event: MatchEvent) => {
    if (isRunning) setEvents((prev) => [...prev, event])
  }

  if (!homeTeam || !awayTeam) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        <TeamSelector
          onTeamsSet={(home, away) => {
            setHomeTeam(home)
            setAwayTeam(away)
          }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6">⚽ Soccerize</h1>

      <MatchControls onSecondsUpdate={setSeconds} setIsRunning={setIsRunning} />
      <Scoreboard
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        onEvent={handleEvent}
        isRunning={isRunning}
        events={events}
      />
      <Cards
        currentSeconds={seconds}
        onCardEvent={(player, type) =>
          handleEvent({
            type: "card",
            team: "", // You can enhance this with player-team mapping
            player,
            cardType: type,
          })
        }
        isRunning={isRunning}
      />
      <Commentary
        currentSeconds={seconds}
        events={events}
        isRunning={isRunning}
      />
    </div>
  )
}

export default App
