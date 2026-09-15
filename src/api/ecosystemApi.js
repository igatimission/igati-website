const API_URL =
  import.meta.env.API_URL || "https://igati-backend.onrender.com/api";


const request = async (endpoint) => {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    let message = "Something went wrong.";

    try {
      const data = await response.json();
      message = data?.message || data?.detail || message;
    } catch {
      // Ignore invalid JSON response
    }

    throw new Error(message);
  }

  return response.json();
};


export const ecosystemApi = {
  overview: () => request("/ecosystem/"),

  themes: () => request("/ecosystem/themes/"),

  locations: (params = "") =>
    request(`/ecosystem/locations/${params}`),

  communities: (params = "") =>
    request(`/ecosystem/communities/${params}`),

  organisations: (params = "") =>
    request(`/ecosystem/organisations/${params}`),

  people: (params = "") =>
    request(`/ecosystem/people/${params}`),

  livingLaboratories: (params = "") =>
    request(`/ecosystem/living-laboratories/${params}`),

  programmes: (params = "") =>
    request(`/ecosystem/programmes/${params}`),

  projects: (params = "") =>
    request(`/ecosystem/projects/${params}`),

  projectDetail: (slug) =>
    request(`/ecosystem/projects/${slug}/`),

  research: (params = "") =>
    request(`/ecosystem/research/${params}`),

  innovations: (params = "") =>
    request(`/ecosystem/innovations/${params}`),

  knowledge: (params = "") =>
    request(`/ecosystem/knowledge/${params}`),

  markets: (params = "") =>
    request(`/ecosystem/markets/${params}`),

  opportunities: (params = "") =>
    request(`/ecosystem/opportunities/${params}`),

  impact: (params = "") =>
    request(`/ecosystem/impact/${params}`),
};


export default API_URL;