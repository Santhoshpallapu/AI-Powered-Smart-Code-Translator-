
const TargetLanguageSelector = ({ targetLanguage, onTargetLanguageChange, disabled }) => {
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'sql', label: 'SQL' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'rust', label: 'Rust' },
    { value: 'go', label: 'Go' },
    { value: 'php', label: 'PHP' },
  ];

  return (
    <div className="target-language-selector">
      <label htmlFor="target-language" className="selector-label">
        Translate to:
      </label>
      <select
        id="target-language"
        value={targetLanguage}
        onChange={(e) => onTargetLanguageChange(e.target.value)}
        disabled={disabled}
        className="language-select"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TargetLanguageSelector;
