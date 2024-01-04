'use client';

import React, { useState } from 'react';

import { withdraw } from '../services/bankService';

const Withdraw = () => {
  const [accountNumber, setAccountNumber] = useState(0);
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await withdraw(accountNumber, amount);
      console.log('Withdrawal successful', response.data);
    } catch (error) {
      console.error('Error during withdrawal', error);
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
      <button type="submit">Withdraw</button>
    </form>
  );
};

export default Withdraw;
