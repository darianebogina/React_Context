import React, {useState, useContext, createContext} from 'react'
import './App.css'

export function App() {
    return (
        <ThemeProvider>
            <Header/>
            <Content/>
            <WrapperContent3/>
        </ThemeProvider>
    );
}

type Theme = "light" | "dark";

type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
    theme: "light",
    toggleTheme: () => {
    },
});
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({children}: React.PropsWithChildren ) => {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

const Header = () => {
    const {theme, toggleTheme} = useTheme();
    return (
        <header>
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
        <main>
            <p>
                Основной контент. Текущая тема:{" "}
                <strong>{theme === "light" ? "Светлая" : "Тёмная"}</strong>
            </p>
        </main>
    )
}

const Content3 = (() => {
    return (
        <div>
            <p>
                Основной контент.
            </p>
        </div>
    )
});

const WrapperContent3 = () => {
    return <Content3/>;
}