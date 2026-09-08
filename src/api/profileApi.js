import { apiRequest } from "./api";


export const profileApi = {
  getPeople: (params = {}) => {
    const searchParams = new URLSearchParams(params);

    const query = searchParams.toString();

    return apiRequest(
      `/profiles/${query ? `?${query}` : ""}`
    );
  },

  getProfile: (slug) => {
    return apiRequest(`/profiles/${slug}/`);
  },

  myProfile: () => {
    return apiRequest("/profiles/me/");
  },

  updateProfile: (data) => {
    return apiRequest("/profiles/me/update/", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};