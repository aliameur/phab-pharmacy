'use client';

import React, { useEffect, useState } from 'react';

import { Deposit, Transfer } from './components';
import { createAccount, getBalance } from './services/bankService';

interface Account {
  id: number;
  name: string;
  balance: number;
}

export default function Index() {
  const [balances, setBalances] = useState([]);
  const accountsToCreate = ['Test-Customer', 'PhabPharmacy'];

  const fetchBalances = async () => {
    try {
      const response = await getBalance();
      setBalances(response.data);
    } catch (error) {
      console.error('Error fetching balances', error);
    }
  };

  const createAccountsIfNeeded = async () => {
    try {
      const existingAccounts = (await getBalance()).data;
      const existingAccountNames = existingAccounts.map(
        (account: Account) => account.name,
      );

      for (const accountName of accountsToCreate) {
        if (!existingAccountNames.includes(accountName)) {
          await createAccount(accountName);
        }
      }

      fetchBalances();
    } catch (error) {
      console.error('Error in account creation or balance fetching', error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await createAccountsIfNeeded();
    };

    initialize();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Bank Accounts</h1>
      {balances.map((account: Account) => (
        <div key={account.id}>
          <p>
            {account.name}: ${account.balance}
          </p>
        </div>
      ))}

      <h2>Deposit Money</h2>
      <Deposit />

      <h2>Transfer Money</h2>
      <Transfer />
    </div>
  );
}
