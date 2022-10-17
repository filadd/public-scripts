// Should load script on end of <body></body>
// to ensure userData is set on window => from beforeLoad.js
const logoutButton = document.querySelector("#log-out");
const alreadyUserButton = document.querySelector("#already-user");

if (window.userData) {
  logoutButton.style.display = "inline-block";
} else {
  alreadyUserButton.style.display = "inline-block";
}
