// index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => res.send('Node backend is healthy!'));
app.post('/event', (req, res) => res.json({ status: 'Event received', data: req.body }));
app.get('/commentary', (_, res) => res.json({ commentary: 'Goal! What a screamer from Messi!' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0', () => console.log(`Node backend running on port ${PORT}`));
