// Cek role saat reload halaman
window.addEventListener("DOMContentLoaded", () => {
  const user = checkAuth();

  if (!user) {
    localStorage.removeItem("userid");
    return window.location.href = "/";
  }
  const role = user.role;
  document.querySelector(
    ".profile-container"
  ).innerHTML = `<p href="./dashboard/${role}.html" style="color:white;">Halo, ${user.username} (${role})</p>`;
  
  document.getElementById('email').value = user.email;
  document.getElementById('username').value = user.username;
  document.getElementById('password').value = '';
  document.getElementById('passwordConfirmation').value = '';
  document.querySelector('.back-btn').setAttribute('href', `/dashboard/${role}.html`)
});

document.getElementById("profileForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.email.value.trim().toLowerCase();
  const username = e.target.username.value.trim();
  const password = e.target.password.value;
  const passwordConfirmation = e.target.passwordConfirmation.value;

  /** Handle input validation */
  if (/\s/.test(email)) {
    e.target.username.focus();
    return Swal.fire({
      title: "Email tidak boleh mengandung spasi!",
      icon: "error",
    });
  }
  if (email.length <= 0) {
    e.target.email.focus();
    return Swal.fire({
      title: "Email tidak boleh kosong!",
      icon: "error",
    });
  }
  if (username.length <= 0) {
    e.target.username.focus();
    return Swal.fire({
      title: "Username tidak boleh kosong!",
      icon: "error",
    });
  }
  if (password.length < 8) {
    e.target.password.focus();
    return Swal.fire({
      title: "Password tidak boleh kurang dari 8!",
      icon: "error",
    });
  }
  if (passwordConfirmation.length < 8) {
    e.target.passwordConfirmation.focus();
    return Swal.fire({
      title: "Password tidak boleh kurang dari 8!",
      icon: "error",
    });
  }

  if (password != passwordConfirmation) {
    return Swal.fire({
      title: "Password tidak sama!",
      icon: "error",
    });
  }

  /** Handle email duplicate */
  const allUsers = getUsers().filter(data => data.id != getUserId());
  const user = allUsers.find(
    (data) => data.email.toLowerCase() == email.toLowerCase()
  );

  if (user) {
    e.target.email.focus();
    return Swal.fire({
      title: "Email sudah digunakan!",
      icon: "error",
    });
  }

  /** Update profile */
  const saveUsers = getUsers().map(data => {
    if(data.id == getUserId()){
      return {...data, email, username, password};
    }
    return data;
  });
  localStorage.setItem("users", JSON.stringify(saveUsers));
  console.log(saveUsers);

  return Swal.fire({
    title: "Profil berhasil diperbarui!",
    icon: "success",
  }).then(() => {
    window.location.reload();
  });
});
