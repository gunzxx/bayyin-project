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
    document.querySelector(".auth-buttons").innerHTML = `<span style="color:#a855f7;"><i class="fa-solid fa-user profile-btn"></i></span>`;

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
});

document.getElementById("profileForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.email.value.trim().toLowerCase();
  const username = e.target.username.value.trim();
  const password = e.target.password.value;
  const passwordConfirmation = e.target.passwordConfirmation.value;
  const kecamatan = e.target.kec.value;
  const desa = e.target.desa.value;

  /** Handle input validation */
  if (/\s/.test(email)) {
    e.target.username.focus();
    return Swal.fire({
      title: "Email tidak boleh mengandung spasi!",
      icon: "error",
    });
  }
  if (email.length <= 0) {
    e.target.email.focus();
    return Swal.fire({
      title: "Email tidak boleh kosong!",
      icon: "error",
    });
  }
  if (username.length <= 0) {
    e.target.username.focus();
    return Swal.fire({
      title: "Username tidak boleh kosong!",
      icon: "error",
    });
  }
  if (password.length < 8) {
    e.target.password.focus();
    return Swal.fire({
      title: "Password tidak boleh kurang dari 8!",
      icon: "error",
    });
  }
  if (passwordConfirmation.length < 8) {
    e.target.passwordConfirmation.focus();
    return Swal.fire({
      title: "Password tidak boleh kurang dari 8!",
      icon: "error",
    });
  }

  if (password != passwordConfirmation) {
    return Swal.fire({
      title: "Password tidak sama!",
      icon: "error",
    });
  }

  if (kecamatan.trim().length <= 0) {
    console.log(kecamatan);
    
    return Swal.fire({
      title: "Kecamatan tidak boleh kosong!",
      icon: "error",
    });
  }

  if (desa.trim().length <= 0) {
    return Swal.fire({
      title: "Desa tidak boleh kosong!",
      icon: "error",
    });
  }

  /** Handle email duplicate */
  const allUsers = getUsers().filter(data => data.id != getUserId());
  const user = allUsers.find(
    (data) => data.email.toLowerCase() == email.toLowerCase()
  );

  if (user) {
    e.target.email.focus();
    return Swal.fire({
      title: "Email sudah digunakan!",
      icon: "error",
    });
  }

  /** Update profile */
  const saveUsers = getUsers().map(data => {
    if(data.id == getUserId()){
      return {...data, email, username, password};
    }
    return data;
  });
  localStorage.setItem("users", JSON.stringify(saveUsers));
  console.log(saveUsers);

  return Swal.fire({
    title: "Profil berhasil diperbarui!",
    icon: "success",
  }).then(() => {
    window.location.reload();
  });
});



/** Modal */

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






const API_BASE_URL = "https://www.emsifa.com/api-wilayah-indonesia/api";

const getProvinces = () => {
  return axios.get(`${API_BASE_URL}/provinces.json`);
};

const getRegencies = (provinceId) => {
  return axios.get(`${API_BASE_URL}/regencies/${provinceId}.json`);
};

const getDistricts = (regencyId) => {
  return axios.get(`${API_BASE_URL}/districts/${regencyId}.json`);
};

const getVillages = (districtId) => {
  return axios.get(`${API_BASE_URL}/villages/${districtId}.json`);
};

window.addEventListener("load", async function () {
  const kecEl = document.getElementById("kec");
  const desaEl = document.getElementById("desa");

  const provs = (await getProvinces()).data;
  
  const kecs = (await getDistricts(3512)).data;
  kecs.forEach((kec) => {
    const opt = document.createElement("option");
    opt.setAttribute("value", kec.id);
    opt.textContent = kec.name;
    kecEl.appendChild(opt);
  });
  kecEl.removeAttribute("disabled");

  kecEl.addEventListener("change", async function (e) {
    desaEl.setAttribute("disabled", true);
    desaEl.innerHTML = '';

    const desaId = e.target.value;
    const desas = (await getVillages(desaId)).data;
    desas.forEach((desa) => {
      const opt = document.createElement("option");
      opt.setAttribute("value", desa.id);
      opt.textContent = desa.name;
      desaEl.appendChild(opt);
    });
    desaEl.removeAttribute("disabled");
  });
});