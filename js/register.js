document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.email.value.trim().toLowerCase();
  const username = e.target.username.value.trim();
  const password = e.target.password.value.trim();
  const passwordConfirmation = e.target.passwordConfirmation.value.trim();
  const role = e.target.role.value;

  /** Handle input validation */
  if (/\s/.test(email)) {
    e.target.username.focus();
    return Swal.fire({
      title: "Email tidak boleh mengandung spasi!",
      icon: "error",
    });
  }
  if(email.length <= 0){
    e.target.email.focus();
    return Swal.fire({
      title: "Email tidak boleh kosong!",
      icon: "error",
    });
  }
  if(username.length <= 0){
    e.target.username.focus();
    return Swal.fire({
      title: "Username tidak boleh kosong!",
      icon: "error",
    });
  }
  if(password.length < 8){
    e.target.password.focus();
    return Swal.fire({
      title: "Password tidak boleh kurang dari 8!",
      icon: "error",
    });
  }
  if(passwordConfirmation.length < 8){
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

  
  /** Handle user duplicate */
  const allUsers = getUsers();
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

  const newUser = {
    id: getLastUserId(),
    email,
    username,
    password,
    role,
  };
  const saveUsers = [...allUsers, newUser];
  localStorage.setItem("users", JSON.stringify(saveUsers));

  return Swal.fire({
    title: "Pendaftaran berhasil!",
    icon: "success",
  }).then(()=> {
    window.location.href = `/`;
  });
});

// document.getElementById('passwordConfirmation').addEventListener('keydown', (e)=>{
//   let inputPassword = e.target.value;
//   const regStr = /^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?`~]$/;
//   if(regStr.test(e.key) && e.key.length == 1){
//     inputPassword += e.key;
//   }
//   console.log(inputPassword);

//   if(inputPassword != document.getElementById('password').value){
//     // console.log(e.target.value);
//   }
// });

/** Handle password confirmation */
document.querySelectorAll(".passwordInput").forEach((elem) => {
  elem.addEventListener("change", (event) => {
    if (
      document.getElementById("password").value !=
      document.getElementById("passwordConfirmation").value
    ) {
      addErrorInputPassword();
    } else {
      removeErrorInputPassword();
    }
  });
});


function addErrorInputPassword() {
  document.querySelectorAll(".error-msg").forEach((element) => {
    element.classList.remove("hidden");
  });
  document.querySelectorAll(".passwordInput").forEach((element) => {
    element.classList.add("error");
  });
}

function removeErrorInputPassword() {
  document.querySelectorAll(".error-msg").forEach((element) => {
    element.classList.add("hidden");
  });
  document.querySelectorAll(".passwordInput").forEach((element) => {
    element.classList.remove("error");
  });
}
