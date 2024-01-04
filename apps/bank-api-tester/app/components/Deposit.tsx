'use client';

import React, { useState } from 'react';

import { deposit } from '../services/bankService';

const Deposit = () => {
  const [accountNumber, setAccountNumber] = useState(0);
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await deposit(accountNumber, amount);
      console.log('Deposit successful', response.data);
    } catch (error) {
      console.error('Error during deposit', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(Number(e.target.value))}
        placeholder="Account Number"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
        required
      />
      <button type="submit">Deposit</button>
    </form>
  );
};

export default Deposit;
