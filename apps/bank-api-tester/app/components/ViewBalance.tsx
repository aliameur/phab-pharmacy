'use client';

import React, { useEffect, useState } from 'react';

import { getBalance } from '../services/bankService';

interface Account {
  id: number;
  name: string;
  balance: number;
}

const ViewBalance = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getBalance();
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts', error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      {accounts.map((account: Account) => (
        <div key={account.id}>
          <p>
            {account.name}: ${account.balance}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ViewBalance;
