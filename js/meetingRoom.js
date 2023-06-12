// Meeting Room Screen
let screenContent = document.getElementById("screenContent");
let meetingRooms = document.getElementById("meetingRooms");

const array = [
    {
        id: 1,
        meetingRoom: "Hall",
        status: "available",
        slots: [
            {
                id: 1,
                time: "5:00 PM - 6:00 PM",
            }, 
            {
                id: 2,
                time: "1:00 PM - 2:00 PM",
            }, 
            {
                id: 3,
                time: "10:00 AM - 11:00 AM",
            },
        ]
    },
    {
        id: 2,
        meetingRoom: "Hall",
        status: "available",
        slots: [
            {
                id: 1,
                time: "5:00 PM - 6:00 PM",
            }, 
            {
                id: 1,
                time: "1:00 PM - 2:00 PM",
            }, 
            {
                id: 1,
                time: "10:00 AM - 11:00 AM",
            },
        ]
    },
    {
        id: 3,
        meetingRoom: "Hall",
        status: "available",
        slots: null
    },
]

let html = 
`<div class="container ">
    <div class="container d-flex justify-content-between">
        <h3>Meeting Rooms</h3>
        <button type="button" class="btn btn-primary">Add Room</button>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Meeting Rooms</th>
                <th scope="col">Status</th>
                <th scope="col">Slots</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            ${
                array?.map((item)=>{
                    return `<tr>
                                <th scope="row">${item.id}</th>
                                <td>${item.meetingRoom}</td>
                                <td><button type="button" class="btn btn-primary">${item.status}</button></td>
                                <td><button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#${item.id}" aria-expanded="false"
                                    aria-controls="collapseExample">Slots</button></td>
                                <td><button type="button" class="btn btn-outline-danger">Delete</button></td>
        
                            </tr>
                            <tr>
                                <td colspan="5" style="padding: 0">
                                    <div class="collapse" id="${item.id}">
                                        <div>
                                            <div class="container d-flex justify-content-between">
                                                <h3>Unavailable Slots</h3>
                                                <button type="button" class="btn btn-primary">Add Slots</button>

                                            </div>
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Slots</th>
                                                        <th scope="col">Time</th>
                                                        <th scope="col">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                ${
                                                    item.slots?.map((slots)=>{
                                                        return ` <tr>
                                                        <th scope="row">${slots.id}</th>
                                                        <td>${slots.time}</td>
                                                        <td><button type="button" class="btn btn-outline-danger">Delete</button></td>
                                    
                                                    </tr>`
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>`
                })
            }
            
        </tbody>
    </table>
</div>`

console.log(screenContent)
meetingRooms.addEventListener("click", () => {
    screenContent.innerHTML = html;
    console.log("runned")
})