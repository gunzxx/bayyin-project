function convertMinutes(minutes) {
  const hours = Math.floor(minutes / 60); // ambil jam
  const remainingMinutes = minutes % 60;  // sisa menit
  return `${hours} jam ${remainingMinutes} menit`;
}


const datas = [
  {
    layanan: "WiFi",
    tanggal: Date.now(),
    pengguna: "Rudi",
    alamat: "Jl. Cemara No.23",
    catatan: "Perlu kabel tambahan",
    phone: "+6281234567890",
    durasi: convertMinutes(100),
  },
  {
    layanan: "CCTV",
    tanggal: Date.now(),
    pengguna: "Dian",
    alamat: "Jl. Bunga Raya No.12",
    catatan: "Kamera outdoor",
    phone: "+6281234567890",
    durasi: convertMinutes(200),
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
  col4Val.innerText = capitalizeFirst(data["phone"]);
  col4.appendChild(col4Val);

  const col5 = document.createElement("td");
  const col5Val = document.createElement("div");
  col5Val.innerText = capitalizeFirst(data["durasi"]);
  col5.appendChild(col5Val);

  const col6 = document.createElement("td");
  const col6Val = document.createElement("div");
  col6Val.innerText = capitalizeFirst(data["catatan"]);
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

