const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', badge: 'JS' },
  { id: 'python', name: 'Python', badge: 'PY' },
  { id: 'java', name: 'Java', badge: 'JV' },
  { id: 'cpp', name: 'C++', badge: 'C++' },
  { id: 'csharp', name: 'C#', badge: 'C#' },
  { id: 'typescript', name: 'TypeScript', badge: 'TS' },
  { id: 'sql', name: 'SQL', badge: 'SQL' },
  { id: 'html', name: 'HTML', badge: 'HTML' },
  { id: 'css', name: 'CSS', badge: 'CSS' },
  { id: 'rust', name: 'Rust', badge: 'RS' },
  { id: 'go', name: 'Go', badge: 'GO' },
  { id: 'php', name: 'PHP', badge: 'PHP' },
];

function LanguageSelector({ language, onLanguageChange, disabled = false }) {
  return (
    <div className="language-selector">
      <label htmlFor="language-select">Language:</label>
      <select
        id="language-select"
        className="lang-select"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">Select Language</option>
        {LANGUAGES.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.badge} - {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;
