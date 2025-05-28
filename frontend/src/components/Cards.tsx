import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { postCard } from "@/lib/api"

type CardType = "Yellow" | "Red"

type PlayerCard = {
  name: string
  type: CardType
  time: number
  selectedTeam: string
}

type Props = {
  currentSeconds: number
  homeTeam: string
  awayTeam: string
  onCardEvent: (player: string, type: CardType, selectedTeam: string,second:number) => void
  isRunning: boolean
  matchId:string
  
}

export const Cards = ({ currentSeconds, homeTeam, awayTeam, onCardEvent, isRunning, matchId }: Props) => {
  const [playerName, setPlayerName] = useState("")
  const [cardType, setCardType] = useState<CardType>("Yellow")
  const [selectedTeam, setSelectedTeam] = useState("")
  const [cards, setCards] = useState<PlayerCard[]>([])

  const handleAddCard = async () => {
    if (!playerName.trim() || !selectedTeam) {
      alert("Please enter a player name AND select a team!")
      return
    }

    const newCard = {
      name: playerName,
      type: cardType,
      time: currentSeconds,
      selectedTeam: selectedTeam,
    }

    setCards([...cards, newCard])
    try {
      //fire the event locally to App
      onCardEvent(playerName, cardType, selectedTeam,currentSeconds)
      //making async call to database
      const result = await postCard(selectedTeam,playerName,cardType,currentSeconds,matchId)
      console.log('Card Saved', result.message)



    }catch (error){
      console.error("Can't send Card details", error)
      alert('Failed to save Card details')

    }
    


    setPlayerName("")
    setCardType("Yellow")
    setSelectedTeam("")
  }


  const formatTime = (secs: number) =>
    `${Math.floor(secs / 60)}' ${String(secs % 60).padStart(2, "0")}"`

  return (
    <Card className="w-full max-w-md mx-auto mt-8 p-4">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">{'\u{1F7E5}'} {'\u{1F7E8}'} Cards</h2>

        <div className="flex flex-col space-y-3">
          <Input
            disabled={!isRunning}
            placeholder="Enter player name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <select
            disabled={!isRunning}
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="border rounded-md p-2 text-sm bg-background"
          >
            <option value="">Select Team</option>
            <option value={homeTeam}>{homeTeam}</option>
            <option value={awayTeam}>{awayTeam}</option>
          </select>


          <select
            disabled={!isRunning}
            value={cardType}
            onChange={(e) => setCardType(e.target.value as CardType)}
            className="border rounded-md p-2 text-sm bg-background"
          >
            <option value="Yellow">🟨 Yellow</option>
            <option value="Red">🟥 Red</option>
          </select>


          <Button onClick={handleAddCard} disabled={!isRunning}>
            Add Card
          </Button>
        </div>

        <div className="mt-6 space-y-2">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`flex justify-between p-2 rounded-md shadow ${card.type === "Red" ? "bg-red-500 text-white" : "bg-yellow-400"
                }`}
            >
              <span className="text-sm font-medium">
                {card.name}{" "}
                {card.selectedTeam}{" "}
                {card.type} - {formatTime(card.time)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
