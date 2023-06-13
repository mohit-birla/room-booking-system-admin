// Users Screen
const array = [
    {
        id: 1,
        name: "Raftar",
    },
    {
        id: 2,
        name: "Honey",

    },
    {
        id: 3,
        name: "Mustang",
    },
]

let html = `
<div class="container ">
    <div class="container d-flex justify-content-between">
        <h3>Users</h3>
        <div class="input-group w-50">
            <input type="text" class="form-control" placeholder="Search User" aria-label="Search User" aria-describedby="button-addon2">
            <button class="btn btn-outline-primary" type="button" id="button-addon2">Search</button>
        </div>
        <td><button type="button" class="btn btn-primary">Add User</button></td>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            ${
                array.map((usr)=>{
                   return `<tr>
                        <th scope="row">${usr.id}</th>
                        <td>${usr.name}</td>
                        <td><button type="button" class="btn btn-primary">Edit</button></td>
                        <td><button type="button" class="btn btn-outline-danger">Delete</button></td>
                    </tr>`
                })
            }
        </tbody>
    </table>
</div>
`
// Getting screen element for change
let screenContent = document.getElementById("screenContent");

// Getting button for adding event listner
let users = document.getElementById("users");

users.addEventListener("click", () => {
    // changing content on click
    screenContent.innerHTML = html;
})