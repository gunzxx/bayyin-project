// DOM Content Loaded Handler
window.addEventListener("DOMContentLoaded", () => {
  const user = checkAuth();
  if (user) {
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
      .setAttribute("href", `/dashboard/${user.role}`);
  }
});

const qrisModal = document.getElementById("qris-modal");
document.getElementById("qris-method").addEventListener("click", () => {
  qrisModal.style.display = "flex";
});
document.getElementById("ok-qris-btn").addEventListener("click", () => {
  window.location.href = "/payment/wifi/qris.html";
});

const shopeepayModal = document.getElementById("shopeepay-modal");
document.getElementById("shopeepay-method").addEventListener("click", () => {
  shopeepayModal.style.display = "flex";
});

const gopayModal = document.getElementById("gopay-modal");
document.getElementById("gopay-method").addEventListener("click", () => {
  gopayModal.style.display = "flex";
});

const bankModal = document.getElementById("bank-modal");
document.getElementById("bank-method").addEventListener("click", () => {
  bankModal.style.display = "flex";
});

document.querySelectorAll(".close-modal-payment-btn").forEach((elem) => {
  elem.addEventListener("click", () => {
    document.querySelectorAll(".payment-modals").forEach((modElem) => {
      modElem.style.display = "none";
    });
  });
});

// 1. Pilih semua elemen metode pembayaran
const paymentOptions = document.querySelectorAll(".payment-card");

// 2. Tambahkan event listener untuk setiap opsi
paymentOptions.forEach((option) => {
  option.addEventListener("click", () => {
    paymentOptions.forEach((opt) => {
      opt.classList.remove("selected");
    });

    option.classList.add("selected");
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

/** Payment Method */
// Fungsionalitas JavaScript tetap sama persis
document.querySelectorAll(".bank-option").forEach((option) => {
  option.addEventListener("click", function () {
    // Hapus kelas 'active' dari semua pilihan
    document
      .querySelectorAll(".bank-option")
      .forEach((o) => o.classList.remove("active"));

    // Tambahkan kelas 'active' ke pilihan yang diklik
    this.classList.add("active");

    const bank = this.getAttribute("data-bank");

    // Sembunyikan semua detail pembayaran dengan menambahkan kelas 'hidden'
    document.querySelectorAll(".payment-details").forEach((detail) => {
      detail.classList.add("hidden");
    });

    // Tampilkan detail bank yang dipilih dengan menghapus kelas 'hidden'
    const selectedDetail = document.getElementById(bank + "-details");
    if (selectedDetail) {
      selectedDetail.classList.remove("hidden");
    }
  });
});

function copyToClipboard(elementId) {
  const textToCopy = document.getElementById(elementId).innerText;
  // Gunakan navigator.clipboard API modern untuk menyalin teks
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      alert("Nomor Virtual Account berhasil disalin!");
    })
    .catch((err) => {
      console.error("Gagal menyalin teks: ", err);
      alert("Gagal menyalin. Silakan salin secara manual.");
    });
}
