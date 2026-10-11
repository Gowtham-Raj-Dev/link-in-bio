/** Remembers the username a visitor typed on the landing page so the profile
 *  editor can pre-fill it after they sign up. */

const KEY = "linkinbio:claimed-username";

export function saveClaimedUsername(username: string) {
  try {
    window.localStorage.setItem(KEY, username);
  } catch {
    // Storage can be unavailable (private mode); the claim is only a convenience.
  }
}

export function readClaimedUsername(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

export function clearClaimedUsername() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Nothing to clear.
  }
}
