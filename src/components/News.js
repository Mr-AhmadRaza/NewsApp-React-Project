import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

function News(props) {
  // ===== DEFAULT PROPS =====
  const country = props.country || 'pk'
  const pageSize = props.pageSize || 10
  const category = props.category || 'general'

  // ===== STATE MANAGEMENT =====
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [searchQuery, setSearchQuery] = useState(category.toLowerCase()) // Fix 2: use category

  // ===== FETCH NEWS FUNCTION =====
  const fetchNews = async (pageNum = 1, query = category.toLowerCase()) => {
    setLoading(true)

    try {
      const url = `https://newsapp-react-project-production.up.railway.app/news?query=${encodeURIComponent(query)}&country=${country}&pageSize=${pageSize}`
      console.log('Fetching from:', url)

      const response = await fetch(url)
      const data = await response.json()

      console.log('Response:', data)

      // ===== API ERROR CHECK =====
      if (data.errors) {
        console.error('API Error:', data.errors)
        setLoading(false)
        return
      }

      setArticles(data.articles || [])
      setTotalResults(data.totalArticles || 0)
      setPage(pageNum)
      setLoading(false)

    } catch (error) {
      console.error('Error fetching news:', error)
      setLoading(false)
    }
  }

  // ===== FIX 1: Re-fetch when category changes =====
  useEffect(() => {
    setPage(1)
    setArticles([])
    const query = category.toLowerCase()
    setSearchQuery(query)
    fetchNews(1, query)
  }, [category]) // category in dependency array = re-runs on every route change

  // ===== HANDLE PREVIOUS BUTTON =====
  const handlePreviousClick = async () => {
    const newPage = page - 1
    if (newPage >= 1) {
      await fetchNews(newPage, searchQuery)
      window.scrollTo(0, 0)
    }
  }

  // ===== HANDLE NEXT BUTTON =====
  const handleNextClick = async () => {
    const newPage = page + 1
    const totalPages = Math.ceil(totalResults / pageSize)

    if (newPage <= totalPages && totalResults > 0) {
      await fetchNews(newPage, searchQuery)
      window.scrollTo(0, 0)
    }
  }

  // ===== HANDLE SEARCH =====
  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchQuery(query)
      fetchNews(1, query)
    }
  }

  // ===== RENDER =====
  return (
    <div className="container my-3">
      {/* Title */}
      <h1 className='text-center' style={{ margin: '70px 0' }}>
        📰 {category} News
      </h1>

      {/* Loading Indicator */}
      {loading && <p className="text-center">⏳ Loading news...</p>}

      {/* Articles Grid */}
      <div className="row">
        {articles && articles.length > 0 ? (
          articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : "No Title"}
                  description={element.description ? element.description : "No Description"}
                  imageUrl={element.image}
                  newurl={element.url}
                />
              </div>
            )
          })
        ) : (
          !loading && <p className="text-center">No articles found. Try a different search.</p>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="container d-flex justify-content-between my-5">
        {/* <button
          disabled={page <= 1}
          type="button"
          className="btn btn-success"
          onClick={handlePreviousClick}
        >
          &larr; Previous
        </button> */}

        <span className="align-self-center">
          Page {page} of {Math.ceil(totalResults / pageSize) || 1}
        </span>

        {/* <button
          disabled={page + 1 > Math.ceil(totalResults / pageSize) || totalResults === 0}
          type="button"
          className="btn btn-success"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button> */}
      </div>
    </div>
  )
}

// ===== PROP TYPES =====
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

// ===== DEFAULT PROPS =====
News.defaultProps = {
  country: 'pk',
  pageSize: 10,
  category: 'general'
}

export default News