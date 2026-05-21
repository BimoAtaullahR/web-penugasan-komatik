const resolveBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return "http://localhost:4000";
};

const apiFetch = async (path, options = {}) => {
  const response = await fetch(`${resolveBaseUrl()}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await response.json();
  if (!response.ok) {
    const message = data?.message || "Request failed";
    const err = new Error(message);
    err.status = response.status;
    err.errors = data?.errors;
    throw err;
  }
  return data;
};

const getJerseys = async ({ limit = 12, offset = 0, search, league, kitType, issueType, brand } = {}) => {
  const params = new URLSearchParams({ 
    limit: String(limit), 
    offset: String(offset) 
  });

  if (search) params.append("search", search);
  if (league) params.append("league", league);
  if (kitType) params.append("kitType", kitType);
  if (issueType) params.append("issueType", issueType);
  if (brand) params.append("brand", brand);

  return apiFetch(`/api/v1/jerseys?${params.toString()}`);
};

const getJersey = async (id) => apiFetch(`/api/v1/jerseys/${id}`);

// --- Admin auth ---
const login = async (username, password) =>
  apiFetch("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

const logout = async () =>
  apiFetch("/api/v1/auth/logout", { method: "POST" });

const getMe = async () => apiFetch("/api/v1/auth/me");

// --- Admin CRUD ---
const createJersey = async (data) =>
  apiFetch("/api/v1/jerseys", {
    method: "POST",
    body: JSON.stringify(data),
  });

const updateJersey = async (id, data) =>
  apiFetch(`/api/v1/jerseys/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

const deleteJersey = async (id) =>
  apiFetch(`/api/v1/jerseys/${id}`, {
    method: "DELETE",
  });

module.exports = {
  getJerseys,
  getJersey,
  login,
  logout,
  getMe,
  createJersey,
  updateJersey,
  deleteJersey,
};
