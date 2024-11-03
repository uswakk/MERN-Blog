import React, { useState } from 'react';
import CreateUser from '../components/CreateUser';
import Login from '../components/Login';
import { Button } from "@/components/ui/button";

const Landing = () => {
  const [view, setView] = useState(0); // 0 for Login, 1 for Create User

  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center p-4'>
      {view ? (
        <div className='flex flex-col w-full max-w-md'>
          <CreateUser />
          <Button className="mt-1" onClick={() => setView(!view)}>
            Already have an account? Log In
          </Button>
        </div>
      ) : (
        <div className='flex flex-col w-full max-w-md'>
          <Login />
          <Button className="mt-1" onClick={() => setView(!view)}>
            Switch to Sign Up
          </Button>
        </div>
      )}
    </div>
  );
};

export default Landing;
