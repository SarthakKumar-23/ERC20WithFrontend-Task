import { useState } from "react";
import { ethers } from "ethers";

function Wallet({setAccount}) {
    const [connectedAccount, setConnectedAccount] = useState("");

    async function connectWallet() {
        if (!window.ethereum) {
            alert("Please install MetaMask");
            return;
        }

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        const provider = new ethers.BrowserProvider(window.ethereum);

        const network = await provider.getNetwork();
        if(network.chainId !== 11155111n) {
            alert("please switch to sepolia");

            return;
        }

        setConnectedAccount(accounts[0]);
        setAccount(accounts[0]);
    }

    return (
        <div className="section">
            <button className="btn btn-primary" onClick={connectWallet}>
                Connect Wallet
            </button>
            {connectedAccount && (
                <p className="address">
                    <strong>Connected:</strong><br />
                    {`${connectedAccount.slice(0,6)}...${connectedAccount.slice(-4)}`}
                </p>
            )}
        </div>
    );
}

export default Wallet;