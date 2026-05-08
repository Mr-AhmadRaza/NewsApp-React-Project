import { useState } from 'react';
import './NewsComponent.css';

export default function NewsComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNews = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError('');
    setArticles([]);

    try {
      // Call backend API
      const response = await fetch(
        `http://localhost:5000/api/news?query=${encodeURIComponent(searchQuery)}&max=10`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();

      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
      } else {
        setError('No articles found. Try a different search.');
      }

    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Make sure backend is running on http://localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="news-container">
      <h1>📰 News Finder</h1>

      <form onSubmit={fetchNews} className="search-form">
        <input
          type="text"
          placeholder="Search news (e.g., Pakistan, technology, sports)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">⏳ Loading news...</div>}

      <div className="articles-grid">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            {article.image && (
              <img 
                src={article.image} 
                alt={article.title} 
                className="article-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="article-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <div className="article-meta">
                <span>📍 {article.source.name}</span>
                <span>📅 {new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="read-btn"
              >
                Read Full Article →
              </a>
            </div>
          </div>
        ))}
      </div>

      {!loading && articles.length === 0 && !error && (
        <div className="empty-state">
          <p>🔍 Search for news to get started!</p>
        </div>
      )}
    </div>
  );
}