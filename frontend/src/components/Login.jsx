import React, { useState } from 'react';
import { verifyUser } from '../api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null); // Reset error before each submission

    try {
      const response = await verifyUser(user);
    

     if (response)
     {
        console.log("Everythings Fine")
        navigate("/home")
        sessionStorage.setItem("User", response)
        axios.defaults.headers.common["Authorization"] = `Bearer ${response}`
     }
     else
     {
        alert("Login Failed")
     }

      
    } 
    catch (err) {
        
        console.log("Error")
      setError('An error occurred: ' + err.message);
      alert("Login Failed: "+ err.message)
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <Input
        className="mb-4"
        placeholder="Email"
        onChange={handleChange}
        name="email"
      />
      <Input
        className="mb-5"
        placeholder="Password"
        onChange={handleChange}
        name="password"
        type="password"
      />
      <Button className="mb-2" type="submit">
        Login
      </Button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Login;
