import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import HomePage from './components/HomePage/HomePage';


function App() { 
  const [activeTab, setActiveTab] = useState("home");
  return (
    <>
      <Header active={activeTab}></Header>
      {activeTab === "home" ? <HomePage></HomePage> : ""}
    </>
  )
}

export default App
