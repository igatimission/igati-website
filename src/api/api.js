const API_URL =
  import.meta.env.VITE_API_URL || "http://192.168.100.12:8000/api";


// ============================================================
// TOKEN MANAGEMENT
// ============================================================

export const getAccessToken = () => {
  return localStorage.getItem("igati_access_token");
};

export const getRefreshToken = () => {
  return localStorage.getItem("igati_refresh_token");
};

export const setTokens = (access, refresh) => {
  if (access) {
    localStorage.setItem("igati_access_token", access);
  }

  if (refresh) {
    localStorage.setItem("igati_refresh_token", refresh);
  }
};

export const clearTokens = () => {
  localStorage.removeItem("igati_access_token");
  localStorage.removeItem("igati_refresh_token");
  localStorage.removeItem("igati_user");
};


// ============================================================
// USER STORAGE
// ============================================================

export const saveUser = (user) => {
  localStorage.setItem("igati_user", JSON.stringify(user));
};

export const getStoredUser = () => {
  try {
    const user = localStorage.getItem("igati_user");

    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};


// ============================================================
// REFRESH TOKEN
// ============================================================

const refreshAccessToken = async () => {
  const refresh = getRefreshToken();

  if (!refresh) {
    throw new Error("No refresh token available.");
  }

  const response = await fetch(`${API_URL}/auth/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh,
    }),
  });

  if (!response.ok) {
    clearTokens();
    throw new Error("Session expired.");
  }

  const data = await response.json();

  setTokens(data.access, refresh);

  return data.access;
};


// ============================================================
// MAIN REQUEST FUNCTION
// ============================================================

export const apiRequest = async (
  endpoint,
  options = {},
  retry = true
) => {
  const token = getAccessToken();

  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),

    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Please check your internet connection."
    );
  }

  // Try refreshing expired JWT
  if (response.status === 401 && retry && getRefreshToken()) {
    try {
      const newAccess = await refreshAccessToken();

      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${newAccess}`,
      };

      response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: retryHeaders,
      });
    } catch {
      clearTokens();
      throw new Error("Your session has expired. Please sign in again.");
    }
  }

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        data.detail ||
        "Something went wrong. Please try again."
    );
  }

  return data;
};


export { API_URL };