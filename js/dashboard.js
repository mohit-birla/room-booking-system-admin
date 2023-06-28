// Meeting Room Screen
let dashboardButton = document.getElementById("dashboardButton");

var meetings = [];

const getMeetings = () => {
  axios.get("http://localhost:8080/meeting/all").then((res) => {
    meetings = res.data.data;
    dashboardScreen(meetings);
  });
};

window.onload = () => {
  getMeetings();
};

dashboardButton.addEventListener("click", () => {
  dashboardScreen(meetings);
});

// Generate Screen
const dashboardScreen = (meetings) => {
  let dashboardScreen = document.getElementById("screenContent");
  let dashboardScreenHtml = `<div class="w-75 m-3 p-3">
        <div class="container d-flex justify-content-between">
            <h3>Meetings</h3>
            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addMeetingModal">Add Meeting</button>
        </div>
        ${
          meetings.length > 0
            ? `<div style="overflow: auto">
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
                    ${meetings?.map((item) => {
                      return `<tr>
                                        <th scope="row">${item.meeting_id}</th>
                                        <td>${item.meeting_name}</td>
                                        <td>${item.fk_emp_id}</td>
                                        <td>${item.meeting_date.slice(
                                          0,
                                          10
                                        )}</td>
                                        <td>${item.start_time}-${
                        item.end_time
                      }</td>
                                        <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="saveId(${item.meeting_id})">Edit</button></td>
                                        <td><button type="button" class="btn btn-outline-danger" onclick="deleteRoom(${
                                          item.roomId
                                        })">Delete</button></td>
                
                                    </tr>                                `;
                    })}
                    
                </tbody>
            </table>
        </div>`
            : `<div style="text-align: center; margin-top: 10rem"><h5>No Meeting Room</h5></div>`
        }
    </div>`;
  dashboardScreen.innerHTML = dashboardScreenHtml;
};

// Add Meeting
const submitMeeting = () => {
  let meeting_name = document.getElementById("meetingTitle").value;
  let fk_room_id = document.getElementById("roomType").value;
  let meeting_date = document.getElementById("datepicker").value;
  let start_time = document.getElementById("clockInTime").value;
  let end_time = document.getElementById("clockOutTime").value;
  let fk_emp_id = 1;

  if (
    !meeting_name &&
    !fk_room_id &&
    !meeting_date &&
    !start_time &&
    !end_time
  ) {
    alert("Please, Fill all Field");
  } else {
    console.log(meeting_date);
    axios
      .post("http://localhost:8080/meeting/add", {
        meeting_name,
        fk_room_id,
        meeting_date,
        start_time,
        end_time,
        fk_emp_id,
      })
      .then((res) => alert(res.data.message));
  }
  location.reload();
};

//gemerate datepicker
$(document).ready(function () {
  // Initialize the date picker
  $("#datepicker").datepicker({
    dateFormat: "yy-mm-dd", // Set the date format to yyyy-mm-dd
    minDate: 0, // Set the minimum selectable date as today
  });
  // Clear the date picker field
  $("#datepicker").val("");
});

const saveId = (id) => {
  const user = meetings.filter((item)=>item.meeting_id == id)[0];

  document.getElementById("editModalMeetingTitle").value = user.meeting_name
  document.getElementById("editModalRoom").value = user.fk_room_id;
  document.getElementById("editModalDate").value = user.meeting_date.slice(0, 10);
  document.getElementById("editModalClockInTime").value = user.start_time;
  document.getElementById("editModalClockOutTime").value = user.end_time;
}

// Edit Meeting
const updateMeeting = () => {

  let meeting_name = document.getElementById("editModalMeetingTitle").value;
  let fk_room_id = document.getElementById("editModalRoom").value;
  let meeting_date = document.getElementById("editModalDate").value;
  let start_time = document.getElementById("editModalClockInTime").value;
  let end_time = document.getElementById("editModalClockOutTime").value;
  let updated_by = 2;

  if (
    !meeting_name &&
    !fk_room_id &&
    !meeting_date &&
    !start_time &&
    !end_time
  ) {
    alert("Please, Fill all Field");
  } else {
    const id = localStorage.getItem("updateMeetingId");
    axios
      .put(`http://localhost:8080/meeting/update/${id}`, {
        meeting_name,
        fk_room_id,
        meeting_date,
        start_time,
        end_time,
        updated_by,
      })
      .then((res) => alert(res.data.message));
  }
  location.reload();
};