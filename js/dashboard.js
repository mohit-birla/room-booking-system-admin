// Meeting Room Screen
var loggedInAdminId;
let dashboardButton = document.getElementById("dashboardButton");
var meetingId;
var userNameForMeeting = [];
var meetings = [];
var roomsForMeetings = [];
var meetingIdtoDeleteMeeting;

let toastMessage = document.getElementById("toastBody");
let toastBody = document.getElementById("toastToShowMessage");

const getMeetings = () => {
  axios.get("http://10.0.0.13:8080/meeting/all").then((res) => {
    meetings = res.data.data;
  });
  axios.get("http://10.0.0.13:8080/profile/all").then((res) => {
    userNameForMeeting = res.data.data;
    dashboardScreen(meetings);
  });
};

let logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("loggedInAdminId");
  location.reload();
});

window.onload = () => {
  loggedInAdminId = localStorage.getItem("loggedInAdminId");
  if (loggedInAdminId) {
    getMeetings();
    getRoomsForAddMeeting();
  } else {
    location.replace("../index.html");
  }
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
            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addMeetingModal" onclick="changeMeetingHtml()">Add Meeting</button>
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
                      let meetingCreater = userNameForMeeting.filter(
                        (u) => u.emp_id == item.fk_emp_id
                      );
                      return `<tr>
                                <th scope="row">${item.meeting_id}</th>
                                <td>${item.meeting_name}</td>
                                <td>${meetingCreater[0].name}</td>
                                <td>${item.meeting_date.slice(0, 10)}</td>
                                <td>${item.start_time}-${item.end_time}</td>
                                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addMeetingModal" onclick="saveId(${
                                  item.meeting_id
                                })">Edit</button></td>
                                <td><button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteMeetingModal" onclick="deleteMeetingIdSaver(${
                                  item.meeting_id
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

const deleteMeetingIdSaver = (id) => {
  meetingIdtoDeleteMeeting = id;
};

const getRoomsForAddMeeting = () => {
  axios.get("http://10.0.0.13:8080/rooms/all").then((res) => {
    roomsForMeetings = res.data.data;
  });
};

const changeMeetingHtml = () => {
  document.getElementById("addMeetingTitle").innerHTML = "Add Meeting";
  document.getElementById("hideParticipants").classList.remove("d-none");

  const selectParticipants = userNameForMeeting.map((item) => {
    return `<option value="${item.email}">${item.name}</option>`;
  });

  const selectRooms = roomsForMeetings.map((item) => {
    return `<option value="${item.room_id}">${item.room_name}</option>`;
  });

  document.getElementById("addMeetingParticipents").innerHTML =
    selectParticipants;

  document.getElementById("roomType").innerHTML = selectRooms;
  document.getElementById("meetingTitle").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("clockInTime").value = "";
  document.getElementById("clockOutTime").value = "";
};

// Add Meeting
const submitMeeting = () => {
  if (meetingId) {
    updateMeeting();
    return;
  }
  let meeting_name = document.getElementById("meetingTitle").value;
  let fk_room_id = document.getElementById("roomType").value;
  let meeting_date = document.getElementById("datepicker").value;
  let start_time = document.getElementById("clockInTime").value;
  let end_time = document.getElementById("clockOutTime").value;

  let participant = document.getElementById("addMeetingParticipents");
  var selectedParticipant = [...participant.selectedOptions].map(
    (option) => option.value
  );

  let mailPeople = "";
  for (let i = 0; i < selectedParticipant.length; i++) {
    if (i + 1 == selectedParticipant.length) {
      mailPeople += `${selectedParticipant[i]}`;
    } else {
      mailPeople += `${selectedParticipant[i]}, `;
    }
  }

  console.log(mailPeople);

  let fk_emp_id = loggedInAdminId;
  const data = {
    meeting_name,
    fk_room_id,
    meeting_date,
    start_time,
    end_time,
    fk_emp_id,
  };

  let mailBody = `
  Meeting scheduled :-
  Title : ${meeting_name},
  Date : ${meeting_date},
  Time : ${start_time}-${end_time},
  `;

  if (
    !meeting_name ||
    !fk_room_id ||
    !meeting_date ||
    !start_time ||
    !end_time
  ) {
    toastMessage.innerHTML = "Please fill all field";
    toastBody.classList.add("show");
  } else {
    axios.post("http://10.0.0.13:8080/meeting/add", data).then((res) => {
      if (res.data.success) {
        sendEmailToParti(mailPeople, mailBody);
      }
      toastMessage.innerHTML = res.data.message;
      toastBody.classList.add("show");
      // setTimeout(() => {
      //   location.reload();
      // }, 1000);
    });
  }
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
  document.getElementById("hideParticipants").classList.add("d-none");
  meetingId = id;
  document.getElementById("addMeetingTitle").innerHTML = "Update Meeting";
  const meet = meetings.filter((item) => item.meeting_id == id)[0];

  const selectRooms = roomsForMeetings.map((item) => {
    return `<option value="${item.room_id}">${item.room_name}</option>`;
  });

  document.getElementById("meetingTitle").value = meet.meeting_name;
  document.getElementById("roomType").innerHTML = selectRooms;
  document.getElementById("datepicker").value = meet.meeting_date.slice(0, 10);
  document.getElementById("clockInTime").value = meet.start_time;
  document.getElementById("clockOutTime").value = meet.end_time;
};

// Edit Meeting
const updateMeeting = () => {
  let meeting_name = document.getElementById("meetingTitle").value;
  let fk_room_id = document.getElementById("roomType").value;
  let meeting_date = document.getElementById("datepicker").value;
  let start_time = document.getElementById("clockInTime").value;
  let end_time = document.getElementById("clockOutTime").value;
  let updated_by = 2;
  const data = {
    meeting_name,
    fk_room_id,
    meeting_date,
    start_time,
    end_time,
    updated_by,
  };

  if (
    !meeting_name ||
    !fk_room_id ||
    !meeting_date ||
    !start_time ||
    !end_time
  ) {
    toastMessage.innerHTML = "Please fill all field";
    toastBody.classList.add("show");
  } else {
    const id = meetingId;
    axios
      .put(`http://10.0.0.13:8080/meeting/update/${id}`, data)
      .then((res) => {
        toastMessage.innerHTML = res.data.message;
        toastBody.classList.add("show");
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
  }
  meetingId = null;
};

const deleteMeeting = () => {
  deleteID = meetingIdtoDeleteMeeting;
  axios
    .delete(`http://10.0.0.13:8080/meeting/delete/${deleteID}`)
    .then((res) => {
      toastMessage.innerHTML = res.data.message;
      toastBody.classList.add("show");
      setTimeout(() => {
        location.reload();
      }, 2000);
    });
};

const sendEmailToParti = (userEmail, msg) => {
  console.log("runned");
  console.log(userEmail);
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "sumit.vishwakarma@averybit.in",
    Password: "B5817F36815288F5FC9E97DABA161074033F",
    To: `${userEmail}`,
    From: "sumit.vishwakarma@averybit.in",
    Subject: "Meeting Scheduled",
    Body: msg,
  }).then(function (message) {
    // alert("mail sent successfully")
  });
};

let span = document.querySelector(".changeSvg2");
span.addEventListener('click', ()=>{
  let passfield = document.getElementById("password");
  let type = passfield.getAttribute("type");
  let changedType = type === "password" ? "text" : "password";
  passfield.setAttribute("type", changedType)

  span.innerHTML = type == "password" ? 
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
  </svg>` : 
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
  </svg>`
})