document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.email.value.trim();
  const password = e.target.password.value;

  const allUsers = getUsers();
  const user = allUsers.find(
    (data) => data.email.toLowerCase() == email.toLowerCase() && data.password == password
  );

  if (user) {
    localStorage.setItem('userid', user.id);
    return Swal.fire({
      title: "Login berhasil!",
      icon: "success",
    }).then((result) => {
      if(user.role == 'pengguna'){
        return window.location.href = `/`;
      }
      return window.location.href = `/dashboard/${user.role}.html`;
    });
  } else {
    return Swal.fire({
      title: "Email atau password salah!",
      icon: "error",
    });
  }
});
