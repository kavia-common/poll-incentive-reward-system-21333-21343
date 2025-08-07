import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./Login.css";

/**
 * PUBLIC_INTERFACE
 * Login screen simulating SSO; enters email, distinguishes admin/user by email domain.
 */
export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Valid email required");
      return;
    }
    login({ email });
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h2>Reward System Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email (user@site.com or admin@admin.com)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
            required
          />
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" className="login-btn">Sign in with SSO</button>
        </form>
        <div className="login-help">
          <small>Use <b>user@example.com</b> or <b>admin@admin.com</b> to demo roles.<br/>
          "@admin.com" emails enter admin mode.</small>
        </div>
      </div>
    </div>
  );
}
