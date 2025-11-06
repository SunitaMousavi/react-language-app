import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// This file only exports the hook, no components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// This is a convenient shortcut that lets any component easily access the authentication data.
