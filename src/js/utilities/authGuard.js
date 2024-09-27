export function authGuard() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}
