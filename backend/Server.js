import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// GNews API Route
app.get('/api/news', async (req, res) => {
  try {
    const { query, max = 10 } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const apiKey = process.env.GNEWS_API_KEY;
    const url = 'https://gnews.io/api/v4/search';

    const response = await axios.get(url, {
      params: {
        q: query,
        lang: 'en',
        country: 'pk',
        max: max,
        apikey: apiKey
      }
    });

    res.status(200).json(response.data);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});