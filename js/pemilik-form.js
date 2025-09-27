const pekerjaForm = document.getElementById("pekerjaForm")

pekerjaForm.addEventListener("submit", function(event){
    event.preventDefault();
    Swal.fire({
        title: "Data berhasil disimpan",
        icon: "success",
        // icon: "success",
    }).then(res=>{
        window.location.href = "/dashboard/pemilik/laporan-pekerjaan.html"
    });
})