// DOM Content Loaded Handler
window.addEventListener("DOMContentLoaded", () => {
  const users = localStorage.getItem("users");
  if (!users) {
    setUsers();
  }

  const user = checkAuth();
  if (!user) {
    localStorage.removeItem("userid");
    window.location.href = "/";
  } else {
    document.querySelector(
      ".auth-buttons"
    ).innerHTML = `<span style="color:#a855f7;"><i class="fa-solid fa-user profile-btn"></i></span>`;

    document
      .querySelector(".profile-btn")
      .addEventListener("click", (event) => {
        openProfileModal();
      });

    document
      .querySelector(".dashboard-btn")
      .setAttribute("href", `/dashboard/${user.role}`);

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
  }

  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const openBtn = document.getElementById("openSidebar");

  openBtn.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
  });
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
