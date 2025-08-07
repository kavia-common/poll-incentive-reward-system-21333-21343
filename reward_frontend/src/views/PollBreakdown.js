import React, { useEffect, useState } from "react";
import RewardAPI from "../utils/RewardAPI";

/**
 * PUBLIC_INTERFACE
 * Displays table of poll submissions, accuracy, and reward information.
 */
export default function PollBreakdown() {
  const [list, setList] = useState([]);

  useEffect(() => {
    RewardAPI.fetchUserPollBreakdown().then((lst) => setList(lst));
  }, []);

  return (
    <div className="poll-break-container" style={{padding:"1.8vw", maxWidth:980, margin:"auto"}}>
      <h2>Poll-wise Breakdown</h2>
      <div className="card" style={{overflowX:"auto"}}>
        <table className="poll-table">
          <thead>
            <tr>
              <th>Poll</th>
              <th>Your Prediction</th>
              <th>Outcome</th>
              <th>Accuracy</th>
              <th>Tokens Awarded</th>
              <th>Rank</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {list.map((row, idx) => (
              <tr key={idx}>
                <td>{row.pollName}</td>
                <td>{row.prediction}</td>
                <td>{row.outcome}</td>
                <td>{row.accuracy + "%"}</td>
                <td>{row.tokens}</td>
                <td>{row.rank}</td>
                <td>{row.date}</td>
              </tr>
            ))}
            {list.length === 0 &&
              <tr><td colSpan={7} style={{textAlign:"center",color:"#888"}}>No poll data yet.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
