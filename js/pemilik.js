// const tableDataEl = document.getElementById('tableData');

const datas = [
  {
    layanan: "WiFi",
    tanggal: Date.now(),
    pengguna: "Rudi",
    alamat: "Jl. Cemara No.23",
    status: "selesai",
    tanggal: "2025-05-12",
  },
  {
    layanan: "CCTV",
    tanggal: Date.now(),
    pengguna: "Dian",
    alamat: "Jl. Bunga Raya No.12",
    status: "proses",
    tanggal: "2025-06-02",
  },
];

const userDatas = [
  {
    nama: "rudi",
    layanan: "WiFi",
    status: "selesai",
    alamat: "Jl. Cemara No.23",
    phone: "+6281234567890",
    catatan: "perlu kabel tambahan",
    dokumentasi: "/assets/dok-wifi.jpeg",
  },
  {
    nama: "dian",
    layanan: "CCTV",
    status: "proses",
    alamat: "Jl. Bunga Raya No.12",
    phone: "+6281234567890",
    catatan: "kamera outdoor",
    dokumentasi: "/assets/dok-cctv.jpeg",
  },
];

datas.forEach((data) => {
  const rowElement = document.createElement("tr");

  const col1 = document.createElement("td");
  const col1Val = document.createElement("div");
  col1.innerText = capitalizeFirst(data["pengguna"]);
  col1.appendChild(col1Val);

  const col2 = document.createElement("td");
  const col2Val = document.createElement("div");
  col2Val.innerText = capitalizeFirst(data["layanan"]);
  col2.appendChild(col2Val);

  const col3 = document.createElement("td");
  const col3Val = document.createElement("div");
  col3Val.innerText = capitalizeFirst(data["alamat"]);
  col3.appendChild(col3Val);

  const col4 = document.createElement("td");
  const col4Val = document.createElement("div");
  col4Val.innerText = capitalizeFirst(data["alamat"]);
  col4.appendChild(col4Val);

  const col5 = document.createElement("td");
  const col5Val = document.createElement("div");
  col5Val.innerText = capitalizeFirst(data["status"]);
  col5.appendChild(col5Val);

  const col6 = document.createElement("td");
  const col6Val = document.createElement("div");
  col6Val.innerHTML = data["status"] == "proses" ? makeVerifyButton() : makeVerified();
  col6.classList.add("center");
  col6.appendChild(col6Val);

  rowElement.appendChild(col1);
  rowElement.appendChild(col2);
  rowElement.appendChild(col3);
  rowElement.appendChild(col4);
  rowElement.appendChild(col5);
  rowElement.appendChild(col6);
  document.querySelector("#tableData tbody").appendChild(rowElement);
});

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
  col5Val.innerText = capitalizeFirst(data["status"]);
  col5.appendChild(col5Val);

  const col6 = document.createElement("td");
  const col6Val = document.createElement("div");
  col6Val.innerHTML = makeDokButton(data["dokumentasi"]);
  col6.classList.add("center");
  col6.appendChild(col6Val);

  rowElement.appendChild(col1);
  rowElement.appendChild(col2);
  rowElement.appendChild(col3);
  rowElement.appendChild(col4);
  rowElement.appendChild(col5);
  rowElement.appendChild(col6);

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
