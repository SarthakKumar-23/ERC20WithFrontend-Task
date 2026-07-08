import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contract"; 

function Mint({account}) {
    const [isOwner, setIsOwner] = useState(false);
    const [amount, setAmount] = useState("");
    const [txHash, setTxHash] = useState("");

    useEffect(() => {
        if (account) {
            checkOwner();
        }
    },   [account]);

    async function checkOwner() {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);

            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                provider
            );

            const owner = await contract.owner();

            console.log("Contract Owner: ", owner);
            console.log("Connected Account: ", account);

            if (owner.toLowerCase() === account.toLowerCase()) {
                console.log("User is Owner");
                setIsOwner(true);
            } else {
                console.log("User is Not Owner");
                setIsOwner(false);
            }
        } catch (err) {
            console.error(err);
        }
    }
    const [status, setStatus] = useState("");

    async function mintTokens() {

        try {

            setStatus("Waiting for wallet approval...");

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                signer
            );

            const tx = await contract.mint(account, ethers.parseUnits(amount, 18));

            setTxHash(tx.hash);

            setStatus("Transaction Pending...");

            await tx.wait();

            window.location.reload();
            setStatus("Mint Successful !");

            setAmount("");

        } catch(err) {
            setStatus("Mint Failed");
            console.error(err);
        }
    }

    return (
        <>
          {isOwner && (
            <div className="section">
                <h2>Mint Tokens</h2>

                <input
                  className="form-control"
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <button className="btn btn-success" onClick={mintTokens}>Mint</button>

                <p className="mt-3">{status}</p>

                {
                txHash && (
                    <a className="tx-link" href={`https://sepolia.etherscan.io/tx/${txHash}`}
                        target="_blank"
                        rel="noreferrer">
                        
                        View Transaction
                    </a>
                )
            }
            </div>
          )}
        </>
    );
}

export default Mint;