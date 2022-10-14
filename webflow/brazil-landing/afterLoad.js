// Should load script on end of <body></body>
// to ensure userData is set on window => from beforeLoad.js
const logoutButton = document.querySelector("#log-out");
const alreadyUserButton = document.querySelector("#already-user");

window.userData
  ? (logoutButton.style.display = "inline-block")
  : (alreadyUserButton.style.display = "inline-block");
