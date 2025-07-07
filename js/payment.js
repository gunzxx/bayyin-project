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


const blurBgModal = document.getElementById("success-modal");

document.getElementById('next-btn').addEventListener('click', event => {
    blurBgModal.style.display = 'flex';
});

document.getElementById('ok-btn').addEventListener('click', event => {
    console.log(event.target);
    closeModal();
    window.location.href = '/payment/detail.html';
});

function openModal() {
  blurBgModal.style.display = "flex";
}

function closeModal() {
  blurBgModal.style.display = "none";
}


// 1. Pilih semua elemen metode pembayaran
const paymentOptions = document.querySelectorAll('.payment-card');

// 2. Tambahkan event listener untuk setiap opsi
paymentOptions.forEach(option => {
    option.addEventListener('click', () => {        
        paymentOptions.forEach(opt => {
            opt.classList.remove('selected');
        });

        option.classList.add('selected');
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