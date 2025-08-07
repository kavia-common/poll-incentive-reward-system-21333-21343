import React, { useEffect, useState } from "react";
import RewardAPI from "../utils/RewardAPI";

/**
 * PUBLIC_INTERFACE
 * Main redemption interface for users to redeem tokens for rewards.
 */
export default function RedeemRewards() {
  const [status, setStatus] = useState(null);
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setStatus(null);
    setSuccess(null);
    setAmount("");
  }, []); // reset on open

  // Simulate endpoint call and modal close
  const handleRedeem = (e) => {
    e.preventDefault();
    setStatus("Processing...");
    RewardAPI.redeemTokens(Number(amount))
      .then((res) => {
        setStatus(null);
        setSuccess(res);
      })
      .catch(() => {
        setStatus(null);
        setSuccess({ error: "Redemption error (try again)" });
      });
  };

  return (
    <div className="card" style={{margin:"2em auto",maxWidth:440,padding:"2.2em 2em"}}>
      <h2>Redeem Tokens</h2>
      {success && !success.error && (
        <div className="success-msg" style={{margin:'16px 0 23px', color:"green"}}>
          {success.message}
        </div>
      )}
      {success && success.error &&
        <div className="error-msg" style={{margin:'16px 0 13px', color:"red"}}>{success.error}</div>}
      {!success &&
        <form onSubmit={handleRedeem}>
          <input
            type="number"
            min={1}
            max={1000}
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
            placeholder="Amount to redeem (tokens)"
            style={{padding:'11px',marginBottom:14,borderRadius:5,border:'1px solid #bbb',width:'80%'}}
          />
          <button className="login-btn" type="submit" disabled={status === "Processing..."}>
            Redeem
          </button>
          {status && <span style={{marginLeft:8}}>{status}</span>}
        </form>
      }
    </div>
  );
}
