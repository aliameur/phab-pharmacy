'use client';

import React, { useState } from 'react';

import { createAccount } from '../services/bankService';

const CreateAccount = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createAccount(name);
      console.log('Account created', response.data);
    } catch (error) {
      console.error('Error creating account', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Account Holder's Name"
      />
      <button type="submit">Create Account</button>
    </form>
  );
};

export default CreateAccount;
