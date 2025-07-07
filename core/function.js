function filterText(text) {
  /** Clear white space */
  text.trim().replace(" ", "");

  return text;
}

function checkInput(inputs) {
  /** Clear white space */
  inputs.trim().replace(" ", "");
  return inputs;
}



function getPageRole() {
  const path = window.location.pathname; // Contoh: "/dashboard/pekerja.html"
  const lastSegment = path.split("/").filter(Boolean).pop(); // "pekerja.html" atau "pekerja"
  const pageName = lastSegment.replace(/\.html$/, "");
  return pageName;
}



function checkAuth() {
  const userid = localStorage.getItem("userid");
  if (!userid) {
    return userid;
  }
  const user = getUser(userid);
  return user;
}

function getUser(useridParams) {
  return getUsers().find((data) => data.id == useridParams);;
}


function getUsers() {
  return JSON.parse(localStorage.getItem("users") || '[]');
}
function setUsers() {
  return localStorage.setItem('users', JSON.stringify(usersData));
}

function getLastUserId() {
  const usersLocalData = getUsers();
  if (usersLocalData.length > 0) {
    return usersLocalData[usersLocalData.length - 1].id + 1;
  }
  return usersData[usersData.length - 1].id + 1;
}

function getUserId(){
  return localStorage.getItem("userid");
}