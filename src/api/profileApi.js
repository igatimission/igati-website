import { apiRequest } from "./api";

export const profileApi = {
  myProfile: () =>
    apiRequest("/people/me/"),

  updateProfile: (data) =>
    apiRequest("/people/me/update/", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  getPeople: (params = "") =>
    apiRequest(`/people/${params}`),

  getProfile: (slug) =>
    apiRequest(`/people/${slug}/`),
};