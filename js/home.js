// DOM Content Loaded Handler
window.addEventListener("DOMContentLoaded", () => {
  const users = localStorage.getItem("users");
  if (!users) {
    setUsers();
  }

  const user = checkAuth();
  if (!user) {
    localStorage.removeItem("userid");
  } else {
    showContentByRole(user);

    document
      .querySelector(".profile-btn")
      .addEventListener("click", (event) => {
        openProfileModal();
      });

    document
      .querySelector(".dashboard-btn")
      .setAttribute("href", `/dashboard/${user.role}.html`);

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
});

document.getElementById("orderForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const service = document.getElementById("service").value;

  if (!name || !address || !service) {
    alert("Harap lengkapi semua field wajib.");
    return;
  }

  const message = `
    Terima kasih, ${name}!
    Pesanan Anda untuk layanan "${service}" telah kami terima.
    Kami akan menghubungi Anda untuk konfirmasi lebih lanjut.
  `;

  document.getElementById("resultMessage").textContent = message;
  document.getElementById("orderForm").reset();
});

// Tangani form di setiap card layanan
document.querySelectorAll(".serviceForm").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.querySelector('input[name="name"]').value.trim();
    const address = this.querySelector('textarea[name="address"]').value.trim();
    const service = this.dataset.service;

    if (!name || !address) {
      alert("Harap isi nama dan alamat.");
      return;
    }

    const message = `Terima kasih, ${name}! Pesanan Anda untuk ${service} telah kami terima.`;

    this.querySelector(".form-message").textContent = message;
    this.reset();
  });
});

// Toggle form tampil/sembunyi saat klik card
function toggleForm(formId) {
  const form = document.getElementById(formId);
  form.classList.toggle("active");
}

// Tangani pengiriman form
document.querySelectorAll(".serviceForm").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.querySelector('input[name="name"]').value.trim();
    const address = this.querySelector('textarea[name="address"]').value.trim();
    const service = this.dataset.service;

    if (!name || !address) {
      alert("Harap isi nama dan alamat.");
      return;
    }

    const message = `Terima kasih, ${name}! Pesanan Anda untuk ${service} telah kami terima.`;
    this.querySelector(".form-message").textContent = message;
    this.reset();
  });
});

// Buka modal berdasarkan layanan
function openModal(type) {
  document.getElementById("overlay").classList.remove("hidden");
  document.getElementById(`${type}Modal`).classList.remove("hidden");
}

// Tutup modal & overlay
function closeModal() {
  document.getElementById("overlay").classList.add("hidden");
  document.getElementById("wifiModal").classList.add("hidden");
  document.getElementById("cctvModal").classList.add("hidden");
  // document.getElementById("loginModal").classList.add("hidden");
}

// Tangani pengiriman form
document.querySelectorAll(".serviceForm").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.querySelector('input[name="name"]').value.trim();
    const address = this.querySelector('textarea[name="address"]').value.trim();
    const service = this.dataset.service;

    if (!name || !address) {
      alert("Harap isi nama dan alamat.");
      return;
    }

    const message = `Terima kasih, ${name}! Pesanan Anda untuk ${service} telah kami terima.`;
    this.querySelector(".form-message").textContent = message;
    this.reset();
  });
});

function showContentByRole(userParams) {
  // Sembunyikan semua blok role dulu
  document
    .querySelectorAll(".role-section")
    .forEach((el) => el.classList.add("hidden"));

  // Tampilkan sesuai role
  const target = document.querySelector(`.role-${userParams.role}`);
  if (target) target.classList.remove("hidden");

  // Ubah navbar
  document.querySelector(
    ".auth-buttons"
  ).innerHTML = `<span style="color:#a855f7;"><i class="fa-solid fa-user profile-btn"></i></span>`;
  // ).innerHTML = `<span href="./dashboard/${userParams.role}.html" style="color:white;"><i class="fa-solid fa-user"></i></span>`;
}

function openModal(type) {
  document.getElementById("overlay").classList.remove("hidden");
  document.getElementById(`${type}Modal`).classList.remove("hidden");
}

document.querySelectorAll(".serviceForm").forEach((form) => {
  const paymentSelect = form.querySelector('select[name="payment"]');
  const qrisSection = form.querySelector(".qris-section");

  if (paymentSelect && qrisSection) {
    paymentSelect.addEventListener("change", () => {
      if (paymentSelect.value === "QRIS") {
        qrisSection.classList.remove("hidden");
      } else {
        qrisSection.classList.add("hidden");
      }
    });
  }

  paymentSelect.addEventListener("change", () => {
    if (paymentSelect.value === "QRIS") {
      qrisSection.classList.remove("hidden");
    } else {
      qrisSection.classList.add("hidden");
    }
  });
});

const forms = document.querySelectorAll(".serviceForm");

forms.forEach((form) => {
  const paymentSelect = form.querySelector('select[name="payment"]');
  const bankSection = form.querySelector(".bank-section");
  const walletIdSection = form.querySelector(".wallet-id-section");
  const walletIdBox = form.querySelector(".wallet-id-box");
  const qrisSection = form.querySelector(".qris-section");
  const closeBankBtn = form.querySelector(".close-bank-btn");

  // Generate ID acak untuk e-wallet
  function generateRandomID() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id =
      "ID-" +
      Array.from({ length: 8 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join("");
    return id;
  }

  paymentSelect.addEventListener("change", () => {
    const selected = paymentSelect.value;

    // Reset semua section
    bankSection.classList.add("hidden");
    walletIdSection.classList.add("hidden");
    qrisSection?.classList.add("hidden");

    if (selected === "Bank Transfer") {
      bankSection.classList.remove("hidden");
    } else if (["OVO", "GoPay", "ShopeePay", "DANA"].includes(selected)) {
      walletIdSection.classList.remove("hidden");
      walletIdBox.textContent = generateRandomID();
    } else if (selected === "QRIS") {
      qrisSection?.classList.remove("hidden");
    }
  });

  closeBankBtn.addEventListener("click", () => {
    bankSection.classList.add("hidden");
    paymentSelect.value = "";
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


const slider = document.getElementById("scroll-container");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; // Kecepatan scroll
  slider.scrollLeft = scrollLeft - walk;
});
