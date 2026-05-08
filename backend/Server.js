const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/news', async (req, res) => {
  const { query, country, pageSize } = req.query
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=${country}&max=${pageSize}&apikey=3d209ae2812c08306dae1d385124426d`

  try {
    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' })
  }
})

app.listen(5000, () => console.log('Server running on port 5000'))