
const SUPPORTED_LANGUAGES = [
    { id: "python", name: "Python" },
    { id: "javascript", name: "JavaScript" },
    { id: "java", name: "Java" },
    { id: "cpp", name: "C++" },
    { id: "csharp", name: "C#" },
    { id: "ruby", name: "Ruby" },
    { id: "go", name: "Go" },
    { id: "php", name: "PHP" },
    { id: 'c', name: 'C' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'swift', name: 'Swift' },
];

export const getLanguageName = (langId) => {
    const lang = SUPPORTED_LANGUAGES.find(l  => l.id === langId);
    return lang ? lang.name : langId;
}