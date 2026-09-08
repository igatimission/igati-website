import {
  apiRequest,
  clearTokens,
  saveUser,
  setTokens,
} from "./api";


export const authApi = {
  // ==========================================================
  // REGISTER
  // ==========================================================

  register: async (data) => {
    const response = await apiRequest("/auth/register/", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.tokens) {
      setTokens(
        response.tokens.access,
        response.tokens.refresh
      );
    }

    if (response.user) {
      saveUser(response.user);
    }

    return response;
  },


  // ==========================================================
  // LOGIN
  // ==========================================================

  login: async (identifier, password) => {
    const response = await apiRequest("/auth/login/", {
      method: "POST",
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    if (response.tokens) {
      setTokens(
        response.tokens.access,
        response.tokens.refresh
      );
    }

    if (response.user) {
      saveUser(response.user);
    }

    return response;
  },


  // ==========================================================
  // CURRENT USER
  // ==========================================================

  me: async () => {
    const response = await apiRequest("/auth/me/");

    if (response.user) {
      saveUser(response.user);
    }

    return response;
  },


  // ==========================================================
  // LOGOUT
  // ==========================================================

  logout: () => {
    clearTokens();
  },
};