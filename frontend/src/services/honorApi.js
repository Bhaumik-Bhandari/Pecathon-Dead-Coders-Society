const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api"
).replace(/\/+$/, "");

const SESSION_STORAGE_KEY = "tsukuyomi.honor.session";

async function request(path, { token, ...options } = {}) {
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(
      "Could not reach the backend. Check that your Express server is running and VITE_API_BASE_URL is correct."
    );
  }

  let data = {};

  try {
    data = await response.json();
  } catch {
    // The response may be empty or non-JSON.
  }

  if (!response.ok) {
    const error = new Error(
      data.message || `Request failed with status ${response.status}.`
    );

    error.status = response.status;
    throw error;
  }

  return data;
}

export function readHonorSession() {
  try {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);

    if (!stored) return null;

    const session = JSON.parse(stored);

    if (!session?.token || !session?.player?.id) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function saveHonorSession(session) {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export async function createHonorSession(displayName) {
  const session = await request("/honor/session", {
    method: "POST",
    body: JSON.stringify({ displayName }),
  });

  saveHonorSession(session);
  return session;
}

export function fetchHonorProfile(token) {
  return request("/honor/profile", { token });
}

export function fetchHonorMissions(token) {
  return request("/honor/missions", { token });
}

export function fetchHonorLeaderboard() {
  return request("/honor/leaderboard");
}

export async function loadHonorDashboard(token) {
  const [profile, missionData, leaderboardData] = await Promise.all([
    fetchHonorProfile(token),
    fetchHonorMissions(token),
    fetchHonorLeaderboard(),
  ]);

  return {
    profile,
    missionData,
    leaderboardData,
  };
}

export function completeHonorMission(token, missionId, payload) {
  return request(
    `/honor/missions/${encodeURIComponent(missionId)}/complete`,
    {
      method: "POST",
      token,
      body: JSON.stringify(payload),
    }
  );
}
export function clearHonorSession() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}
