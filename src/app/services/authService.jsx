const KEY = "market_auth_user";

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function storeUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem(KEY);
}

// 더미 회원가입: 저장만 함
export async function signup({ email, password, nickname }) {
  // 백엔드 붙으면 여기서 API 호출
  const user = { id: String(Date.now()), email, nickname };
  storeUser(user);
  return user;
}

// 더미 로그인: 저장된 user 있으면 그걸 쓰고, 없으면 새로 만든다(프론트만 테스트용)
export async function login({ email, password }) {
  const existing = getStoredUser();
  if (existing && existing.email === email) return existing;

  const user = { id: String(Date.now()), email, nickname: email.split("@")[0] };
  storeUser(user);
  return user;
}

export async function logout() {
  clearUser();
  return true;
}
