import {
  //CreateAccount,
  Deposit,
  Transfer,
  ViewBalance,
  Withdraw,
} from './components';

export default async function Index() {
  return (
    <div>
      <h1>Welcome to the Banking App</h1>
      <ViewBalance />

      <div>
        <section>
          <h2>Deposit</h2>
          <Deposit />
        </section>

        <section>
          <h2>Withdraw</h2>
          <Withdraw />
        </section>

        <section>
          <h2>Transfer</h2>
          <Transfer />
        </section>
      </div>
    </div>
  );
}
