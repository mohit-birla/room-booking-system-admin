// Users Screen
var usersArray = []; 
let usersButton = document.getElementById("usersButton");

usersButton.addEventListener("click", () => {
    usersArray = JSON.parse(localStorage.getItem('users'));
    generateUsersScreen(usersArray);
})

const generateUsersScreen = (usersArray) => {
    let usersScreen = document.getElementById("screenContent");
    let usersHtml = 
    `<div class="w-75 m-3 p-3">
        <div class="input-group d-flex d-sm-none w-100 mb-2">
            <input type="text" class="  form-control" placeholder="Search User" aria-label="Search User" aria-describedby="button-addon2">
        </div>
        <div class="container d-flex justify-content-between m-0">
            <h3>Users</h3>
            <div class="input-group d-none d-md-flex w-50">
                <input type="text" id="searchValue" oninput="searchUser()" class="form-control" placeholder="Search User" aria-label="Search User" aria-describedby="button-addon2">
                <!-- <button class="btn btn-outline-info"   type="button" id="searchUser">Search</button> -->
            </div>
            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addUsersModel">Add User</button>
        </div>
        ${
            usersArray ?
        `<div style="overflow: auto">
            <table class="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    ${
                        usersArray?.map((usr)=>{
                        return `<tr>
                                <th scope="row">${usr.id}</th>
                                <td>${usr.username}</td>
                                <td>${usr.email}</td>
                                <td><button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editUserModel" onclick="editUserFunction(${usr.id})">Edit</button></td>
                                <td><button type="button" class="btn btn-outline-danger" onclick="deleteUser(${usr.id})">Delete</button></td>
                            </tr>`
                        })
                    }
                </tbody>
            </table>
        </div>` : `<div style="text-align: center; margin-top: 10rem"><h5>No Users</h5></div>`
        } 
    </div>
    `
    usersScreen.innerHTML = usersHtml;
}



// Search functionality
const searchUser = () => {
    var value = document.getElementById("searchValue").value
    let tableBody = document.getElementById("tableBody");

    let filteredUser = usersArray.filter((item)=>{
        return item.email.toLowerCase().includes(value);
    })

    var innerRows ='';
    const generateFilteredUser = () => {
        innerRows = filteredUser?.map((usr)=>{
            return `<tr>
                        <th scope="row">${usr.id}</th>
                        <td>${usr.username}</td>
                        <td>${usr.email}</td>
                        <td><button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editUserModel">Edit</button></td>
                        <td><button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteUserModel">Delete</button></td>
                    </tr>`
        })
    }
    generateFilteredUser()
    if (innerRows.length > 0) {
        tableBody.innerHTML = innerRows.join('');
    } else {
        tableBody.innerHTML = "";
    }
}

// save data to localStorage
// Add Users
let submitUser = () => {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let id = document.getElementById("userId").value;

    if(!username && !email && !password){
        alert("Please, Fill all Field");
    } else {
        let users = JSON.parse(localStorage.getItem('users'));
    
        if(users){
            users.push({id, username, email, password });
            localStorage.setItem("users", JSON.stringify(users));
        } else{
            let users = [];
            users.push({id, username, email, password });
            localStorage.setItem("users", JSON.stringify(users));
        }
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("userId").value = "";
        alert("Users added Succesfully")
        location.reload()
    }
}

// Delete user
const deleteUser = (userId) => {
    localStorage.setItem("userId", userId);
    if (confirm("Are you sure you want to delete this user?")) {
        let users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex((user) => Number(user.id) === userId);
        console.log(userIndex)
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            localStorage.setItem("users", JSON.stringify(users));
            alert("User deleted successfully");
        } else {
            alert("User not found");
        }
        location.reload();
    }
}

// Edit User Model Open
const editUserFunction = (editUserId) => {
    localStorage.setItem("editUserId", editUserId);
    console.log(editUserId)

    let users = JSON.parse(localStorage.getItem('users'));
    const user = users.find((user) => Number(user.id) === editUserId);
    console.log(user)

    document.getElementById("editUsername").value = user.username;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editPassword").value = user.password;

    $('#editUserModel').modal('show');
}


// Edit user
const editUser = () => {
    let username = document.getElementById("editUsername").value;
    let email = document.getElementById("editEmail").value;
    let password = document.getElementById("editPassword").value;

    const editUserId = localStorage.getItem("editUserId");
    if (confirm("Are you sure you want to edit this user?")) {
        let users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex((user) => user.id === editUserId);

        if (userIndex !== -1) {
            users[userIndex].username = username;
            users[userIndex].email = email;
            users[userIndex].password = password;

            localStorage.setItem("users", JSON.stringify(users));
            alert("User edited successfully");
        } else {
            alert("User not found");
        }
        location.reload();
    }
}
