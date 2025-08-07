import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./Sidebar.css";

/**
 * PUBLIC_INTERFACE
 * Sidebar for navigation, changes options based on user/admin role.
 */
export default function Sidebar({ onNavigate, active }) {
  const { user, isAdmin } = useContext(AuthContext);

  const userLinks = [
    { label: "Dashboard", nav: "dashboard" },
    { label: "Poll Breakdown", nav: "polls" },
    { label: "Reward History", nav: "history" },
    { label: "Redeem", nav: "redeem" },
  ];

  const adminLinks = [
    { label: "Admin Dashboard", nav: "admin" },
    { label: "Manage Poll Results", nav: "manage-polls" },
    { label: "Reward Redemptions", nav: "redemptions" },
    { label: "Reports", nav: "reports" },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <span className="brand">Poll Reward</span>
        <span className="badge">{isAdmin ? "Admin" : "User"}</span>
      </div>
      <ul>
        {(isAdmin ? adminLinks : userLinks).map(link =>
          <li key={link.nav}
              className={active === link.nav ? "active" : ""}
              onClick={() => onNavigate(link.nav)}
              tabIndex={0}>
            {link.label}
          </li>
        )}
      </ul>
    </nav>
  );
}
