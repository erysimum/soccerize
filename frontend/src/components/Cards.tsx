import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type CardType = "Yellow" | "Red"

type PlayerCard = {
  name: string
  type: CardType
  time: number
}

type Props = {
  currentSeconds: number
  onCardEvent: (player: string, type: CardType) => void
  isRunning: boolean
}

export const Cards = ({ currentSeconds, onCardEvent, isRunning }: Props) => {
  const [playerName, setPlayerName] = useState("")
  const [cardType, setCardType] = useState<CardType>("Yellow")
  const [cards, setCards] = useState<PlayerCard[]>([])

  const handleAddCard = () => {
    if (!playerName.trim()) return
    const newCard = { name: playerName, type: cardType, time: currentSeconds }
    setCards([...cards, newCard])
    onCardEvent(playerName, cardType)
    setPlayerName("")
    setCardType("Yellow")
  }

  const formatTime = (secs: number) =>
    `${Math.floor(secs / 60)}' ${String(secs % 60).padStart(2, "0")}"`

  return (
    <Card className="w-full max-w-md mx-auto mt-8 p-4">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">🟥🟨 Cards</h2>

        <div className="flex flex-col space-y-3">
          <Input
            disabled={!isRunning}
            placeholder="Enter player name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
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
              className={`flex justify-between p-2 rounded-md shadow ${
                card.type === "Red" ? "bg-red-500 text-white" : "bg-yellow-400"
              }`}
            >
              <span className="font-medium">{card.name}</span>
              <span className="text-sm">
                {card.type} - {formatTime(card.time)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
