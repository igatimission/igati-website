import { apiRequest } from "./api";

export const marketplaceShoppingApi = {
  product: (slug) => apiRequest(`/marketplace/products/${encodeURIComponent(slug)}/`),
  checkout: (data) => apiRequest("/marketplace/checkout/", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};