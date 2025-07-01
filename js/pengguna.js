// const tableDataEl = document.getElementById('tableData');

const datas = [
    {
        tanggal: '2025-05-12',
        layanan: "WiFi",
        status: "selesai",
        phone: '+6281234567890',
    },
    {
        tanggal: '2025-06-02',
        layanan: "CCTV",
        status: "proses",
        phone: '+6281234567890',
    },
]

datas.forEach(data => {
    const rowElement = document.createElement('tr');
    
    const col1 = document.createElement('td');
    const col1Val = document.createElement('div');
    col1.innerText = data['tanggal'];
    col1.appendChild(col1Val);
    
    const col2 = document.createElement('td');
    const col2Val = document.createElement('div');
    col2Val.innerText = data['layanan'];
    col2.appendChild(col2Val)

    const col3 = document.createElement('td');
    const col3Val = document.createElement('div');
    col3Val.innerText = capitalizeFirst(data['status']);
    col3.appendChild(col3Val);

    rowElement.appendChild(col1);
    rowElement.appendChild(col2);
    rowElement.appendChild(col3);

    document.querySelector('#tableData tbody').appendChild(rowElement);
})

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}