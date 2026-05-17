const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5050';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  getProfile: () => request('/api/profile'),
  updateProfile: profile => request('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(profile),
  }),
  sendSupportMessage: message => request('/api/support-messages', {
    method: 'POST',
    body: JSON.stringify(message),
  }),
};
