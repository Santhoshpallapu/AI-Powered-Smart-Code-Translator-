import { useState } from "react";
import toast from "react-hot-toast";
import CodeEditor from "../components/CodeEditor.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import LanguageSelector from "../components/LanguageSelector.jsx";
import { STARTER_CODE } from "../constants/language.js";
import codeService from "../services/codeService.js";
import '../styles/home.css';

const ACTIONS = [
  { id: 'explain', label: 'Explain Code', icon: '📚' },
  { id: 'debug', label: 'Debug Code', icon: '🔧' },
  { id: 'optimize', label: 'Optimize Code', icon: '⚡' },
  { id: 'review', label: 'Code Review', icon: '👁️' },
  { id: 'tests', label: 'Generate Tests', icon: '🧪' },
  { id: 'document', label: 'Generate Docs', icon: '📖' },
  { id: 'refactor', label: 'Refactor Code', icon: '🔄' }
];

function HomePage() {
  const [code, setCode] = useState(STARTER_CODE.python);
  const [language, setLanguage] = useState('python');
  const [activeAction, setActiveAction] = useState('explain');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAction = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let response;

      switch (activeAction) {
        case 'explain':
          response = await codeService.explainCode(code, language);
          break;
        case 'debug':
          response = await codeService.debugCode(code, language, 'Please debug this code');
          break;
        case 'optimize':
          response = await codeService.optimizeCode(code, language);
          break;
        case 'review':
          response = await codeService.reviewCode(code, language);
          break;
        case 'tests':
          response = await codeService.generateTests(code, language);
          break;
        case 'document':
          response = await codeService.generateDocumentation(code, language);
          break;
        case 'refactor':
          response = await codeService.refactorCode(code, language);
          break;
        default:
          throw new Error('Invalid action selected');
      }

      if (response.data.success) {
        setResult(response.data.response);
        toast.success('Code processed successfully!');
      } else {
        setError(response.data.error || 'Processing failed');
        toast.error('Processing failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(STARTER_CODE[newLanguage] || '');
    setResult(null);
    setError('');
  };

  const clearResult = () => {
    setResult(null);
    setError('');
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>AI Code Assistant</h1>
        <p>Get help with debugging, optimization, documentation, and more</p>
      </div>

      <div className="home-content">
        <div className="editor-section">
          <div className="editor-header">
            <LanguageSelector
              language={language}
              onLanguageChange={handleLanguageChange}
            />
          </div>

          <CodeEditor
            code={code}
            language={language}
            onChange={setCode}
          />
        </div>

        <div className="actions-section">
          <div className="actions-header">
            <h3>Choose Action</h3>
          </div>

          <div className="actions-grid">
            {ACTIONS.map((action) => (
              <button
                key={action.id}
                className={`action-btn ${activeAction === action.id ? 'active' : ''}`}
                onClick={() => setActiveAction(action.id)}
                disabled={loading}
              >
                <span className="action-icon">{action.icon}</span>
                <span className="action-label">{action.label}</span>
              </button>
            ))}
          </div>

          <button
            className="process-btn"
            onClick={handleAction}
            disabled={loading || !code.trim()}
          >
            {loading ? 'Processing...' : 'Process Code'}
          </button>
        </div>

        <div className="output-section">
          <OutputPanel
            result={result}
            error={error}
            loading={loading}
            onClear={clearResult}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const handleSpurceChange = (langId) => {
        setSourceLanguage(langId);
        if(STARTER_CODE[langId]) setCode(STARTER_CODE[langId]);
        setResult(null);
    };
    const handleTargetChange = (langId) => {

}