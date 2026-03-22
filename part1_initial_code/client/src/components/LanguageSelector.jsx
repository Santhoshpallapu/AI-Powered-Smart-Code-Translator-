const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', icon: '🟨' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'cpp', name: 'C++', icon: '⚡' },
  { id: 'csharp', name: 'C#', icon: '🔷' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷' },
  { id: 'sql', name: 'SQL', icon: '🗄️' },
  { id: 'html', name: 'HTML', icon: '🌐' },
  { id: 'css', name: 'CSS', icon: '🎨' },
  { id: 'rust', name: 'Rust', icon: '🦀' },
  { id: 'go', name: 'Go', icon: '🐹' },
  { id: 'php', name: 'PHP', icon: '🐘' },
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
            {lang.icon} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;

