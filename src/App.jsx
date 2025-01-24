import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import HomePage from './components/HomePage/HomePage';
import Register from './components/RegisterPage/Register';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/LoginPage/Login';

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
    } else if (location.pathname === '/create') {
      setActiveTab("create");
    }
  }, [location]); // useEffect будет срабатывать при изменении маршрута

  return (
    <>
      <Header active={activeTab} invis={activeTab === '' ? true : false}></Header>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}/>
        <Route path='/register' element={<Register></Register>}/>
        <Route path='/login' element={<Login></Login>}/>
      </Routes>
    </>
  )
}

export default App
