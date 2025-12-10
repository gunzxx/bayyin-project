function convertMinutes(minutes) {
  const hours = Math.floor(minutes / 60); // ambil jam
  const remainingMinutes = minutes % 60; // sisa menit
  return `${hours} jam ${remainingMinutes} menit`;
}

const statuses = ["selesai", "proses"];

const datas = [
  {
    layanan: "WiFi",
    // tanggal: Date.now(),
    pengguna: "Rudi",
    alamat: "Jl. Cemara No.23",
    status: "selesai",
    tanggal: "2025-05-12",
    phone: "+6281234567890",
  },
  {
    layanan: "CCTV",
    // tanggal: Date.now(),
    pengguna: "Dian",
    alamat: "Jl. Bunga Raya No.12",
    status: "proses",
    tanggal: "2025-06-02",
    phone: "+6281234567890",
  },
  {
    layanan: "WiFi",
    pengguna: "Budi",
    alamat: "Jl. Anggrek No.8",
    status: "proses",
    tanggal: "2025-04-18",
    phone: "+628111223344",
  },
  {
    layanan: "CCTV",
    pengguna: "Sari",
    alamat: "Jl. Kenanga No.5",
    status: "selesai",
    tanggal: "2025-03-27",
    phone: "+628522334455",
  },
  {
    layanan: "WiFi",
    pengguna: "Agus",
    alamat: "Jl. Mawar No.19",
    status: "pending",
    tanggal: "2025-05-30",
    phone: "+628778889900",
  },
  {
    layanan: "CCTV",
    pengguna: "Tono",
    alamat: "Jl. Melati No.3",
    status: "selesai",
    tanggal: "2025-02-14",
    phone: "+628990001122",
  },
  {
    layanan: "WiFi",
    pengguna: "Nisa",
    alamat: "Jl. Karet No.44",
    status: "proses",
    tanggal: "2025-07-01",
    phone: "+628131234567",
  },
  {
    layanan: "CCTV",
    pengguna: "Fajar",
    alamat: "Jl. Turi No.22",
    status: "pending",
    tanggal: "2025-01-25",
    phone: "+628950112233",
  },
  {
    layanan: "WiFi",
    pengguna: "Kevin",
    alamat: "Jl. Jambu No.10",
    status: "selesai",
    tanggal: "2025-08-15",
    phone: "+628667778899",
  },
  {
    layanan: "CCTV",
    pengguna: "Putri",
    alamat: "Jl. Durian No.6",
    status: "proses",
    tanggal: "2025-03-05",
    phone: "+628888112233",
  },
  {
    layanan: "WiFi",
    pengguna: "Helmi",
    alamat: "Jl. Jeruk No.28",
    status: "pending",
    tanggal: "2025-04-09",
    phone: "+628122334400",
  },
  {
    layanan: "CCTV",
    pengguna: "Rama",
    alamat: "Jl. Sawo No.99",
    status: "selesai",
    tanggal: "2025-06-19",
    phone: "+628131314151",
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
    startDate: "2025-06-02",
    endDate: "2025-06-02",
    durasi: 100,
  },
  {
    nama: "dian",
    layanan: "CCTV",
    status: "proses",
    alamat: "Jl. Bunga Raya No.12",
    phone: "+6281234567890",
    catatan: "kamera outdoor",
    dokumentasi: "/assets/dok-cctv.jpeg",
    startDate: "2025-06-02",
    endDate: "2025-06-02",
    durasi: 200,
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
  col4Val.innerText = capitalizeFirst(data["tanggal"]);
  col4.appendChild(col4Val);

  const col5 = document.createElement("td");
  const col5Val = document.createElement("div");
  col5Val.innerText = capitalizeFirst(data["phone"]);
  col5.appendChild(col5Val);

  const col6 = document.createElement("td");
  const col6Val = document.createElement("div");
  col6Val.innerHTML =
    data["status"] == "proses" ? makeVerifyButton() : makeVerified();
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

const header = [
  { title: "Tahun", data: "Tahun", name: "Tahun" },
  { title: "Kecamatan", data: "Kecamatan", name: "Kecamatan" },
  {
    title: "Luas Panen Cabe Rawit",
    data: "Luas Panen Cabe Rawit",
    name: "Luas Panen Cabe Rawit",
  },
  {
    title: "Produktivitas Cabe Rawit",
    data: "Produktivitas Cabe Rawit",
    name: "Produktivitas Cabe Rawit",
  },
  {
    title: "Produksi Cabe Rawit",
    data: "Produksi Cabe Rawit",
    name: "Produksi Cabe Rawit",
  },
  { title: "Curah Hujan", data: "Curah Hujan", name: "Curah Hujan" },
];

const table = new DataTable("#tableData", {
  // data: [],
  // columns: header,
  // scrollX: true,
  // responsive: true,
});

// --- Pencarian Kecamatan ---
// $("#search-kecamatan").on("keyup", function () {
//   table.column(1).search($(this).val()).draw();
// });

// --- Filter tahun ---
const tanggalInput = $("#tanggal");
tanggalInput.on("change", function () {
  table.column(3).search($(this).val()).draw();
});
