const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${path}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API fetch failed: ${response.statusText}`);
  }
  return response.json();
}
