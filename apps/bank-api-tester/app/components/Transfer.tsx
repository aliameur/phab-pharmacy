'use client';

import React, { useState } from 'react';

import { transfer } from '../services/bankService';

const Transfer = () => {
  const [fromAccount, setFromAccount] = useState(0);
  const [toAccount, setToAccount] = useState(0);
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await transfer(fromAccount, toAccount, amount);
      console.log('Transfer successful', response.data);
    } catch (error) {
      console.error('Error during transfer', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={fromAccount}
        onChange={(e) => setFromAccount(Number(e.target.value))}
        placeholder="From Account Number"
        required
      />
      <input
        type="number"
        value={toAccount}
        onChange={(e) => setToAccount(Number(e.target.value))}
        placeholder="To Account Number"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
        required
      />
      <button type="submit">Transfer</button>
    </form>
  );
};

export default Transfer;
