// Meeting Room Screen
let meetingRoomButton = document.getElementById("roomButton");
var meetingRooms = [];

const getRooms = () => {
    axios.get("http://localhost:8080/rooms/all").then((res) => {
        meetingRooms = res.data.data;
        console.log(meetingRooms);
        generateRoomsScreen(meetingRooms);
    });
};

meetingRoomButton.addEventListener("click", () => {
    getRooms();
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
            !isEmpty(meetingRooms) ? `<div style="overflow: auto">
            <table class="table table-bordered mt-2">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Room Name</th>
                        <th scope="col">Short Code</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    ${
                        meetingRooms?.map((item)=>{
                            return `<tr>
                                        <th scope="row">${item.room_id}</th>
                                        <td>${item.room_name}</td>
                                        <td>${item.room_code}</td>
                                        <td>${item.capacity}</td>
                                        <!-- <td><button type="button" class="btn btn-info" id="roomStatus" onclick="changeStatus()">${item.roomStatus}</button></td>-->
                                        <!-- <td><button class="btn btn-info" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#${item.roomId}" aria-expanded="false"
                                            aria-controls="collapseExample">Slots</button></td> -->
                                        <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#updateRoomModel">Edit</button></td>
                                        <td><button type="button" class="btn btn-outline-danger" onclick="deleteRoom(${item.roomId})">Delete</button></td>
                
                                    </tr>
                                    <!-- <tr>
                                        <td colspan="5" style="padding: 0">
                                            <div class="collapse" id="${item.roomId}">
                                                <div>
                                                    <div class="container d-flex justify-content-between mt-2">
                                                        <h3>Unavailable Slots</h3>
                                                        <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addSlotModel" onclick="addSlotFunction(${item.roomId})">Add Slots</button>

                                                    </div>
                                                    ${
                                                        !isEmpty(item.roomSlots) ? `<div style="overflow: auto">
                                                            <table class="table" >
                                                                <thead>
                                                                    ${item.roomSlots ? `<tr>
                                                                        <th scope="col">Slots</th>
                                                                        <th scope="col">Date</th>
                                                                        <th scope="col">Time</th>
                                                                        <th scope="col">Delete</th>
                                                                    </tr>` : ""}
                                                                </thead>
                                                                <tbody>
                                                                ${
                                                                    item.roomSlots ? (item.roomSlots.map((slots)=>{
                                                                        return ` <tr>
                                                                        <th scope="row">${slots.roomSlotId}</th>
                                                                        <td>${slots.roomSlotDate}</td>
                                                                        <td>${slots.roomSlotStartTime} - ${slots.roomSlotEndTime}</td>
                                                                        <td><button type="button" class="btn btn-outline-danger"  onclick="deletSlot(${item.roomId}, ${slots.roomSlotId})">Delete</button></td>
                                                    
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
                                    </tr> -->
                                    `
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

// Emty checker
const isEmpty = (value) => {
    return value === undefined || value === null || value === [];
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
const addSlotFunction = (editRoomId) => {
    localStorage.setItem("editRoomId", editRoomId);
}


const addSlot = () => {
    let roomSlotDate = document.getElementById("roomSlotDate").value;
    let roomSlotStartTime = document.getElementById("roomSlotStartTime").value;
    let roomSlotEndTime = document.getElementById("roomSlotEndTime").value;
    let roomSlotId = document.getElementById("roomSlotId").value;
    let editRoomId = localStorage.getItem("editRoomId");


    if(!roomSlotDate && !roomSlotStartTime && !roomSlotEndTime){
        alert("Please, Fill all Field");
    } else {
        let rooms = JSON.parse(localStorage.getItem('rooms'));

        const roomIndex = rooms.findIndex((room) => room.roomId === editRoomId);
        if (roomIndex !== -1) {
            rooms[roomIndex].roomSlots.push({roomSlotId, roomSlotDate, roomSlotStartTime, roomSlotEndTime});
            localStorage.setItem("rooms", JSON.stringify(rooms));
        
            document.getElementById("roomSlotDate").value = "";
            document.getElementById("roomSlotStartTime").value = "";
            document.getElementById("roomSlotEndTime").value = "";
            alert("Slots added Succesfully")
        } else {
            alert("Someting Went Wrong");
        }
        
        location.reload()
    }
}

// Delete Slot
const deletSlot = (roomId, deleteSlotId) => {
    if (confirm("Are you sure you want to delete this slot?")) {
        let rooms = JSON.parse(localStorage.getItem('rooms'));
        const roomIndex = rooms.findIndex((room) => Number(room.roomId) === roomId);
        rooms[roomIndex].roomSlots.findIndex((slots)=> slots.roomSlotId === deleteSlotId)
        if (roomIndex !== -1) {
            rooms[roomIndex].roomSlots.splice(roomIndex, 1);
            localStorage.setItem("rooms", JSON.stringify(rooms));
            alert("Slot deleted successfully");
        } else {
            alert("Slot not found");
        }
        location.reload();
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

// for calender
$(document).ready(function () {
    // Initialize the date picker
    $("#roomSlotDate").datepicker({
      dateFormat: "dd-mm-yy", // Set the date format to yyyy-mm-dd
      minDate: 0, // Set the minimum selectable date as today
    });
    // Clear the date picker field
    $("#roomSlotDate").val("");
  });

  // change status
  const changeStatus = () => {
    let value = document.getElementById("roomStatus").innerHTML;
    document.getElementById("roomStatus").innerHTML = value == "Available" ? "Unavilable" : "Available"
  }