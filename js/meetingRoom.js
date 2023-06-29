// Meeting Room Screen
let meetingRoomButton = document.getElementById("roomButton");
var meetingRooms = [];
var roomId;

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
            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addRoomModel" onclick="changeHtmlRoom()">Add Room</button>
        </div>
        ${
            meetingRooms.length > 0 ? `<div style="overflow: auto">
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
                                        <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addRoomModel" onclick="getDataToUpdateRoom(${item.room_id})">Edit</button></td>
                                        <td><button type="button" class="btn btn-outline-danger" onclick="deleteRoom(${item.room_id})">Delete</button></td>
                
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
                                                        item.roomSlots ? `<div style="overflow: auto">
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

const changeHtmlRoom = () => {
    document.getElementById("addRoomTitle").innerHTML = "Add Room";
  
    document.getElementById("addRoomId").value = "";
    document.getElementById("addRoomName").value = "";
    document.getElementById("roomCapacity").value = "";
  };

// Add Room
let submitRoom = () => {
    if (roomId) {
        updateRoom();
        return;
      }
    let room_code = document.getElementById("addRoomId").value;
    let room_name = document.getElementById("addRoomName").value;
    let capacity = document.getElementById("roomCapacity").value;
    const data = {
        room_code,
        room_name,
        capacity
    }

    if (
        !room_code &&
        !room_name &&
        !capacity
      ) {
        alert("Please, Fill all Field");
      } else {
        axios
          .post("http://localhost:8080/rooms/add", data)
          .then((res) => {
            alert(res.data.message);
            setTimeout(() => {
              location.reload();
            }, 1000);
          });
      }
}

// delete Room
const deleteRoom = (deleteRoomId) => {
    axios
    .delete(`http://localhost:8080/rooms/delete/${deleteRoomId}`)
    .then((res) => {
      alert(res.data.message);
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
}

const getDataToUpdateRoom = (id) => {
    roomId = id;
    document.getElementById("addRoomTitle").innerHTML = "Update Room"
    const room = meetingRooms.filter((item) => item.room_id == id)[0];

    document.getElementById("addRoomId").value = room.room_code;
    document.getElementById("addRoomName").value = room.room_name;
    document.getElementById("roomCapacity").value = room.capacity;
};

// Edit User
const updateRoom = () => {
let room_code = document.getElementById("addRoomId").value;
let capacity = document.getElementById("roomCapacity").value;
let room_name = document.getElementById("addRoomName").value;
const data = {
    room_code,
    room_name,
    capacity
}

if (
    !room_code &&
    !room_name &&
    !capacity
) {
    alert("Please, Fill all Field");
} else {
    const id = roomId;
    axios
    .put(`http://localhost:8080/rooms/update/${id}`, data)
    .then((res) => {
        alert(res.data.message);
        setTimeout(() => {
        location.reload();
        }, 1000);
    });
}
roomId = null;
};


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
