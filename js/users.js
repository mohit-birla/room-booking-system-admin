// Users Screen
const array = [
    {
        id: 1,
        email: "raftar@averybit.in",
        name: "Raftar"
    },
    {
        id: 2,
        email: "raftar@averybit.in",
        name: "Honey"

    },
    {
        id: 3,
        email: "raftar@averybit.in",
        name: "Mustang"
    },
    {
        id: 3,
        email: "raftar@averybit.in",
        name: "Mustang"
    }
]

let html = `
<div class="container ">
    <div class="container d-flex justify-content-between">
        <h3>Users</h3>
        <div class="input-group w-50">
            <input id="searchValue" onkeyup="searchUser()" type="text" class="form-control" placeholder="Search User" aria-label="Search User" aria-describedby="button-addon2">
            <button class="btn btn-outline-primary" type="button" id="searchUser">Search</button>
        </div>
        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUsersModel">Add User</button></td>
    </div>
    <table class="table">
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
                array.map((usr)=>{
                   return `<tr>
                        <th scope="row">${usr.id}</th>
                        <td>${usr.name}</td>
                        <td>${usr.email}</td>
                        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editUserModel">Edit</button></td>
                        <td><button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteUserModel">Delete</button></td>
                    </tr>`
                })
            }
        </tbody>
    </table>
</div>
`

// User Screen Manipulation
// Getting screen element for change
let screenContent = document.getElementById("screenContent");

// Getting button for adding event listner
let userScreen = document.getElementById("userScreen");

userScreen.addEventListener("click", () => {
    // changing content on click
    screenContent.innerHTML = html;
})

// Search functionality
const searchUser = () => {
    var value = document.getElementById("searchValue").value.toLowerCase();

    let tableBody = document.getElementById("tableBody");

    let filteredUser = array.filter((item)=>{
        return item.name.toLowerCase().includes(value);
    })

    let innerRows = filteredUser.map((usr)=>{
        return `<tr>
                    <th scope="row">${usr.id}</th>
                    <td>${usr.name}</td>
                    <td>${usr.email}</td>
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editUserModel">Edit</button></td>
                    <td><button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteUserModel">Delete</button></td>
                </tr>`
    })

    tableBody.innerHTML = innerRows;
}

// save data to localStorage
let submit = () => {
    let name = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem('users'));
    
    if(users){
        users.push({email, name, password});
        localStorage.setItem("users", JSON.stringify(users));
    }else{
        let users = [];
        users.push({email, name, password});
        localStorage.setItem("users", JSON.stringify(users));
    }
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    alert("User added Succesfully")
}
