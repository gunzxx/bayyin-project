// const tableDataEl = document.getElementById('tableData');

const datas = [
    {
        layanan: "WiFi",
        tanggal: Date.now(),
        pengguna: "Rudi",
        alamat: "Jl. Cemara No.23",
        status: "selesai",
    },
    {
        layanan: "CCTV",
        tanggal: Date.now(),
        pengguna: "Dian",
        alamat: "Jl. Bunga Raya No.12",
        status: "proses",
    },
]

datas.forEach(data => {
    const rowElement = document.createElement('tr');
    
    const col1 = document.createElement('td');
    const col1Val = document.createElement('div');
    col1.innerText = capitalizeFirst(data['pengguna'])
    col1.appendChild(col1Val);
    
    const col2 = document.createElement('td');
    const col2Val = document.createElement('div');
    col2Val.innerText = capitalizeFirst(data['layanan']);
    col2.appendChild(col2Val);

    const col3 = document.createElement('td');
    const col3Val = document.createElement('div');
    col3Val.innerText = capitalizeFirst(data['alamat']);
    col3.appendChild(col3Val);

    const col4 = document.createElement('td');
    const col4Val = document.createElement('div');
    col4Val.innerText = capitalizeFirst(data['status']);
    col4.appendChild(col4Val);

    rowElement.appendChild(col1);
    rowElement.appendChild(col2);
    rowElement.appendChild(col3);
    rowElement.appendChild(col4);

    document.querySelector('#tableData tbody').appendChild(rowElement);
})

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}