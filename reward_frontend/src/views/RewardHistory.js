import React, { useEffect, useState } from "react";
import RewardAPI from "../utils/RewardAPI";

/**
 * PUBLIC_INTERFACE
 * Table showing all reward and redemption transactions.
 */
export default function RewardHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    RewardAPI.fetchUserRewardHistory().then(setHistory);
  }, []);

  return (
    <div style={{padding:"2vw", maxWidth:970, margin:"auto"}}>
      <h2>Your Reward History</h2>
      <div className="card" style={{overflowX:"auto"}}>
        <table className="reward-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Details</th>
              <th>Tokens Change</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((row, idx) => (
              <tr key={idx}>
                <td>{row.date}</td>
                <td>{row.type}</td>
                <td>{row.details}</td>
                <td>{row.tokens > 0 ? "+" : ""}{row.tokens}</td>
                <td>{row.status}</td>
              </tr>
            ))}
            {history.length === 0 &&
              <tr><td colSpan={5} style={{textAlign:"center",color:"#888"}}>No history yet.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
