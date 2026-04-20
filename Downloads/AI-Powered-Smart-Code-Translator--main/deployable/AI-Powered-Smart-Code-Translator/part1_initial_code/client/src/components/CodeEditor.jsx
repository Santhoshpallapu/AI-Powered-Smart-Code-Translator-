import Editor from "@monaco-editor/react";

const MONACO_LANGUAGE_MAP = {
  javascript: 'javascript',
  python: 'python',
  java: 'java',
  cpp: 'cpp',
  csharp: 'csharp',
  typescript: 'typescript',
  sql: 'sql',
  html: 'html',
  css: 'css',
  rust: 'rust',
  go: 'go',
  php: 'php',
};

function CodeEditor({ language, code, onChange, readOnly = false }) {
  const handleEditorChange = (value) => {
    onChange(value || '');
  };

  return (
    <div className="code-editor">
      <Editor
        height="100%"
        language={MONACO_LANGUAGE_MAP[language] || 'plaintext'}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          fontFamily: 'JetBrains Mono, Consolas, monospace',
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          readOnly,
          padding: { top: 14, bottom: 14 },
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          detectIndentation: true,
          folding: true,
          lineNumbers: 'on',
          renderWhitespace: 'selection',
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true
          }
        }}
      />
    </div>
  );
}

export default CodeEditor;