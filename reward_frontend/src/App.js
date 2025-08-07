import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import "./components/Sidebar.css";
import "./components/Topbar.css";

import { AuthProvider, AuthContext } from "./components/AuthContext";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Login from "./components/Login";

// Views
import UserDashboard from "./views/UserDashboard";
import PollBreakdown from "./views/PollBreakdown";
import RewardHistory from "./views/RewardHistory";
import RedeemRewards from "./views/RedeemRewards";
import AdminDashboard from "./views/AdminDashboard";
import AdminManagePolls from "./views/AdminManagePolls";
import AdminRedemptions from "./views/AdminRedemptions";
import AdminReports from "./views/AdminReports";

/**
 * PUBLIC_INTERFACE
 * Main App structure, role-aware, handles auth/screens/layout.
 */
function MainApp() {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const [screen, setScreen] = useState("dashboard");
  const [theme, setTheme] = useState("light");
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  useEffect(() => {
    // Reset nav when switching roles
    setScreen(isAdmin ? "admin" : "dashboard");
  }, [isAdmin]);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="App" style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        active={screen}
        onNavigate={setScreen}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <Topbar />
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          style={{ position: "absolute", top: 15, right: 22 }}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <main style={{ marginTop: 25 }}>
          {!isAdmin && (
            <>
              {screen === "dashboard" && <UserDashboard />}
              {screen === "polls" && <PollBreakdown />}
              {screen === "history" && <RewardHistory />}
              {screen === "redeem" && <RedeemRewards />}
            </>
          )}
          {isAdmin && (
            <>
              {screen === "admin" && <AdminDashboard />}
              {screen === "manage-polls" && <AdminManagePolls />}
              {screen === "redemptions" && <AdminRedemptions />}
              {screen === "reports" && <AdminReports />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * App entrypoint – wraps everything in AuthProvider context.
 */
function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
