import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./Topbar.css";

/**
 * PUBLIC_INTERFACE
 * Topbar for displaying profile, login/logout, and quick actions.
 */
export default function Topbar({ onRoleSwitch }) {
  const { user, logout, switchRole } = useContext(AuthContext);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-title">Reward System</span>
      </div>
      <div className="topbar-right">
        {user &&
          <>
            <span className="user-badge">{user.name}</span>
            <span className="role-badge" onClick={switchRole} tabIndex={0}>
              {user.role === "admin" ? "Admin" : "User"}
              <span title="Switch role" className="role-switch">&#8646;</span>
            </span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        }
      </div>
    </header>
  );
}
