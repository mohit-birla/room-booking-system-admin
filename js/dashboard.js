// Meeting Room Screen
let dashboardButton = document.getElementById("dashboardButton");
var meetings = [
    {
      meeting_id: 13,
      meeting_name: "Sql Meeting",
      start_time: "09:00:00",
      end_time: "09:30:00",
      meeting_date: "2023-06-20T18:30:00.000Z",
      meeting_status: "Approved",
      fk_emp_id: 1,
      fk_room_id: 6,
      updated_at: null,
      updated_by: null,
      created_at: "2023-06-21T04:00:00.000Z",
      is_active: 1
    }
  ]

window.onload = () => {
    dashboardScreen(meetings);
}

dashboardButton.addEventListener("click", () => {
    // meetings = JSON.parse(localStorage.getItem('rooms'));
    dashboardScreen(meetings);
})

// Generate Screen
const dashboardScreen = (meetings) => {
    let dashboardScreen = document.getElementById("screenContent");
    let dashboardScreenHtml = 
    `<div class="w-75 m-3 p-3">
        <div class="container d-flex justify-content-between">
            <h3>Meetings</h3>
            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addMeetingModal">Add Meeting</button>
        </div>
        ${
            !isEmpty(meetings) ? `<div style="overflow: auto">
            <table class="table table-bordered mt-2">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Meeting Title</th>
                        <th scope="col">Booked by</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    ${
                        meetings?.map((item)=>{
                            return `<tr>
                                        <th scope="row">${item.meeting_id}</th>
                                        <td>${item.meeting_name}</td>
                                        <td>${item.fk_emp_id}</td>
                                        <td>${item.meeting_date}</td>
                                        <td>${item.start_time}-${item.end_time}</td>
                                        <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button></td>
                                        <td><button type="button" class="btn btn-outline-danger" onclick="deleteRoom(${item.roomId})">Delete</button></td>
                
                                    </tr>                                `
                        })
                    }
                    
                </tbody>
            </table>
        </div>` : 
        `<div style="text-align: center; margin-top: 10rem"><h5>No Meeting Room</h5></div>`
        }
    </div>` 
    dashboardScreen.innerHTML = dashboardScreenHtml;
}

// // Emty checker
// const isEmpty = (value) => {
//     return value === undefined || value === null || value === [];
// }

// // Add Room
// let submitRoom = () => {
//     let roomId = document.getElementById("roomId").value;
//     let roomName = document.getElementById("roomName").value;
//     if(!roomId && !roomName){
//         alert("Please, Fill all Field");
//     } else {
//         let rooms = JSON.parse(localStorage.getItem('rooms'));
    
//         if(rooms){
//             rooms.push({roomId, roomName, roomStatus:  "Available", roomSlots: [] });
//             localStorage.setItem("rooms", JSON.stringify(rooms));
//         } else{
//             let rooms = [];
//             rooms.push({roomId, roomName, roomStatus:  "Available", roomSlots: [] });
//             localStorage.setItem("rooms", JSON.stringify(rooms));
//         }
//         document.getElementById("roomId").value = "";
//         document.getElementById("roomName").value = "";
//         alert("Room added Succesfully")
//         location.reload()
//     }
// }

// // Add Slot
// const addSlotFunction = (editRoomId) => {
//     localStorage.setItem("editRoomId", editRoomId);
// }


// const addSlot = () => {
//     let roomSlotDate = document.getElementById("roomSlotDate").value;
//     let roomSlotStartTime = document.getElementById("roomSlotStartTime").value;
//     let roomSlotEndTime = document.getElementById("roomSlotEndTime").value;
//     let roomSlotId = document.getElementById("roomSlotId").value;
//     let editRoomId = localStorage.getItem("editRoomId");


//     if(!roomSlotDate && !roomSlotStartTime && !roomSlotEndTime){
//         alert("Please, Fill all Field");
//     } else {
//         let rooms = JSON.parse(localStorage.getItem('rooms'));

//         const roomIndex = rooms.findIndex((room) => room.roomId === editRoomId);
//         if (roomIndex !== -1) {
//             rooms[roomIndex].roomSlots.push({roomSlotId, roomSlotDate, roomSlotStartTime, roomSlotEndTime});
//             localStorage.setItem("rooms", JSON.stringify(rooms));
        
//             document.getElementById("roomSlotDate").value = "";
//             document.getElementById("roomSlotStartTime").value = "";
//             document.getElementById("roomSlotEndTime").value = "";
//             alert("Slots added Succesfully")
//         } else {
//             alert("Someting Went Wrong");
//         }
        
//         location.reload()
//     }
// }

// // Delete Slot
// const deletSlot = (roomId, deleteSlotId) => {
//     if (confirm("Are you sure you want to delete this slot?")) {
//         let rooms = JSON.parse(localStorage.getItem('rooms'));
//         const roomIndex = rooms.findIndex((room) => Number(room.roomId) === roomId);
//         rooms[roomIndex].roomSlots.findIndex((slots)=> slots.roomSlotId === deleteSlotId)
//         if (roomIndex !== -1) {
//             rooms[roomIndex].roomSlots.splice(roomIndex, 1);
//             localStorage.setItem("rooms", JSON.stringify(rooms));
//             alert("Slot deleted successfully");
//         } else {
//             alert("Slot not found");
//         }
//         location.reload();
//     }
// }

// // delete Room
// const deleteRoom = (roomId) => {
//     localStorage.setItem("roomId", roomId);
//     if (confirm("Are you sure you want to delete this room?")) {
//         let rooms = JSON.parse(localStorage.getItem('rooms'));
//         const roomIndex = rooms.findIndex((room) => Number(room.roomId) === roomId);
//         if (roomIndex !== -1) {
//             rooms.splice(roomIndex, 1);
//             localStorage.setItem("rooms", JSON.stringify(rooms));
//             alert("Room deleted successfully");
//         } else {
//             alert("Room not found");
//         }
//         location.reload();
//     }
// }

// // for calender
// $(document).ready(function () {
//     // Initialize the date picker
//     $("#roomSlotDate").datepicker({
//       dateFormat: "dd-mm-yy", // Set the date format to yyyy-mm-dd
//       minDate: 0, // Set the minimum selectable date as today
//     });
//     // Clear the date picker field
//     $("#roomSlotDate").val("");
//   });

//   // change status
//   const changeStatus = () => {
//     let value = document.getElementById("roomStatus").innerHTML;
//     document.getElementById("roomStatus").innerHTML = value == "Available" ? "Unavilable" : "Available"
//   }