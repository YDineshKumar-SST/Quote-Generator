import { useState, useEffect } from 'react';
import Navbar from './Navbar';

export default function Quote({ user, onLogout, theme, onToggleTheme }) {
  const [quote, setQuote] = useState({ content: "Loading...", author: "" });
  const [liked, setLiked] = useState([]);

  const storageKey = `liked_${user}`;

  const fetchQuote = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/quotes/random?timestamp=${Date.now()}`);
      const data = await res.json();
      setQuote({ content: data.quote, author: data.author });
    } catch (error) {
      setQuote({ content: "Failed to fetch quote.", author: "" });
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setLiked(JSON.parse(stored));
      } catch {}
    }
    fetchQuote();
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(liked));
  }, [liked, storageKey]);

  const handleLike = () => {
    const exists = liked.find(q => q.content === quote.content);
    if (exists) {
      setLiked(liked.filter(q => q.content !== quote.content));
    } else {
      setLiked([...liked, quote]);
    }
  };

  const handleDelete = (content) => {
    setLiked(liked.filter(q => q.content !== content));
  };

  const isCurrentLiked = liked.some(q => q.content === quote.content);

  return (
    <div className="app-container">
      <Navbar title={`Hello ${user}`} onLogout={onLogout} theme={theme} onToggleTheme={onToggleTheme} />

      <section className="quote-section">
        <div className="quote-card" key={quote.content}>
          <p className="quote-text">"{quote.content}"</p>
          <p className="quote-author">- {quote.author}</p>
          <div className="button-group">
            <button className="btn-primary" onClick={fetchQuote}>New Quote</button>
            <button
              className={isCurrentLiked ? 'btn-secondary liked' : 'btn-secondary'}
              onClick={handleLike}
            >
              <span role="img" aria-label="like">{isCurrentLiked ? '💔' : '❤️'}</span>
              {isCurrentLiked ? ' Unlike' : ' Like'}
            </button>
          </div>
        </div>
      </section>

      <section className="liked-section">
        <h4>Liked Quotes ({liked.length})</h4>
        <ul className="liked-list">
          {liked.map((q, i) => (
            <li key={i} className="liked-item">
              <div className="liked-content">
                <p className="quote-saved-text">"{q.content}"</p>
                <p className="quote-saved-author">— {q.author}</p>
              </div>
              <button
                className="btn-delete"
                onClick={() => handleDelete(q.content)}
                aria-label="remove quote"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}