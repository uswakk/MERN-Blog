import {HashRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Landing from './pages/Landing'
import CreateBlog from './pages/CreateBlog'
import ReadBlog from './pages/ReadBlog'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import Layout from './components/Layout'
import { useEffect } from 'react'
import axios from 'axios'
import "./index.css"


function App() {

  useEffect(()=>{
    let token = sessionStorage.getItem("User")

    if(token)
    {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route element={<Layout/>}>
          <Route path="/home" element={<Home/>}/>
          <Route path="/createblog" element={<CreateBlog/>}/>
          <Route path="/readblog/:id" element={<ReadBlog/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App