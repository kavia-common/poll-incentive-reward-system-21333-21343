import React, { useEffect, useState } from "react";
import RewardAPI from "../utils/RewardAPI";

/**
 * PUBLIC_INTERFACE
 * User Dashboard – summary of tokens, reward stats, quick redeem.
 */
export default function UserDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Load mock dashboard data
    RewardAPI.fetchUserDashboard().then(setData);
  }, []);

  if (!data) return <div style={{margin:32}}>Loading your dashboard...</div>;

  return (
    <div style={{ padding: "2vw", maxWidth: 950, margin: "auto" }}>
      <div className="dash-row">
        <div className="card stat-card">
          <h3>Total Tokens</h3>
          <div className="stat-big">{data.totalTokens}</div>
        </div>
        <div className="card stat-card">
          <h3>Polls Participated</h3>
          <div className="stat-med">{data.pollsParticipated}</div>
        </div>
        <div className="card stat-card">
          <h3>Redeemed</h3>
          <div className="stat-med">{data.tokensRedeemed}</div>
        </div>
        <div className="card stat-card accent">
          <h3>Available to Redeem</h3>
          <div className="stat-big">{data.availableForRedeem}</div>
        </div>
      </div>
      <div style={{margin:"2.3em 0 0.7em"}}><b>Reward Trends</b></div>
      <div className="card" style={{minHeight:180, textAlign:'center', color:"#888" }}>
        <div style={{marginTop:40}}>Coming soon: Chart visualization of poll accuracy and points over time.</div>
      </div>
    </div>
  );
}
