// Meeting Room Screen
let meetingRoomButton = document.getElementById("roomButton");
var meetingRooms;

meetingRoomButton.addEventListener("click", () => {
    meetingRooms = JSON.parse(localStorage.getItem('rooms'));
    generateRoomsScreen(meetingRooms);
})

// Generate Screen
const generateRoomsScreen = (meetingRooms) => {
    let meetingRoomScreen = document.getElementById("screenContent");
    let meetingRoomHtml = 
    `<div class="w-75 m-3 p-3">
        <div class="container d-flex justify-content-between">
            <h3>Meeting Rooms</h3>
            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addRoomModel">Add Room</button>
        </div>
        ${
        meetingRooms ? `<div style="overflow: auto">
            <table class="table table-bordered mt-2">
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
                        meetingRooms?.map((item)=>{
                            return `<tr>
                                        <th scope="row">${item.roomId}</th>
                                        <td>${item.roomName}</td>
                                        <td><button type="button" class="btn btn-info">${item.roomStatus}</button></td>
                                        <td><button class="btn btn-info" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#${item.roomId}" aria-expanded="false"
                                            aria-controls="collapseExample">Slots</button></td>
                                        <td><button type="button" class="btn btn-outline-danger" onclick="deleteRoom(${item.roomId})">Delete</button></td>
                
                                    </tr>
                                    <tr>
                                        <td colspan="5" style="padding: 0">
                                            <div class="collapse" id="${item.roomId}">
                                                <div>
                                                    <div class="container d-flex justify-content-between mt-2">
                                                        <h3>Unavailable Slots</h3>
                                                        <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addSlotModel" id="${item.roomId}">Add Slots</button>

                                                    </div>
                                                    ${
                                                        item.roomSlots > 0 ? `<div style="overflow: auto">
                                                            <table class="table" >
                                                                <thead>
                                                                    ${item.roomSlots ? `<tr>
                                                                        <th scope="col">Slots</th>
                                                                        <th scope="col">Time</th>
                                                                        <th scope="col">Delete</th>
                                                                    </tr>` : ""}
                                                                </thead>
                                                                <tbody>
                                                                ${
                                                                    item.roomSlots ? (item.roomSlots.map((slots)=>{
                                                                        return ` <tr>
                                                                        <th scope="row">${slots.id}</th>
                                                                        <td>${slots.time}</td>
                                                                        <td><button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteSlotsModel">Delete</button></td>
                                                    
                                                                    </tr>`
                                                                    })) : "No Unavailable slots"
                                                                }
                                                                </tbody>
                                                            </table>
                                                        </div>` : `<div style="text-align: center;"><h5>No Unavailabe Slots</h5></div>`
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                    </tr>`
                        })
                    }
                    
                </tbody>
            </table>
        </div>` : 
        `<div style="text-align: center; margin-top: 10rem"><h5>No Meeting Room</h5></div>`
        }
    </div>` 
    meetingRoomScreen.innerHTML = meetingRoomHtml;
}

// Add Room
let submitRoom = () => {
    let roomId = document.getElementById("roomId").value;
    let roomName = document.getElementById("roomName").value;
    if(!roomId && !roomName){
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

// Add Slot
// Incomplete
const addSlot = () => {
    let roomSlotDate = document.getElementById("roomSlotDate").value;
    let roomSlotStartTime = document.getElementById("roomSlotStartTime").value;
    let roomSlotEndTime = document.getElementById("roomSlotEndTime").value;

    if(!roomSlotDate && !roomSlotStartTime && !roomSlotEndTime){
        alert("Please, Fill all Field");
    } else {
        let rooms = JSON.parse(localStorage.getItem('rooms'));
    
        if(rooms.roomSlots){
            rooms.roomSlots.push({roomId, roomName, roomStatus:  "Available", roomSlots: [] });
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

// delete Room
const deleteRoom = (roomId) => {
    localStorage.setItem("roomId", roomId);
    if (confirm("Are you sure you want to delete this room?")) {
        let rooms = JSON.parse(localStorage.getItem('rooms'));
        const roomIndex = rooms.findIndex((room) => Number(room.roomId) === roomId);
        if (roomIndex !== -1) {
            rooms.splice(roomIndex, 1);
            localStorage.setItem("rooms", JSON.stringify(rooms));
            alert("Room deleted successfully");
        } else {
            alert("Room not found");
        }
        location.reload();
    }
}
