import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import '../styles/history.css';

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock history data for now
    const mockHistory = [
      {
        id: 1,
        date: '2024-01-15 10:30 AM',
        action: 'Explain Code',
        language: 'Python',
        code: 'print("Hello World")',
        result: 'This code prints "Hello World" to the console...'
      },
      {
        id: 2,
        date: '2024-01-15 09:45 AM',
        action: 'Debug Code',
        language: 'JavaScript',
        code: 'console.log(hello)',
        result: 'Error: hello is not defined. You need to declare the variable first...'
      }
    ];

    setTimeout(() => {
      setHistory(mockHistory);
      setLoading(false);
    }, 1000);
  }, []);

  const handleClearHistory = () => {
    setHistory([]);
    toast.success('History cleared');
  };

  if (loading) {
    return (
      <div className="history-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="history-header">
        <h2>Code History</h2>
        {history.length > 0 && (
          <button className="clear-btn" onClick={handleClearHistory}>
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <p>No code history yet</p>
          <p className="empty-subtitle">Start analyzing code to see your history here</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-item-header">
                <div className="history-meta">
                  <span className="history-action">{item.action}</span>
                  <span className="history-language">{item.language}</span>
                  <span className="history-date">{item.date}</span>
                </div>
              </div>
              <div className="history-content">
                <div className="history-code">
                  <pre>{item.code}</pre>
                </div>
                <div className="history-result">
                  <p>{item.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryPage;