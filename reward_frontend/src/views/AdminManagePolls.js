import React, { useEffect, useState } from "react";
import RewardAPI from "../utils/RewardAPI";

/**
 * PUBLIC_INTERFACE
 * Admin view to ingest/edit poll results and weightages.
 */
export default function AdminManagePolls() {
  const [polls, setPolls] = useState([]);
  const [form, setForm] = useState({ name: "", result: "", weight: "" });
  const [msg, setMsg] = useState(null);

  useEffect(() => { RewardAPI.fetchAdminPolls().then(setPolls); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    RewardAPI.adminAddEditPoll(form).then((newPoll) => {
      setPolls(prev => [...prev, newPoll]);
      setForm({ name: "", result: "", weight: "" });
      setMsg("Poll added/updated!");
      setTimeout(() => setMsg(null), 1600);
    });
  };

  return (
    <div style={{padding:"2vw",maxWidth:980,margin:"auto"}}>
      <h2>Manage Poll Results</h2>
      <form className="card" style={{marginBottom:18,maxWidth:520}} onSubmit={handleSubmit}>
        <input name="name" placeholder="Poll name" value={form.name} onChange={handleChange} required />
        <input name="result" placeholder="Result" value={form.result} onChange={handleChange} required />
        <input name="weight" type="number" placeholder="Weightage" value={form.weight} onChange={handleChange} required min={1} />
        <button type="submit" className="login-btn" style={{marginTop:8}}>Add/Edit</button>
        {msg && <span style={{marginLeft:10, color:'green'}}>{msg}</span>}
      </form>
      <div className="card" style={{overflowX:"auto"}}>
        <table>
          <thead>
            <tr>
              <th>Poll</th>
              <th>Result</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {(polls || []).map((row, idx) => (
              <tr key={idx}>
                <td>{row.name}</td>
                <td>{row.result}</td>
                <td>{row.weight}</td>
              </tr>
            ))}
            {polls && polls.length === 0 &&
              <tr><td colSpan={3}>No polls.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
