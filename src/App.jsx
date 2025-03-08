import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import HomePage from './components/pages/HomePage/HomePage';
import Register from './components/pages/RegisterPage/Register';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/pages/LoginPage/Login';
import CreatePost from './components/pages/CreatePage/Create';
import PostPage from './components/pages/ViewPostPage/PostPage';
import Profile from './components/pages/Profile/ProfilePage/Profile';
import Lasts from './components/pages/LastsPostsPage/Lasts';



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
    } else if (location.pathname === '/profile'){
      setActiveTab('profile')
    } else if (location.pathname === '/lasts'){
      setActiveTab('lasts')
    } else if (location.pathname === "/search") {
      setActiveTab('search')
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
        <Route path='/profile' element={<Profile />}/>
        <Route path='/edit/:postID' element={<CreatePost />}/>
        <Route path='/lasts' element={<Lasts />}/>
      </Routes>
    </>
  )
}

export default App
