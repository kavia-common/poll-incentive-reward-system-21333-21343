import React, { createContext, useEffect, useState } from "react";

/**
 * AuthContext provides authentication state and role (user/admin) throughout the app.
 * Handles SSO login simulation, role switching, and basic token management.
 */
// PUBLIC_INTERFACE
export const AuthContext = createContext();

/**
 * PUBLIC_INTERFACE
 * AuthProvider wraps app to share user/auth state.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, email, role: 'user'|'admin' }
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Auto-check localstorage/session (simulate SSO)
    const s = localStorage.getItem("reward_user");
    if (s) {
      const parsed = JSON.parse(s);
      setUser(parsed.user);
      setToken(parsed.token);
    }
  }, []);

  // PUBLIC_INTERFACE
  const login = (creds) => {
    // Simulate SSO (replace with real SSO in prod)
    let role = creds.email && creds.email.endsWith("@admin.com") ? "admin" : "user";
    let fakeUser = {
      name: creds.email.split("@")[0],
      email: creds.email,
      role
    };
    let fakeToken = "mock-token-" + Date.now();
    setUser(fakeUser);
    setToken(fakeToken);
    localStorage.setItem("reward_user", JSON.stringify({ user: fakeUser, token: fakeToken }));
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("reward_user");
  };

  // PUBLIC_INTERFACE
  const switchRole = () => {
    if (!user) return;
    const newRole = user.role === "admin" ? "user" : "admin";
    const newUser = { ...user, role: newRole };
    setUser(newUser);
    localStorage.setItem("reward_user", JSON.stringify({ user: newUser, token }));
  };

  return (
    <AuthContext.Provider value={{
      user, token, login, logout, switchRole,
      isAuthenticated: !!user, isAdmin: user?.role === "admin"
    }}>
      {children}
    </AuthContext.Provider>
  );
}
