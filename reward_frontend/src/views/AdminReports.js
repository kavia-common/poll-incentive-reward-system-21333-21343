import React, { useEffect, useState } from "react";
import RewardAPI from "../utils/RewardAPI";

/**
 * PUBLIC_INTERFACE
 * Admin view for basic reports (table placeholder).
 */
export default function AdminReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    RewardAPI.fetchAdminReports().then(setReports);
  }, []);

  return (
    <div style={{padding:"2vw",maxWidth:980,margin:"auto"}}>
      <h2>System Reports</h2>
      <div className="card" style={{overflowX:"auto"}}>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {(reports||[]).map((r, idx) => (
              <tr key={idx}>
                <td>{r.metric}</td>
                <td>{r.value}</td>
              </tr>
            ))}
            {reports && reports.length === 0 &&
              <tr><td colSpan={2}>No report data.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
