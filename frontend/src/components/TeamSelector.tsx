import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

type Props = {
  onTeamsSet: (home: string, away: string) => void
}

const leagueTeams = {
  "English Premier League": ["Arsenal", "Chelsea", "Liverpool", "Manchester City", "Manchester United", "Tottenham"],
  "La Liga": ["Barcelona", "Real Madrid", "Atletico Madrid", "Sevilla", "Real Betis"],
  "Serie A": ["Juventus", "AC Milan", "Inter Milan", "Roma", "Napoli"],
  "Bundesliga": ["Bayern Munich", "Borussia Dortmund", "RB Leipzig", "Leverkusen"],
  "Ligue 1": ["PSG", "Marseille", "Lyon", "Monaco"],
}

export const TeamSelector = ({ onTeamsSet }: Props) => {
  const [home, setHome] = useState("")
  const [away, setAway] = useState("")
  const [error, setError] = useState("")

  const handleStart = () => {
    if (home === away) {
      setError(" Home and Away teams must be different!")
      return
    }
    setError("")
    onTeamsSet(home, away)
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6 text-white bg-neutral-800">
      <CardContent className="space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Select Teams</h2>

        <div className="space-y-2">
          <Label> {'\u{1F3E0}'}Home Team</Label>
          <select
            className="w-full p-2 rounded bg-neutral-700 text-white"
            value={home}
            onChange={(e) => setHome(e.target.value)}
          >
            <option value="">-- Select Home Team --</option>
            {Object.entries(leagueTeams).map(([league, teams]) => (
              <optgroup key={league} label={league}>
                {teams.map((team) => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>{'\u2708\uFE0F'} Away Team</Label>
          <select
            className="w-full p-2 rounded bg-neutral-700 text-white"
            value={away}
            onChange={(e) => setAway(e.target.value)}
          >
            <option value="">-- Select Away Team --</option>
            {Object.entries(leagueTeams).map(([league, teams]) => (
              <optgroup key={league} label={league}>
                {teams.map((team) => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <Button
          className="w-full mt-4"
          onClick={handleStart}
          disabled={!home || !away}
        >
          Start Match Setup
        </Button>
      </CardContent>
    </Card>
  )
}
