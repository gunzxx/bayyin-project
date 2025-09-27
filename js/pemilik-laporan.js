function convertMinutes(minutes) {
  const hours = Math.floor(minutes / 60); // ambil jam
  const remainingMinutes = minutes % 60;  // sisa menit
  return `${hours} jam ${remainingMinutes} menit`;
}


const userDatas = [
  {
    nama: "rudi",
    layanan: "WiFi",
    status: "selesai",
    alamat: "Jl. Cemara No.23",
    phone: "+6281234567890",
    catatan: "perlu kabel tambahan",
    dokumentasi: "/assets/dok-wifi.jpeg",
    startDate: '2025-06-02',
    endDate: '2025-06-02',
    durasi: 100,
    status: "selesai",
  },
  {
    nama: "dian",
    layanan: "CCTV",
    status: "proses",
    alamat: "Jl. Bunga Raya No.12",
    phone: "+6281234567890",
    catatan: "kamera outdoor",
    dokumentasi: "/assets/dok-cctv.jpeg",
    startDate: '2025-06-02',
    endDate: '',
    durasi: null,
    status: "proses",
  },
];

userDatas.forEach((data) => {
  const rowElement = document.createElement("tr");

  const col1 = document.createElement("td");
  const col1Val = document.createElement("div");
  col1.innerText = capitalizeFirst(data["nama"]);
  col1.appendChild(col1Val);

  const col2 = document.createElement("td");
  const col2Val = document.createElement("div");
  col2Val.innerText = capitalizeFirst(data["alamat"]);
  col2.appendChild(col2Val);

  const col3 = document.createElement("td");
  const col3Val = document.createElement("div");
  col3Val.innerText = capitalizeFirst(data["phone"]);
  col3.appendChild(col3Val);

  const col4 = document.createElement("td");
  const col4Val = document.createElement("div");
  col4Val.innerText = capitalizeFirst(data["catatan"]);
  col4.appendChild(col4Val);

  const col5 = document.createElement("td");
  const col5Val = document.createElement("div");
  col5Val.innerText = capitalizeFirst(data["startDate"]);
  col5.appendChild(col5Val);

  const col6 = document.createElement("td");
  const col6Div = document.createElement("div");
  col6Div.innerHTML = capitalizeFirst(data["endDate"]);
  col6.classList.add("center");
  col6.appendChild(col6Div);

  const col7 = document.createElement("td");
  const col7Div = document.createElement("div");
  col7Div.innerHTML = capitalizeFirst(convertMinutes(data["durasi"]));
  col7.classList.add("center");
  col7.appendChild(col7Div);

  const col8 = document.createElement("td");
  const col8Div = document.createElement("div");
  col8Div.innerHTML = capitalizeFirst(data["status"]);
  col8Div.classList.add("px-4","text-center","py-3","rounded-lg","text-white");
  data["status"] == "proses" ? col8Div.classList.add('bg-red-500') : col8Div.classList.add('bg-green-500')
  col8.appendChild(col8Div);

  const col9 = document.createElement("td");
  const col9Div = document.createElement("div");
  col9Div.innerHTML = makeDokButton(data["dokumentasi"]);
  col9.classList.add("center");
  col9.appendChild(col9Div);

  rowElement.appendChild(col1);
  rowElement.appendChild(col2);
  rowElement.appendChild(col3);
  rowElement.appendChild(col4);
  rowElement.appendChild(col5);
  rowElement.appendChild(col6);
  rowElement.appendChild(col7);
  rowElement.appendChild(col8);
  rowElement.appendChild(col9);

  document.querySelector("#userTable tbody").appendChild(rowElement);
});

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function makeVerifyButton() {
  return `
    <button class="verify-btn">Verifikasi</button>
    `;
}

function makeVerified() {
  return `
    <p class="verified-btn">Terverifikasi ✅</p>
    `;
}

document.querySelectorAll(".verify-btn").forEach((verifElem) => {
  verifElem.addEventListener("click", (event) => {
    // event.prefentDefault();
    Swal.fire({
      title: "Verifikasi pesanan?",
      icon: "question",
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: "green",
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          title: "Berhasil diverifikasi ✅",
          icon: "success",
          showConfirmButton: false,
          //   allowOutsideClick: false,
          confirmButtonColor: "green",
        });

        event.target.parentElement.innerHTML = makeVerified();
      }
    });
  });
});

function makeDokButton(link) {
  return `
  <button class="dok-btn" data-url=${link}>
    lihat
  </button>
  `;
}

document.querySelectorAll(".dok-btn").forEach((elem) => {
  elem.addEventListener("click", (event) => {
    const url = event.target.getAttribute("data-url");
    showDokImg(url);
  });
});

document.querySelector(".dok-modal").addEventListener("click", (event) => {
  document.querySelector(".dok-modal").style.display = "none";
});

function showDokImg(url) {
  document.querySelector(".dok-modal").style.display = "flex";
  document.querySelector(".dok-img").style.top = "auto";
  document.querySelector(".dok-img").setAttribute("src", url);
  // showBlur();
}

function hiddenDokImg(url) {
  document.querySelector(".dok-modal").style.display = "none";
  document.querySelector(".dok-img").style.top = "-100vh";
  // showBlur();
}
