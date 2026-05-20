/// <reference types="vite/client" />
import axios from 'axios';

// Declare Clerk on Window so TS doesn't complain when accessing window.Clerk
// (Clerk injects itself into window globally inside the provider context).
declare global {
  interface Window {
    Clerk?: {
      session?: {
        getToken: () => Promise<string | null>;
      };
    };
  }
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configure interceptor to use Clerk's auth token
apiClient.interceptors.request.use(async (config) => {
  // When Clerk is loaded on window, try to fetch the active session token
  if (window.Clerk?.session) {
    try {
      const token = await window.Clerk.session.getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error('Clerk token retrieval failed', err);
    }
  } else {
    // Fallback or legacy (e.g., if Clerk isn't ready)
    const legacyToken = localStorage.getItem('token');
    if (legacyToken && config.headers) {
      config.headers.Authorization = `Bearer ${legacyToken}`;
    }
  }
  return config;
});
