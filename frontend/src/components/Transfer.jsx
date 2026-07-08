import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contract";

function Transfer() {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");
    const [txHash, setTxHash] = useState("");

    async function transferTokens() {
        if (!ethers.isAddress(recipient)) {
            alert("Invalid Address");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                signer
            );

            setStatus("Waiting for Signature...");

            const tx = await contract.transfer(
                recipient,
                ethers.parseUnits(amount, 18)
            );

            setTxHash(tx.hash);

            setStatus("Transaction Pending...");

            await tx.wait();

            
            setStatus("Transaction Successful");
            window.location.reload();

            setRecipient("");
            setAmount("");
        } catch(err){
            console.error(err);
            setStatus("Transfer Failed");
        }
    }

    return (
        <div className="section">
            <h2>Transfer Tokens</h2>

            <input className="form-control" placeholder="Recipient Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} />

            <br/><br/>

            <input className="form-control" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

            <br/><br/>

            <button className="btn btn-warning" onClick={transferTokens}>Transfer</button>

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
    )
}

export default Transfer;