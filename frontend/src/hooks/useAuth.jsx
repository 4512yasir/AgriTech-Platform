// src/hooks/useAuth.js
export default function useAuth() {
  const token = localStorage.getItem("token");
  return !!token; // true if logged in
}
