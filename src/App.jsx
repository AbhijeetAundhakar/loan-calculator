import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext'; // Import useTheme
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExchangeRatesPage from './pages/ExchangeRatesPage';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import NotFound from './pages/NotFound';
import './index.css';

// Create a separate component that uses the theme context
const ThemedApp = () => {
  const { darkMode } = useTheme(); // Get darkMode from context

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Navbar />
      <main className="container mx-auto p-4 dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exchange-rates" element={<ExchangeRatesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppProvider>
          <ThemedApp /> {/* Use the themed component here */}
        </AppProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;