import { useState, useEffect } from "react";
import { authStore } from "../store/authStore";

export function useAuth() {
  const [state, setState] = useState(authStore.getState());

  useEffect(() => authStore.subscribe(() => setState({ ...authStore.getState() })), []);

  return {
    user: state.user,
    loading: state.loading,
    isLoggedIn: authStore.isLoggedIn(),
    isAdmin: authStore.isAdmin(),
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
  };
}
