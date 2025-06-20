// const tableDataEl = document.getElementById('tableData');

const datas = [
    {
        tanggal: Date.now(),
        layanan: "WiFi",
        status: "selesai",
    },
    {
        tanggal: Date.now(),
        layanan: "CCTV",
        status: "proses",
    },
]

datas.forEach(data => {
    const rowElement = document.createElement('tr');
    
    const col1 = document.createElement('td');
    const col1Val = document.createElement('div');
    tanggal = new Date(data['tanggal'])
    col1.innerText = tanggal.toISOString().split('T')[0]
    col1.appendChild(col1Val)
    
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