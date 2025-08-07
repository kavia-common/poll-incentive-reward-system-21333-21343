import React, { useState, useEffect } from "react";
import RewardAPI from "../utils/RewardAPI";

/**
 * PUBLIC_INTERFACE
 * Admin dashboard view - shows system summary, pending actions, quick stats.
 */
export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    RewardAPI.fetchAdminDashboard().then(setData);
  }, []);

  if (!data) return <div style={{margin:32}}>Loading admin dashboard...</div>;

  return (
    <div style={{padding:"2vw", maxWidth:980, margin:"auto"}}>
      <div className="dash-row">
        <div className="card stat-card">
          <h3>Active Polls</h3>
          <div className="stat-med">{data.activePolls}</div>
        </div>
        <div className="card stat-card">
          <h3>Redemption Requests</h3>
          <div className="stat-med">{data.pendingRedemptions}</div>
        </div>
        <div className="card stat-card accent">
          <h3>Total Users</h3>
          <div className="stat-big">{data.totalUsers}</div>
        </div>
        <div className="card stat-card">
          <h3>Total Rewards</h3>
          <div className="stat-big">{data.issuedRewards}</div>
        </div>
      </div>
      <div style={{margin:"2.7em 0 0.7em"}}><b>System Analytics (coming soon...)</b></div>
      <div className="card" style={{minHeight:150, textAlign:'center', color:"#888"}}>
        Graphical analytics/reports coming soon.
      </div>
    </div>
  );
}
