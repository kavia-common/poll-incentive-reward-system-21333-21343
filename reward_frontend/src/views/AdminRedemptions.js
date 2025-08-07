import React, { useEffect, useState } from "react";
import RewardAPI from "../utils/RewardAPI";

/**
 * PUBLIC_INTERFACE
 * Admin can view and manage reward redemptions (retry/cancel/status).
 */
export default function AdminRedemptions() {
  const [list, setList] = useState([]);

  useEffect(() => { RewardAPI.fetchAdminRedemptions().then(setList); }, []);

  const handleStatus = (id, action) => {
    RewardAPI.adminUpdateRedemption(id, action).then((updated) => {
      setList(list =>
        list.map(r => r.id === updated.id ? updated : r)
      );
    });
  };

  return (
    <div style={{padding:"2vw",maxWidth:950,margin:"auto"}}>
      <h2>Reward Redemptions</h2>
      <div className="card" style={{overflowX:"auto"}}>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>User</th><th>Tokens</th><th>Date</th><th>Status</th>
              <th>Logs</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(list||[]).map((r, idx) => (
              <tr key={idx}>
                <td>{r.id}</td>
                <td>{r.user}</td>
                <td>{r.tokens}</td>
                <td>{r.date}</td>
                <td>{r.status}</td>
                <td><small>{r.logs}</small></td>
                <td>
                  <button onClick={() => handleStatus(r.id, "retry")} disabled={r.status==="success"}>Retry</button>
                  <button onClick={() => handleStatus(r.id, "cancel")} disabled={r.status!=="pending"}>Cancel</button>
                </td>
              </tr>
            ))}
            {list.length === 0 &&
              <tr><td colSpan={7}>No redemptions.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
