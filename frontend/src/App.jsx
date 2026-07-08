import Wallet from "./components/Wallet";
import { useState } from "react";
import Balance from "./components/Balance";
import Mint from "./components/Mint";
import Transfer from "./components/Transfer";
import "./App.css";

function App() {

  const [account, setAccount] = useState("");
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">
      <h1 className="app-title">ERC20 Decentralized App</h1>

      <Wallet setAccount={setAccount} />

      {account && (
        <>
         <Balance account={account} refresh={refresh} />

         <Mint account={account} setRefresh={setRefresh} />

         <Transfer account={account} setRefresh={setRefresh} />
        </>
      )}
    </div>

  </div>
  );
}

export default App;