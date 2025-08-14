import {useState, useContext, createContext} from 'react'
import './App.css'

export function App() {
    return (
        <ThemeProvider/>
    );
}

type Theme = "light" | "dark";

type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
    theme: "light",
    toggleTheme: () => {},
});
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = () => {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme}>
                <Header/>
                <Content/>
            </div>
        </ThemeContext.Provider>
    );
}

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <header className={theme}>
            <h1>Моё приложение</h1>
            <button onClick={toggleTheme}>
                Switch theme({theme === "light" ? "dark" : "light"})
            </button>
        </header>
    )
}

const Content = () => {
    const {theme} = useTheme();
    return (
        <main className={theme}>
            <p>
                Основной контент. Текущая тема:{" "}
                <strong>{theme === "light" ? "Светлая" : "Тёмная"}</strong>
            </p>
        </main>
    )
}