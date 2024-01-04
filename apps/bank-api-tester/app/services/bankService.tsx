import axios from 'axios';

const API_URL = 'https://phabservice-129311a14694.herokuapp.com/account';

const createAccount = (name: string) =>
  axios.post(`${API_URL}/createaccount`, { name });
const deposit = (accountNumber: number, amount: number) =>
  axios.post(`${API_URL}/deposit`, { accountNumber, amount });
const withdraw = (accountNumber: number, amount: number) =>
  axios.post(`${API_URL}/withdraw`, { accountNumber, amount });
const transfer = (fromAccount: number, toAccount: number, amount: number) =>
  axios.post(`${API_URL}/transfer`, { fromAccount, toAccount, amount });
const getBalance = () => axios.get(`${API_URL}/balance`);
const getAccountDetails = (accountNumber: number) =>
  axios.get(`${API_URL}/balance/${accountNumber}`);

export {
  createAccount,
  deposit,
  withdraw,
  transfer,
  getBalance,
  getAccountDetails,
};
