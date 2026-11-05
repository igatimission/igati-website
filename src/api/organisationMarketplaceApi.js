
import { apiRequest } from "./api";

const base = (slug) =>
  `/organisations/${encodeURIComponent(slug)}/marketplace`;

const queryString = (params = {}) => {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });

  const text = search.toString();
  return text ? `?${text}` : "";
};

export const organisationMarketplaceApi = {
  // ============================
  // DASHBOARD
  // ============================

  dashboard: (slug) =>
    apiRequest(`${base(slug)}/dashboard/`),

  // ============================
  // CATEGORIES
  // ============================

  categories: (slug) =>
    apiRequest(`${base(slug)}/categories/`),

  // ============================
  // PRODUCTS
  // ============================

  products: (slug, filters = {}) =>
    apiRequest(
      `${base(slug)}/products/${queryString(filters)}`
    ),

  product: (slug, id) =>
    apiRequest(`${base(slug)}/products/${id}/`),

  createProduct: (slug, data) =>
    apiRequest(`${base(slug)}/products/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateProduct: (slug, id, data) =>
    apiRequest(`${base(slug)}/products/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteProduct: (slug, id) =>
    apiRequest(`${base(slug)}/products/${id}/`, {
      method: "DELETE",
    }),

  setProductStatus: (slug, id, status) =>
    apiRequest(`${base(slug)}/products/${id}/status/`, {
      method: "POST",
      body: JSON.stringify({ status }),
    }),

  // ============================
  // PRODUCT IMAGE UPLOAD
  // ============================

  uploadProductImage: async (slug, file) => {
    const baseUrl = (
      import.meta.env.VITE_API_URL ||
      "https://igati-backend.onrender.com/api"
    ).replace(/\/+$/, "");

    const token = localStorage.getItem("igati_access_token");

    if (!token) {
      throw new Error("Please sign in to upload an image.");
    }

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `${baseUrl}${base(slug)}/products/upload-image/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.message ||
        data.detail ||
        data.error ||
        `Image upload failed (${response.status})`
      );
    }

    return data;
  },

  // ============================
  // ORDERS
  // ============================

  orders: (slug, filters = {}) =>
    apiRequest(
      `${base(slug)}/orders/${queryString(filters)}`
    ),

  order: (slug, id) =>
    apiRequest(`${base(slug)}/orders/${id}/`),

  // Alias for existing components
  orderDetail: (slug, id) =>
    apiRequest(`${base(slug)}/orders/${id}/`),

  updateOrderStatus: (slug, id, status) =>
    apiRequest(`${base(slug)}/orders/${id}/status/`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  // ============================
  // PAYMENTS
  // ============================

  payments: (slug, filters = {}) =>
    apiRequest(
      `${base(slug)}/payments/${queryString(filters)}`
    ),

  // ============================
  // INVENTORY
  // ============================

    inventory: (slug, filters = {}) => apiRequest(`${base(slug)}/inventory/${queryString(filters)}`),

    inventoryMovements: (slug, filters = {}) => apiRequest(`${base(slug)}/inventory/movements/${queryString(filters)}`),

    adjustInventory: (slug, id, data) => apiRequest(`${base(slug)}/inventory/${id}/adjust/`, {
            method: "POST", body: JSON.stringify(data),
    }),

    // organixation marketplace customers
    customers: (slug, params = {}) =>
  apiRequest(
    `${base(slug)}/customers/${queryString(params)}`
  ),

customerDetail: (slug, customerKey) =>
  apiRequest(
    `${base(slug)}/customers/${encodeURIComponent(customerKey)}/`
  ),
};
