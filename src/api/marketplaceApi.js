import { apiRequest } from "./api";


const queryString = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      searchParams.append(key, value);
    }
  });

  const value = searchParams.toString();

  return value ? `?${value}` : "";
};


export const marketplaceApi = {
  // ==========================================================
  // FRONT DOOR
  // ==========================================================

  home: () => {
    return apiRequest("/marketplace/");
  },


  // ==========================================================
  // GLOBAL SEARCH
  // ==========================================================

  search: (query) => {
    return apiRequest(
      `/marketplace/search/${queryString({ q: query })}`
    );
  },


  // ==========================================================
  // CATEGORIES
  // ==========================================================

  categories: () => {
    return apiRequest("/marketplace/categories/");
  },


  // ==========================================================
  // LISTINGS
  // ==========================================================

  listings: (params = {}) => {
    return apiRequest(
      `/marketplace/listings/${queryString(params)}`
    );
  },

  listingDetail: (slug) => {
    return apiRequest(
      `/marketplace/listings/${slug}/`
    );
  },

  createListing: (data) => {
    return apiRequest("/marketplace/listings/create/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },


  // ==========================================================
  // NEEDS
  // ==========================================================

  needs: (params = {}) => {
    return apiRequest(
      `/marketplace/needs/${queryString(params)}`
    );
  },

  createNeed: (data) => {
    return apiRequest("/marketplace/needs/create/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },


  // ==========================================================
  // VALUE OFFERS
  // ==========================================================

  offers: (params = {}) => {
    return apiRequest(
      `/marketplace/offers/${queryString(params)}`
    );
  },

  createOffer: (data) => {
    return apiRequest("/marketplace/offers/create/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },


  // ==========================================================
  // CONNECTIONS
  // ==========================================================

  connect: (data) => {
    return apiRequest("/marketplace/connections/create/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },


  // ==========================================================
  // MESSAGES
  // ==========================================================

  messages: () => {
    return apiRequest("/marketplace/messages/");
  },

  sendMessage: (data) => {
    return apiRequest("/marketplace/messages/send/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },


  // ==========================================================
  // REPORT
  // ==========================================================

  reportListing: (listingId, reason) => {
    return apiRequest(
      `/marketplace/listings/${listingId}/report/`,
      {
        method: "POST",
        body: JSON.stringify({
          reason,
        }),
      }
    );
  },


  // ==========================================================
  // MY IGATI
  // ==========================================================

  dashboard: () => {
    return apiRequest("/my-igati/");
  },
};