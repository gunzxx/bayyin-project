function convertMinutes(minutes) {
  const hours = Math.floor(minutes / 60); // ambil jam
  const remainingMinutes = minutes % 60;  // sisa menit
  return `${hours} jam ${remainingMinutes} menit`;
}

/** Handle user data */
const datas = [
  {
    layanan: "WiFi",
    tanggal: Date.now(),
    pengguna: "Budi",
    alamat: "Jl. Anggrek No.2",
    catatan: "Perlu kabel tambahan",
    phone: "+6281234567890",
    startDate: '',
    endDate: '',
    durasi: "-",
    status: null,
  },
  {
    layanan: "WiFi",
    tanggal: Date.now(),
    pengguna: "Rudi",
    alamat: "Jl. Cemara No.23",
    catatan: "Perlu kabel tambahan",
    phone: "+6281234567890",
    startDate: '',
    endDate: '',
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
    startDate: '',
    endDate: '',
    durasi: "-",
    status: "proses",
  },
];

/** Handle user data */
function updateByIndex(idx, col, val){
  if (datas[idx]){
    if(datas[idx][col]){
      datas[idx][col] = val
      return true
    }
    return false
  }
  return false
}



/** Making data table */
datas.forEach((data, idx) => {
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
  col5Val.classList.add("durasi-col")
  col5.appendChild(col5Val);

  const col6 = document.createElement("td");
  const col6Val = document.createElement("div");
  col6Val.innerText = capitalizeFirst(data["catatan"]);
  col6.appendChild(col6Val);

  const col7 = document.createElement("td");
  const col7Val = document.createElement("div");
  col7Val.innerText = capitalizeFirstStatus(data["status"]);
  col7Val.classList.add(data['status'])
  col7.appendChild(col7Val);

  function getTextButton(){
    if(!data['status']){
      return 'mulai'
    }else if(data['status'] == 'proses'){
      return 'selesaikan'
    }else if(data['status'] == 'selesai'){
      return 'selesai'
    }
  }

  function getBgButton(){
    if(!data['status']){
      return 'bg-green-500'
    }else if(data['status'] == 'proses'){
      return 'bg-red-500'
    }else if(data['status'] == 'selesai'){
      return 'bg-gray-500'
    }
  }

  const col8 = document.createElement("td");
  const col8Val = document.createElement("button");
  col8Val.innerText = capitalizeFirst(getTextButton());
  col8Val.classList.add("w-full", "min-w-max", "border-none", "py-3", "px-4", "rounded-md", "text-white")
  col8Val.classList.add(getBgButton())

  function handleClick(){
    if (!data['status']){
      return Swal.fire({
        title: "Mulai pekerjaan?",
        showCancelButton: true,
        confirmButtonColor: "red",
      }).then((result) => {
        if(result.isConfirmed){
          col8Val.parentElement.previousElementSibling.querySelector("div").innerText = capitalizeFirst("proses")
          col8Val.classList.remove("bg-green-500")
          col8Val.classList.add("bg-red-500")
          col8Val.innerText = capitalizeFirst("selesaikan")
          col8Val.removeEventListener("click", handleClick);
        }
      });
    } else if (data['status'] == 'proses'){
      
      return Swal.fire({
        title: "Selesaikan pekerjaan?",
        showCancelButton: true,
        confirmButtonColor: "red",
      }).then((result) => {
        if(result.isConfirmed){
          col8Val.parentElement.previousElementSibling.querySelector("div").innerText = capitalizeFirst("selesai")
          col8Val.parentElement.parentElement.querySelector(".durasi-col").innerText = capitalizeFirst(convertMinutes(200))
          col8Val.classList.remove("bg-red-500")
          col8Val.classList.add("bg-gray-500")
          col8Val.innerText = capitalizeFirst("selesai")
          col8Val.classList.remove("cursor-pointer")
          col8Val.removeEventListener("click", handleClick);
        }
      });
    }
  }
  
  col8Val.classList.add("cursor-pointer")
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

function capitalizeFirstStatus(str) {
  if (!str){
    return "Belum dimulai"
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
