import { apiRequest } from "./api";

const base = (slug) =>
  `/organisations/${encodeURIComponent(slug)}/marketplace`;

export const organisationMarketplaceApi = {
  dashboard: (slug) =>
    apiRequest(`${base(slug)}/dashboard/`),

  products: (slug) =>
    apiRequest(`${base(slug)}/products/`),

  orders: (slug) =>
    apiRequest(`${base(slug)}/orders/`),

  orderDetail: (slug, orderId) =>
    apiRequest(`${base(slug)}/orders/${orderId}/`),

  payments: (slug) =>
    apiRequest(`${base(slug)}/payments/`),

  inventory: (slug) =>
    apiRequest(`${base(slug)}/inventory/`),



  uploadProductImage: async (slug, file) => {
    
    const baseUrl =  import.meta.env.VITE_API_URL || "https://igati-backend.onrender.com/api";
    // VITE_API_URL should point to the same API root as apiRequest (usually /api).
    const formData = new FormData();
    formData.append("image", file);
    const token = localStorage.getItem("igati_access_token");
    const response = await fetch(
      `${baseUrl}${base(slug)}/products/upload-image/`,
      {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      }
    );
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Image upload failed.");
    return data;
  },
  dashboard: (slug) => apiRequest(`${base(slug)}/dashboard/`),
  categories: (slug) => apiRequest(`${base(slug)}/categories/`),
  products: (slug, params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== "" && value !== undefined && value !== null) query.set(key, value);
    });
    const suffix = query.toString();
    return apiRequest(`${base(slug)}/products/${suffix ? `?${suffix}` : ""}`);
  },
  product: (slug, id) => apiRequest(`${base(slug)}/products/${id}/`),
  createProduct: (slug, data) => apiRequest(`${base(slug)}/products/`, { method: "POST", body: JSON.stringify(data) }),
  updateProduct: (slug, id, data) => apiRequest(`${base(slug)}/products/${id}/`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteProduct: (slug, id) => apiRequest(`${base(slug)}/products/${id}/`, { method: "DELETE" }),
  setProductStatus: (slug, id, status) => apiRequest(`${base(slug)}/products/${id}/status/`, { method: "POST", body: JSON.stringify({ status }) }),




};