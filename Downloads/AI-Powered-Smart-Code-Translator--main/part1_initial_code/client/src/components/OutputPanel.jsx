import '../styles/output.css';

function OutputPanel({ result, error, loading, onClear }) {
  if (loading) {
    return (
      <div className="output-panel">
        <div className="output-header">
          <h3>Processing...</h3>
        </div>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>AI is analyzing your code...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="output-panel">
        <div className="output-header">
          <h3>Error</h3>
          <button className="clear-btn" onClick={onClear}>Clear</button>
        </div>
        <div className="error-state">
          <div className="error-icon">!</div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="output-panel">
        <div className="output-header">
          <h3>Output</h3>
        </div>
        <div className="empty-state">
          <div className="empty-icon">...</div>
          <p>Write some code and choose an action to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="output-panel">
      <div className="output-header">
        <h3>AI Response</h3>
        <button className="clear-btn" onClick={onClear}>Clear</button>
      </div>

      <div className="output-content">
        <div className="output-text">
          <pre>{result}</pre>
        </div>
      </div>
    </div>
  );
}

export default OutputPanel;
