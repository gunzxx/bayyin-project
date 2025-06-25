window.addEventListener("DOMContentLoaded", () => {
  const user = checkAuth();
  if (user) {
    return window.location.href = `/dashboard/${user.role}.html`;
  }
});