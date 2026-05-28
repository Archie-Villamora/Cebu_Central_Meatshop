export interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
}

export const COOKIE_PREFS_KEY = "ccm_cookie_preferences";
export const COOKIE_PREFS_EVENT = "ccm_cookie_preferences_updated";

export const DEFAULT_COOKIE_PREFS: CookiePreferences = {
  necessary: true,
  analytics: true,
  marketing: false
};

/**
 * Retrieves the user's cookie preferences from localStorage.
 * Falls back to default settings if none exist or parsing fails.
 */
export function getCookiePreferences(): CookiePreferences {
  if (typeof window === "undefined") return DEFAULT_COOKIE_PREFS;
  
  const saved = localStorage.getItem(COOKIE_PREFS_KEY);
  if (!saved) return DEFAULT_COOKIE_PREFS;
  
  try {
    const parsed = JSON.parse(saved);
    return {
      necessary: true, // Enforced constraint
      analytics: parsed.analytics ?? DEFAULT_COOKIE_PREFS.analytics,
      marketing: parsed.marketing ?? DEFAULT_COOKIE_PREFS.marketing
    };
  } catch (e) {
    console.error("Failed to parse cookie preferences, using defaults", e);
    return DEFAULT_COOKIE_PREFS;
  }
}

/**
 * Saves cookie preferences to localStorage and dispatches a global
 * window event to notify other parts of the application.
 */
export function setCookiePreferences(prefs: Partial<CookiePreferences>): void {
  if (typeof window === "undefined") return;
  
  const current = getCookiePreferences();
  const next = {
    ...current,
    ...prefs,
    necessary: true // Enforced constraint
  };
  
  localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(next));
  
  // Dispatch custom event for real-time synchronization
  window.dispatchEvent(
    new CustomEvent(COOKIE_PREFS_EVENT, { detail: next })
  );
}
