// Users Screen
var usersArray = [];
var userId;
let usersButton = document.getElementById("usersButton");

const getUsers = () => {
  axios.get("http://localhost:8080/profile/all").then((res) => {
    usersArray = res.data.data;
    generateUsersScreen(usersArray);
  });
};

usersButton.addEventListener("click", () => {
  getUsers();
});

const generateUsersScreen = (usersArray) => {
  let usersScreen = document.getElementById("screenContent");
  let usersHtml = `<div class="w-75 m-3 p-3">
        <div class="input-group d-flex d-sm-none w-100 mb-2">
            <input type="text" class="  form-control" placeholder="Search User" aria-label="Search User" aria-describedby="button-addon2">
        </div>
        <div class="container d-flex justify-content-between m-0">
            <h3>Users</h3>
            <div class="input-group d-none d-md-flex w-50">
                <input type="text" id="searchValue" oninput="searchUser()" class="form-control" placeholder="Search User" aria-label="Search User" aria-describedby="button-addon2">
                <!-- <button class="btn btn-outline-info"   type="button" id="searchUser">Search</button> -->
            </div>
            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addUsersModel" onclick="changeHtml()">Add User</button>
        </div>
        ${
          usersArray
            ? `<div style="overflow: auto">
            <table class="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Position</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    ${usersArray?.map((usr) => {
                      return `<tr>
                                <th scope="row">${usr.emp_id}</th>
                                <td>${usr.name}</td>
                                <td>${usr.email}</td>
                                <td>${usr.position}</td>
                                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addUsersModel " onclick="getDataToUpdate(${usr.emp_id})">Edit</button></td>
                                <td><button type="button" class="btn btn-outline-danger" onclick="deleteUser(${usr.emp_id})">Delete</button></td>
                            </tr>`;
                    })}
                </tbody>
            </table>
        </div>`
            : `<div style="text-align: center; margin-top: 10rem"><h5>No Users</h5></div>`
        } 
    </div>
    `;
  usersScreen.innerHTML = usersHtml;
};

const changeHtml = () => {
  document.getElementById("userModal").innerHTML = "Add User";

  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("position").value = "";
};

// Search functionality
const searchUser = () => {
  var value = document.getElementById("searchValue").value;
  let tableBody = document.getElementById("tableBody");

  let filteredUser = usersArray.filter((item) => {
    return item.name.toLowerCase().includes(value);
  });

  var innerRows = "";
  const generateFilteredUser = () => {
    innerRows = filteredUser?.map((usr) => {
      return `<tr>
                        <th scope="row">${usr.emp_id}</th>
                        <td>${usr.name}</td>
                        <td>${usr.email}</td>
                        <td>${usr.position}</td>
                        <td><button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editUserModel" onclick="getDataToUpdate(${usr.emp_id})">Edit</button></td>
                        <td><button type="button" class="btn btn-outline-danger" onclick="deleteUser(${usr.emp_id})">Delete</button></td>
                    </tr>`;
    });
  };
  generateFilteredUser();
  if (innerRows.length > 0) {
    tableBody.innerHTML = innerRows.join("");
  } else {
    tableBody.innerHTML = "";
  }
};

// save data to localStorage
// Add Users
let submitUser = () => {
  if (userId) {
    updateUser();
    return;
  }
  let name = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let position = document.getElementById("position").value;

  const data = { name, email, password, position };

  if (!name || !email || !password || !position) {
    alert("Please, Fill all Field");
  } else {
    axios.post("http://localhost:8080/register", data).then((res) => {
      alert(res.data.message);
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
  }
};

// Delete user
const deleteUser = (deleteUserId) => {
  axios
    .delete(`http://localhost:8080/profile/delete/${deleteUserId}`)
    .then((res) => {
      alert(res.data.message);
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
};

const getDataToUpdate = (id) => {
  userId = id;
  document.getElementById("userModal").innerHTML = "Update User";
  const user = usersArray.filter((item) => item.emp_id == id)[0];
  document.getElementById("username").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("password").value = user.password;
  document.getElementById("position").value = user.position;
};

// Edit User
const updateUser = () => {
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let position = document.getElementById("position").value;
  const data = { username, email, password, position };

  if (!username || !password || !email || !position) {
    alert("Please, Fill all Field");
  } else {
    const id = userId;
    axios
      .put(`http://localhost:8080/profile/update/${id}`, data)
      .then((res) => {
        alert(res.data.message);
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
  }
  userId = null;
};

// sendEmail to user
const sendEmail = (userEmail, msg) => {
  console.log("runned");
  console.log(userEmail);
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "sumit.vishwakarma@averybit.in",
    Password: "B5817F36815288F5FC9E97DABA161074033F",
    To: userEmail,
    From: "sumit.vishwakarma@averybit.in",
    Subject: "Account Info Changes",
    Body: msg,
  }).then(function (message) {
    // alert("mail sent successfully")
  });
};
