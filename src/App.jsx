import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import HomePage from './components/HomePage/HomePage';
import Register from './components/RegisterPage/Register';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/LoginPage/Login';
import CreatePost from './components/CreatePage/Create';
import PostPage from './components/ViewPostPage/PostPage';



function App() { 
  const [activeTab, setActiveTab] = useState("home");
  const location = useLocation(); // Получаем текущий путь


  useEffect(() => {
    if (location.pathname === '/') {
      console.log()
      setActiveTab("home");
    } else if (location.pathname === '/register') {
      setActiveTab("register");
    } else if (location.pathname === '/login') {
      setActiveTab("login");
    } else if (location.pathname === '/create') {
      setActiveTab("create");
    } else if (location.pathname.slice(0, 5) === '/post'){  
      setActiveTab('')
    }
  }, [location]);

  return (
    <>
      <Header invis={activeTab === '' ? true : false} active={activeTab}></Header>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}/>
        <Route path='/register' element={<Register></Register>}/>
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/create' element={<CreatePost />}/>
        <Route path='/post/:postId' element={<PostPage />}></Route>
      </Routes>
    </>
  )
}

export default App
