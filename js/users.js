// Users Screen
const usersArray = [
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
        name: "Farrari"
    },
    {
        id: 4,
        email: "raftar@averybit.in",
        name: "Mustang"
    }
]

let usersHtml = `
<div class="m-3 p-3">
    <div class="input-group d-flex d-sm-none w-100 mb-2">
        <input id="searchValue" onkeyup="searchUser()" type="text" class="  form-control" placeholder="Search User" aria-label="Search User" aria-describedby="button-addon2">
    </div>
    <div class="container d-flex justify-content-between m-0">
        <h3>Users</h3>
        <div class="input-group d-none d-md-flex w-50">
            <input id="searchValue" onkeyup="searchUser()" type="text" class="  form-control" placeholder="Search User" aria-label="Search User" aria-describedby="button-addon2">
            <button class="btn btn-outline-info" type="button" id="searchUser">Search</button>
        </div>
        <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addUsersModel">Add User</button>
    </div>
    <div>
    </div>
    <div style="overflow: auto">
    <table class="table table-bordered">
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
                usersArray.map((usr)=>{
                   return `<tr>
                        <th scope="row">${usr.id}</th>
                        <td>${usr.name}</td>
                        <td>${usr.email}</td>
                        <td><button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editUserModel">Edit</button></td>
                        <td><button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteUserModel">Delete</button></td>
                    </tr>`
                })
            }
        </tbody>
    </table>
    </div>
</div>
`

// Screen Manipulation
let usersScreen = document.getElementById("screenContent");
let usersButton = document.getElementById("usersButton");

usersButton.addEventListener("click", () => {
    usersScreen.innerHTML = usersHtml;
})



// Search functionality
const searchUser = () => {
    var value = document.getElementById("searchValue").value.toLowerCase();

    let tableBody = document.getElementById("tableBody");

    let filteredUser = usersArray.filter((item)=>{
        return item.name.toLowerCase().includes(value);
    })

    let innerRows = filteredUser.map((usr)=>{
        return `<tr>
                    <th scope="row">${usr.id}</th>
                    <td>${usr.name}</td>
                    <td>${usr.email}</td>
                    <td><button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editUserModel">Edit</button></td>
                    <td><button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteUserModel">Delete</button></td>
                </tr>`
    })

    tableBody.innerHTML = innerRows;
}

// save data to localStorage
// let submit = () => {
//     let name = document.getElementById("username").value;
//     let email = document.getElementById("email").value;
//     let password = document.getElementById("password").value;

//     let users = JSON.parse(localStorage.getItem('users'));
    
//     if(users){
//         users.push({email, name, password});
//         localStorage.setItem("users", JSON.stringify(users));
//     }else{
//         let users = [];
//         users.push({email, name, password});
//         localStorage.setItem("users", JSON.stringify(users));
//     }
//     document.getElementById("name").value = "";
//     document.getElementById("email").value = "";
//     document.getElementById("password").value = "";
//     alert("User added Succesfully")
// }
