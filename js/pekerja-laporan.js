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
      }).then(() => {
        window.location.href = "/dashboard/pekerja"
      });

      // Reset form
      // document.getElementById("pekerjaForm").reset();

      // Redirect to dashboard
    };

    reader.readAsDataURL(foto); // membaca file gambar
  });