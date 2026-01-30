import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(authService.getStoredUser());
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthed: !!user,
    async login(payload) {
      const u = await authService.login(payload);
      setUser(u);
      return u;
    },
    async signup(payload) {
      const u = await authService.signup(payload);
      setUser(u);
      return u;
    },
    async logout() {
      await authService.logout();
      setUser(null);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
