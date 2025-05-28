// index.js
import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config(); 
import { publishToQueue } from "./aws/publisherhelper";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => res.send('Node backend is healthy!'));
app.post('/event', (req, res) => res.json({ status: 'Event received', data: req.body }));
app.get('/commentary', (_, res) => res.json({ commentary: 'Goal! What a screamer from Messi!' }));

app.post('/goal',async (req, res) => {
    const { type, matchId, team, player, second } = req.body;
    console.log(`GOAL for ${team} by ${player} in match ${matchId} at ${second}`);
    
    try {
        await publishToQueue({ type, matchId, team, player, second });
        res.status(200).json({ message: "Goal event sent to SQS " });
    } catch (err) {
        res.status(500).json({ error: "SQS publishing failed " });
    }
});

app.post("/card", async (req, res) => {
  const { type, matchId, team, player, card, second } = req.body;

  console.log(`CARD for ${player} (${team}) - ${card} at ${second} in match ${matchId}`);

  try {
    await publishToQueue({ type, matchId, team, player, card, second });
    res.status(200).json({ message: "Card event sent to SQS " });
  } catch (err) {
    res.status(500).json({ error: "SQS publishing failed " });
  }
});

app.post('/reset', (req, res) => {
    console.log("Match reset.");
    res.status(200).json({ message: "Match reset!" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Node backend running on port ${PORT}`));
