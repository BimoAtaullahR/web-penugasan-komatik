const resolveBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return "http://localhost:4000";
};

const apiFetch = async (path) => {
  const response = await fetch(`${resolveBaseUrl()}${path}`);
  const data = await response.json();
  if (!response.ok) {
    const message = data?.message || "Request failed";
    throw new Error(message);
  }
  return data;
};

const getJerseys = async ({ limit = 12, offset = 0 } = {}) => {
  const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
  return apiFetch(`/api/v1/jerseys?${params.toString()}`);
};

const getJersey = async (id) => apiFetch(`/api/v1/jerseys/${id}`);

module.exports = {
  getJerseys,
  getJersey
};
