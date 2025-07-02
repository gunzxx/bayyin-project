// const tableDataEl = document.getElementById('tableData');

const datas = [
  {
    layanan: "WiFi",
    tanggal: Date.now(),
    pengguna: "Rudi",
    alamat: "Jl. Cemara No.23",
    catatan: "Perlu kabel tambahan",
  },
  {
    layanan: "CCTV",
    tanggal: Date.now(),
    pengguna: "Dian",
    alamat: "Jl. Bunga Raya No.12",
    catatan: "Kamera outdoor",
  },
];

datas.forEach((data) => {
  const rowElement = document.createElement("tr");

  const col1 = document.createElement("td");
  const col1Val = document.createElement("div");
  col1.innerText = capitalizeFirst(data["layanan"]);
  col1.appendChild(col1Val);

  const col2 = document.createElement("td");
  const col2Val = document.createElement("div");
  col2Val.innerText = capitalizeFirst(data["pengguna"]);
  col2.appendChild(col2Val);

  const col3 = document.createElement("td");
  const col3Val = document.createElement("div");
  col3Val.innerText = capitalizeFirst(data["alamat"]);
  col3.appendChild(col3Val);

  const col4 = document.createElement("td");
  const col4Val = document.createElement("div");
  col4Val.innerText = capitalizeFirst(data["catatan"]);
  col4.appendChild(col4Val);

  rowElement.appendChild(col1);
  rowElement.appendChild(col2);
  rowElement.appendChild(col3);
  rowElement.appendChild(col4);

  document.querySelector("#tableData tbody").appendChild(rowElement);
});

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

document
  .getElementById("pekerjaForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const layanan = event.target.layanan.value;
    const pengguna = event.target.username.value;
    const lokasi = event.target.lokasi.value;
    const laporan = event.target.laporan.value;
    const foto = event.target.foto.files[0];
    console.log(pengguna);

    makeRowData({ layanan, pengguna, alamat: lokasi, catatan: laporan });

    if (!layanan || !lokasi || !laporan || !foto) {
      Swal.fire("Gagal", "Semua field harus diisi.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      // Simulasi preview / penyimpanan
      Swal.fire({
        title: "Laporan Terkirim!",
        html: `
          <strong>Layanan:</strong> ${layanan}<br>
          <strong>Lokasi:</strong> ${lokasi}<br>
          <strong>Laporan:</strong> ${laporan}<br><br>
          <img src="${reader.result}" alt="Foto Lokasi" style="max-width:100%; border-radius:8px;" />
        `,
        icon: "success",
      });

      // Reset form
      document.getElementById("pekerjaForm").reset();
    };

    reader.readAsDataURL(foto); // membaca file gambar
  });

function makeRowData(data) {
  const rowElement = document.createElement("tr");

  const col1 = document.createElement("td");
  const col1Val = document.createElement("div");
  col1.innerText = capitalizeFirst(data["layanan"]);
  col1.appendChild(col1Val);

  const col2 = document.createElement("td");
  const col2Val = document.createElement("div");
  col2Val.innerText = capitalizeFirst(data["pengguna"]);
  col2.appendChild(col2Val);

  const col3 = document.createElement("td");
  const col3Val = document.createElement("div");
  col3Val.innerText = capitalizeFirst(data["alamat"]);
  col3.appendChild(col3Val);

  const col4 = document.createElement("td");
  const col4Val = document.createElement("div");
  col4Val.innerText = capitalizeFirst(data["catatan"]);
  col4.appendChild(col4Val);

  rowElement.appendChild(col1);
  rowElement.appendChild(col2);
  rowElement.appendChild(col3);
  rowElement.appendChild(col4);

  document.querySelector("#tableData tbody").appendChild(rowElement);
}
