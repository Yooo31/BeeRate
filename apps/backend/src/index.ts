import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get('/beers', (req, res) => {
  res.json({ message: "Hello, Beers!" });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
