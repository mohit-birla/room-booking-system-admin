// Users Screen
var usersArray; 
let usersButton = document.getElementById("usersButton");

usersButton.addEventListener("click", () => {
    usersArray = JSON.parse(localStorage.getItem('rooms'));
    generateUsersScreen(usersArray);
})

const generateRoomsScreen = (usersArray) => {
    let usersScreen = document.getElementById("screenContent");
    let usersHtml = `
    <div class="w-75 m-3 p-3">
        <div class="input-group d-flex d-sm-none w-100 mb-2">
            <input id="searchValue" onkeyup="searchUser()" type="text" class="  form-control" placeholder="Search User" aria-label="Search User" aria-describedby="button-addon2">
        </div>
        <div class="container d-flex justify-content-between m-0">
            <h3>Users</h3>
            <div class="input-group d-none d-md-flex w-50">
                <input onkeyup="searchUser()" type="text" id="searchValue"  class="form-control" placeholder="Search User" aria-label="Search User" aria-describedby="button-addon2">
                <button class="btn btn-outline-info" type="button" id="searchUser">Search</button>
            </div>
            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addUsersModel">Add User</button>
        </div>
        <div>
        </div>
        ${
            usersArray ?
        `<div style="overflow: auto">
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
        </div>` : `<div style="text-align: center; margin-top: 10rem"><h5>No Meeting Room</h5></div>`
        } 
    </div>
    `
    usersScreen.innerHTML = usersHtml;
}



// Search functionality
const searchUser = () => {
    var value = document.getElementById("searchValue").value
    console.log(value)

    let tableBody = document.getElementById("tableBody");

    let filteredUser = usersArray.filter((item)=>{
        return item.email.toLowerCase().includes(value);
    })

    console.log(filteredUser)

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
// Add Users
let submitUser = () => {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(!username && !email && !password){
        alert("Please, Fill all Field");
    } else {
        let rooms = JSON.parse(localStorage.getItem('rooms'));
    
        if(rooms){
            rooms.push({roomId, roomName, roomStatus:  "Available", roomSlots: [] });
            localStorage.setItem("rooms", JSON.stringify(rooms));
        } else{
            let rooms = [];
            rooms.push({roomId, roomName, roomStatus:  "Available", roomSlots: [] });
            localStorage.setItem("rooms", JSON.stringify(rooms));
        }
        document.getElementById("roomId").value = "";
        document.getElementById("roomName").value = "";
        alert("Room added Succesfully")
        location.reload()
    }
}
