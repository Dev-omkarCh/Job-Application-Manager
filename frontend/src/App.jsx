// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Applications from './pages/Applications';
import AddApplication from './pages/AddApplication';
import AnalysisPage from './pages/AnalysisPage';
import MainLayout from './layouts/MainLayout';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/auth';

function App() {
  const { authUser } = useAuthStore();
  return (
    <>
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={ authUser ? <Applications /> : <Login />} />
        <Route path="/signup" element={authUser ? <Applications /> :<Signup />} />
        <Route path="/home" element={authUser ? <MainLayout /> : <Login />} />
        <Route path="/applications" element={authUser ? <Applications /> : <Login />} />
        <Route path="/add" element={authUser ? <AddApplication /> : <Login />} />
        <Route path="/analytics" element={authUser ? <AnalysisPage />: <Login />} />
      </Routes>
      <Toaster />
    </>
      
  );
}

export default App;
