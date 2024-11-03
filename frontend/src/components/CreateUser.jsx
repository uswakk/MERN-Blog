import React, { useState } from 'react';
import { createUser } from '../api';
import { Input } from "@/components/ui/Input"
import { Button } from '@/components/ui/Button';

const CreateUser = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null); // Reset error before each submission

    try {
      const response = await createUser(user);

      if (response.status === 200) {
        alert('User created successfully!');
      } else {
        alert('Unable to create user. Please try again.');
      }
    } catch (err) {
      setError('An error occurred: ' + err.message);
    }
  }

  return (
    <form className="flex flex-col " onSubmit={handleSubmit}>
      <Input
        className="mb-4"
        placeholder="Name"
        onChange={handleChange}
        name="name"
      />
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
        Submit
      </Button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default CreateUser;
