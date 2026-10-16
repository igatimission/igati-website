
import { apiRequest } from "./api";

export const apicultureApi = {

    getWards() {
    return apiRequest("/apiculture/wards/");
  },
  
  submitApplication: (data) =>
    apiRequest("/apiculture/applications/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getPublicStats: () =>
    apiRequest("/apiculture/public/stats/"),

  getApplications: (status = "pending") =>
    apiRequest(
      `/apiculture/admin/applications/?status=${encodeURIComponent(status)}`
    ),

  reviewApplication: (id, status, review_notes = "") =>
    apiRequest(`/apiculture/admin/applications/${id}/review/`, {
      method: "PATCH",
      body: JSON.stringify({ status, review_notes }),
    }),
};
