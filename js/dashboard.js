// Cek role saat reload halaman
window.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const pageRole = getPageRole();

  if (!role || !username) {
    // showContentByRole(role);
    localStorage.clear();
    window.location.href = "/";
  } else if(role != pageRole){ // handle role
    window.location.href = `/dashboard/${role}.html`;
  } else {
    document.querySelector(
      ".profile-container"
    ).innerHTML = `<p href="./dashboard/${role}.html" style="color:white;">Halo, ${localStorage.getItem(
      "username"
    )} (${role})</p>`;
  }
});

function getPageRole() {
  const path = window.location.pathname; // Contoh: "/dashboard/pekerja.html"
  const lastSegment = path.split("/").filter(Boolean).pop(); // "pekerja.html" atau "pekerja"
  const pageName = lastSegment.replace(/\.html$/, "");
  return pageName;
}

document.querySelector(".profile-container").addEventListener("click", () => {
  openProfileModal();
});

document.querySelector(".blur-bg").addEventListener("click", () => {
  closeModal();
});

function openProfileModal() {
  document.querySelector(".blur-bg").style.display = "flex";
  document.querySelector(".profile-modal").style.display = "flex";
}

function closeModal() {
  document.querySelector(".blur-bg").style.display = "none";
  document.querySelector(".profile-modal").style.display = "none";
}

document.querySelector(".logout").addEventListener("click", (e) => {
  Swal.fire({
    title: "Yakin untuk logout?",
    icon: "question",
    showCancelButton: true,
    allowOutsideClick: false,
  }).then((res) => {
    if (res.isConfirmed) {
      localStorage.clear();
      window.location.href = "/";
    }
  });
});
