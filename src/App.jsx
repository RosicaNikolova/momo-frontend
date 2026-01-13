import { Routes, Route, Navigate } from 'react-router-dom';
import TestPage from './pages/TestPage';
import ResidentDetailPage from './pages/ResidentDetailPage';
import HomePage from './pages/HomePage';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/overview" element={<TestPage />} /> */}
        <Route path="/resident/:residentId" element={<ResidentDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
