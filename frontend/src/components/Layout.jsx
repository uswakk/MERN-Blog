import React from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Layout = () => {

  
  let user = sessionStorage.getItem("User")
  const navigate = useNavigate()


  useEffect(()=>{
    if(!user)
      {
        navigate("/")
      }
  })



  return (
    <div>
      <Navbar/>
      <main>
      <Outlet className="flex first-letter:w-screen justify-center mt-24"/>
      </main>
    </div>
  )
}

export default Layout
