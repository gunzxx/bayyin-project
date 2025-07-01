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

// document.getElementById("loginForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const name = document.getElementById("loginName").value.trim();
//   const role = document.getElementById("userRole").value;

//   if (!name || !role) {
//     alert("Harap isi semua kolom.");
//     return;
//   }

//   // Simpan ke session (sederhana)
//   localStorage.setItem("username", name);
//   localStorage.setItem("role", role);

//   showContentByRole(role);
//   closeModal();
// });

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
  ).innerHTML = `<a href="./dashboard/${userParams.role}.html" style="color:white;">Halo, ${userParams.username} (${userParams.role})</a>`;
}

function openModal(type) {
  document.getElementById("overlay").classList.remove("hidden");
  document.getElementById(`${type}Modal`).classList.remove("hidden");
}

// Cek role saat reload halaman
window.addEventListener("DOMContentLoaded", () => {
  const users = localStorage.getItem('users');
  if(!users){
    setUsers();
  }
  
  const user = checkAuth();
  if (user) {
    showContentByRole(user);
  } else {
    localStorage.removeItem('userid');
  }
});

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
      let id = "ID-" + Array.from({ length: 8 }, () =>
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
      } else if (
        ["OVO", "GoPay", "ShopeePay", "DANA"].includes(selected)
      ) {
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