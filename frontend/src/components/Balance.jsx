import {useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contract";

function Balance({account}) {
    const [balance, setBalance] = useState("0");

    useEffect(() => {
        if (account) {
            getBalance();
        }
    },   [account]);

    async function getBalance() {
        try {
            const provider = new 
            ethers.BrowserProvider(window.ethereum);

            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                provider
            );

            const bal = await contract.balanceOf(account);

            console.log("Raw Balance: ", bal.toString());

            setBalance(ethers.formatUnits(bal, 18));
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="section">
            <h3>Balance</h3>
            <p className="balance">{balance} TSK</p>
        </div>
    );
}

export default Balance