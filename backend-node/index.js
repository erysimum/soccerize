// index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => res.send('Node backend is healthy!'));
app.post('/event', (req, res) => res.json({ status: 'Event received', data: req.body }));
app.get('/commentary', (_, res) => res.json({ commentary: 'Goal! What a screamer from Messi!' }));

app.post('/goal', (req, res) => {
  const { matchId, team, player,second } = req.body;
  console.log(`GOAL for ${team} by ${player} in match ${matchId} at ${second}`);
  res.status(200).json({ message: "Goal recorded!" });
});

app.post('/card', (req, res) => {
  const { matchId, team, player, card,second } = req.body;
  console.log(`CARD for ${player} (${team}) - ${card} at ${second}`);
  res.status(200).json({ message: "Card recorded!" });
});

app.post('/reset', (req, res) => {
  console.log("Match reset.");
  res.status(200).json({ message: "Match reset!" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0', () => console.log(`Node backend running on port ${PORT}`));
