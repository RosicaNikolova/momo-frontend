import HomePage from './pages/HomePage'
import TestPage from './pages/TestPage'
import './App.css'

function App() {
  const showTest = true; // ← change to false for HomePage

  return (
    <div className="app">
      {showTest ? <TestPage /> : <HomePage />}
    </div>
  );
}

export default App
