// Meeting Room Screen

const meetingRoomArray = [
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

let meetingRoomHtml = 
`<div class="m-3 p-3">
    <div class="container d-flex justify-content-between">
        <h3>Meeting Rooms</h3>
        <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addRoomModel">Add Room</button>
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
                meetingRoomArray?.map((item)=>{
                    return `<tr>
                                <th scope="row">${item.id}</th>
                                <td>${item.meetingRoom}</td>
                                <td><button type="button" class="btn btn-info">${item.status}</button></td>
                                <td><button class="btn btn-info" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#${item.id}" aria-expanded="false"
                                    aria-controls="collapseExample">Slots</button></td>
                                <td><button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteRoomModel">Delete</button></td>
        
                            </tr>
                            <tr>
                                <td colspan="5" style="padding: 0">
                                    <div class="collapse" id="${item.id}">
                                        <div>
                                            <div class="container d-flex justify-content-between mt-2">
                                                <h3>Unavailable Slots</h3>
                                                <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addSlotModel">Add Slots</button>

                                            </div>
                                            <div style="overflow: auto">
                                                <table class="table" >
                                                    <thead>
                                                        ${item.slots ? `<tr>
                                                            <th scope="col">Slots</th>
                                                            <th scope="col">Time</th>
                                                            <th scope="col">Delete</th>
                                                        </tr>` : ""}
                                                    </thead>
                                                    <tbody>
                                                    ${
                                                        item.slots ? (item.slots.map((slots)=>{
                                                            return ` <tr>
                                                            <th scope="row">${slots.id}</th>
                                                            <td>${slots.time}</td>
                                                            <td><button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteSlotsModel">Delete</button></td>
                                        
                                                        </tr>`
                                                        })) : "No Unavailable slots"
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>`
                })
            }
            
        </tbody>
    </table>
</div>`

let MeetingRoomScreen = document.getElementById("screenContent");
let meetingRoomButton = document.getElementById("roomButton");


meetingRoomButton.addEventListener("click", () => {
    MeetingRoomScreen.innerHTML = meetingRoomHtml;
})