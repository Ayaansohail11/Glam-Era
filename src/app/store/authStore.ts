import { api } from "../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

let state: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
};

let listeners: (() => void)[] = [];
const notify = () => listeners.forEach((l) => l());

// Init: restore user from token
if (state.token) {
  api.get("/auth/me").then((user) => {
    state.user = user;
    notify();
  }).catch(() => {
    localStorage.removeItem("token");
    state.token = null;
  });
}

export const authStore = {
  getState: () => state,
  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => { listeners = listeners.filter((l) => l !== listener); };
  },

  login: async (email: string, password: string) => {
    state = { ...state, loading: true };
    notify();
    try {
      const data = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      state = { user: data.user, token: data.token, loading: false };
      notify();
      return data;
    } catch (err) {
      state = { ...state, loading: false };
      notify();
      throw err;
    }
  },

  register: async (name: string, email: string, password: string) => {
    state = { ...state, loading: true };
    notify();
    try {
      const data = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("token", data.token);
      state = { user: data.user, token: data.token, loading: false };
      notify();
      return data;
    } catch (err) {
      state = { ...state, loading: false };
      notify();
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    state = { user: null, token: null, loading: false };
    notify();
  },

  isLoggedIn: () => !!state.token,
  isAdmin: () => state.user?.role === "admin",
};
