// DOM Content Loaded Handler
window.addEventListener("DOMContentLoaded", () => {
  const user = checkAuth();
  if (user)  {
    document.querySelector(
      ".auth-buttons"
    ).innerHTML = `<span style="color:#a855f7;"><i class="fa-solid fa-user profile-btn"></i></span>`;

    document.querySelector(".profile-btn").addEventListener("click", () => {
      openProfileModal();
    });

    document.querySelector(".logout").addEventListener("click", (e) => {
      Swal.fire({
        title: "Yakin untuk logout?",
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "rgb(248,113,113)",
      }).then((res) => {
        if (res.isConfirmed) {
          localStorage.removeItem("userid");
          window.location.href = "/";
        }
      });
    });

    document
      .querySelector(".dashboard-btn")
      .setAttribute("href", `/dashboard/${user.role}.html`);
  }
});




function openProfileModal() {
  showBlur();
  document.querySelector(".profile-modal").style.display = "flex";
}

function closeProfileModal() {
  hiddenBlur();
  document.querySelector(".profile-modal").style.display = "none";
}

const blurBgElem = document.querySelector(".blur-bg");
blurBgElem.addEventListener("click", () => {
  closeProfileModal();
});

function showBlur() {
  blurBgElem.style.display = "flex";
}

function hiddenBlur() {
  blurBgElem.style.display = "none";
}