let loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", () => {
  loginUser();
});

let loginUser = () => {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  const data = { email, password };

  if (!email && !password) {
    alert("Please, Fill all Field");
  } else {
    axios.post("http://localhost:8080/login", data).then((res) => {
      if (res.data.message == "User not found") {
        alert("Email password do not match");
      } else {
        let loggedInAdminId = res.data.data[0];
        console.log(loggedInAdminId)
        if (loggedInAdminId.role == 1) {
          localStorage.setItem("loggedInAdminId", loggedInAdminId.emp_id);
          location.replace("./html/adminPannel.html");
        } else {
          alert("Acces Denied");
        }
      }
    });
  }
};
