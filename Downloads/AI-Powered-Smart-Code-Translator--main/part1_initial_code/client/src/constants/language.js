
const LANGUAGES = [
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
const MONACO_LANGUAGES = {
    python: "python",
    javascript: "javascript",
    java: "java",
    cpp: "cpp",
    csharp: "csharp",
    ruby: "ruby",
    go: "go",
    php: "php",
    c: "c",
    typescript: "typescript",
    swift: "swift",
};
const STARTER_CODE = {
    python: `print("Hello, World!")`,
    javascript: `console.log("Hello, World!");`,
    java: `System.out.println("Hello, World!");`,
    cpp: `std::cout << "Hello, World!" << std::endl;`,
    csharp: `Console.WriteLine("Hello, World!");`,
    ruby: `puts "Hello, World!"`,
    go: `fmt.Println("Hello, World!")`,
    php: `echo "Hello, World!";`,
    c: `printf("Hello, World!\\n");`,
    typescript: `console.log("Hello, World!");`,
    swift: `print("Hello, World!")`,
};
export { LANGUAGES, MONACO_LANGUAGES, STARTER_CODE };