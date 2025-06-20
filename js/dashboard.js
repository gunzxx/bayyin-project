// Cek role saat reload halaman
window.addEventListener("DOMContentLoaded", () => {
  const role = sessionStorage.getItem("role");
  const username = sessionStorage.getItem("username");
  if (role && username) {
    // showContentByRole(role);
    document.querySelector(".profile-container").innerHTML = `<p href="./dashboard/${role}.html" style="color:white;">Halo, ${sessionStorage.getItem("username")} (${role})</p>`;
  } else {
    sessionStorage.clear();
    window.location.reload()
  }
});
