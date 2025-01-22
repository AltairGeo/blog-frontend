import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import HomePage from './components/HomePage/HomePage';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() { 
  const [activeTab, setActiveTab] = useState("home");
  const location = useLocation(); // Получаем текущий путь

  
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab("home");
    } else if (location.pathname === '/register') {
      setActiveTab("register");
    } else if (location.pathname === '/login') {
      setActiveTab("login");
    }
  }, [location]); // useEffect будет срабатывать при изменении маршрута

  return (
    <>
      <Header active={activeTab}></Header>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}/>
          <Route path='/register' element={null}/>
        </Routes>
    </>
  )
}

export default App
