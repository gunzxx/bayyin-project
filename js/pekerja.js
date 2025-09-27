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
    status: "selesai",
  },
  {
    layanan: "CCTV",
    tanggal: Date.now(),
    pengguna: "Dian",
    alamat: "Jl. Bunga Raya No.12",
    catatan: "Kamera outdoor",
    phone: "+6281234567890",
    durasi: convertMinutes(200),
    status: "dikerjakan",
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

  const col7 = document.createElement("td");
  const col7Val = document.createElement("div");
  col7Val.innerText = capitalizeFirst(data["status"]);
  col7Val.classList.add(data['status'])
  col7.appendChild(col7Val);

  const col8 = document.createElement("td");
  const col8Val = document.createElement("button");
  col8Val.innerText = capitalizeFirst(data['status'] == "selesai" ? "selesai" : "selesaikan");
  col8Val.classList.add("border-none", "py-3", "px-4", "rounded-md", "text-white")
  col8Val.classList.add(data['status'] == 'selesai' ? "bg-gray-500" : "bg-red-500")

  function handleClick(){
    Swal.fire({
      title: "Selesaikan pekerjaan?",
      showCancelButton: true,
      confirmButtonColor: "red",
    }).then((result) => {
      if(result.isConfirmed){
        col8Val.parentElement.previousElementSibling.querySelector("div").innerText = capitalizeFirst("selesai")
        col8Val.classList.remove("bg-red-500")
        col8Val.classList.add("bg-gray-500")
        col8Val.innerText = capitalizeFirst("selesai")
        col8Val.classList.remove("cursor-pointer")
      }
    });

    col8Val.removeEventListener("click", handleClick);
  }
  
  data['status'] == "selesai" ? "" : col8Val.classList.add("cursor-pointer")
  data['status'] == "selesai" ? col8Val.setAttribute("disabled", true) : ""
  data['status'] == "selesai" ? "" : col8Val.addEventListener("click", handleClick)
  col8.appendChild(col8Val);

  rowElement.appendChild(col1);
  rowElement.appendChild(col2);
  rowElement.appendChild(col3);
  rowElement.appendChild(col4);
  rowElement.appendChild(col5);
  rowElement.appendChild(col6);
  rowElement.appendChild(col7);
  rowElement.appendChild(col8);

  document.querySelector("#tableData tbody").appendChild(rowElement);
});

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
