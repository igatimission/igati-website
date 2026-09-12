import { apiRequest } from "./api";

export const organisationApi = {
  getAll: (params = "") =>
    apiRequest(
      `/organisations/${params}`
    ),

  getDetail: (slug) =>
    apiRequest(
      `/organisations/${slug}/`
    ),

  create: (data) =>
    apiRequest(
      "/organisations/create/",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ),

  getMine: () =>
    apiRequest(
      "/organisations/mine/"
    ),

  submit: (slug) =>
    apiRequest(
      `/organisations/${slug}/submit/`,
      {
        method: "POST",
      }
    ),

  join: (slug, data = {}) =>
    apiRequest(
      `/organisations/${slug}/join/`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ),

  getMembers: (slug) =>
    apiRequest(
      `/organisations/${slug}/members/`
    ),

  getPendingMembers: (slug) =>
    apiRequest(
      `/organisations/${slug}/members/pending/`
    ),

  approveMember: (
    slug,
    membershipId,
    data = {}
  ) =>
    apiRequest(
      `/organisations/${slug}/members/${membershipId}/approve/`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ),

  rejectMember: (
    slug,
    membershipId,
    data = {}
  ) =>
    apiRequest(
      `/organisations/${slug}/members/${membershipId}/reject/`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ),

  createPost: (slug, data) =>
    apiRequest(
      `/organisations/${slug}/posts/create/`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ),
};