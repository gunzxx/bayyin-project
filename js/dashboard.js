// Cek role saat reload halaman
window.addEventListener("DOMContentLoaded", () => {
  const user = checkAuth();
  const pageRole = getPageRole();

  if (!user) {
    localStorage.removeItem("userid");
    window.location.href = "/";
  } else {
    const role = user.role;

    /** handle role */
    if (role != pageRole) {
      window.location.href = `/dashboard/${role}.html`;
    }

    document.querySelector(
      ".profile-container"
    ).innerHTML = `<p href="./dashboard/${role}.html">Halo, ${user.username} (${role})</p>`;
  }
});

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
    confirmButtonColor: 'rgb(248,113,113)',
  }).then((res) => {
    if (res.isConfirmed) {
      localStorage.removeItem("userid");
      window.location.href = "/";
    }
  });
});


function showBlur(){
  document.querySelector(".blur-bg").style.display = "flex";
}

function hiddenBlur(){
  document.querySelector(".blur-bg").style.display = "none";
}