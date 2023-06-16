// Function to toggle dropdown for add meeting
$(document).ready(function () {
  $("#myBtn").click(function () {
    console.log("test");
    $("#addMeetingModal").modal("show");
  });
});
$(".modal .close").click(function () {
  $(this).closest(".modal").modal("hide");
});
//gemerate datepicker
$(document).ready(function () {
  // Initialize the date picker
  $("#datepicker").datepicker({
    dateFormat: "dd-mm-yy", // Set the date format to yyyy-mm-dd
    minDate: 0, // Set the minimum selectable date as today
  });
  // Clear the date picker field
  $("#datepicker").val("");
});

var dashboardScreen = document.getElementById("dashboardScreen");
var screenContent = document.getElementById("screenContent");

dashboardScreen.style.display = "block";

if ((dashboardScreen.style.display = "block")) {
  var isContentVisible = true;
}

screenContent.addEventListener("click", function (event) {
  if (isContentVisible) {
    screenContent.style.display = "block";
    isContentVisible = true;
  } else {
    dashboardScreen.style.display = "block";
    isContentVisible = false;
  }
});

dashboardScreen.addEventListener("click", function (event) {
  if (isContentVisible) {
    dashboardScreen.style.display = "block";
    isContentVisible = true;
  } else {
    screenContent.style.display = "block";
    isContentVisible = false;
  }
});

// Data array for meetingforApproval meetings
var meetingsForApprovalData = [
  {
    no: 1,
    meetingTitle: "g",
    room: "A2",
    dateofMeeting: "06/15/2023",
    clockInTime: "15:30",
    clockOutTime: "15:30",
  },
];
// Get the table body reference
var approvalDataBody = document.getElementById("approvalData");
function generateRowsforApprovalMeeting() {
  // Generate the table rows dynamically
  meetingsForApprovalData.forEach(function (data) {
    var row = document.createElement("tr");
    var noCell = document.createElement("td");
    noCell.textContent = data.no;
    row.appendChild(noCell);
    var meetingTitleCell = document.createElement("td");
    meetingTitleCell.textContent = data.meetingTitle;
    row.appendChild(meetingTitleCell);
    var roomCell = document.createElement("td");
    roomCell.textContent = data.room;
    row.appendChild(roomCell);
    var roomDayCell = document.createElement("td");
    roomDayCell.textContent = data.dateofMeeting;
    row.appendChild(roomDayCell);
    var clockInTimeCell = document.createElement("td");
    clockInTimeCell.textContent = data.clockInTime;
    row.appendChild(clockInTimeCell);
    var clockOutTimeCell = document.createElement("td");
    clockOutTimeCell.textContent = data.clockOutTime;
    row.appendChild(clockOutTimeCell);
    var actionCell = document.createElement("td");
    var approveButton = document.createElement("button");
    approveButton.setAttribute("type", "button");
    approveButton.style.margin = "8px";
    approveButton.style.padding = "8px 18px";
    approveButton.style.borderRadius = "4px";
    approveButton.style.fontSize = "14px";
    approveButton.style.textAlign = "center";
    approveButton.style.color = "#fff";
    approveButton.style.cursor = "pointer";
    approveButton.style.transition = "background-color 0.3s ease";
    approveButton.style.backgroundColor = "green";
    approveButton.setAttribute("id", "editBtn");
    approveButton.textContent = "Approve";
    approveButton.addEventListener("click", function () {
      $("#approveRoomModal").modal("show");
    });

    var declineButton = document.createElement("button");
    declineButton.style.margin = "8px";
    declineButton.style.padding = "8px 18px";
    declineButton.style.borderRadius = "4px";
    declineButton.style.fontSize = "14px";
    declineButton.style.textAlign = "center";
    declineButton.style.color = "#fff";
    declineButton.style.cursor = "pointer";
    declineButton.style.transition = "background-color 0.3s ease";
    declineButton.style.backgroundColor = "red";
    declineButton.textContent = "Decline";

    declineButton.addEventListener("click", function () {
      $("#declineRoomModal").modal("show");
    });

    var cancelApproveBtn = document.getElementById("cancelAppproveMeeting");
    var confirmApproveBtn = document.getElementById("approveMeeting");
    confirmApproveBtn.addEventListener("click", function () {
      upcomingMeetingData.push(...meetingsForApprovalData);
      saveDataToLocalStorage();
      generateRows();
      $("#approveRoomModal").modal("hide");
    });
    cancelApproveBtn.addEventListener("click", function () {
      $("#approveRoomModal").modal("hide");
    });
    var cancelDeclineBtn = document.getElementById("cancelDeclineMeeting");
    var confirmEmailDeclineButton = document.getElementById(
      "confirmDeclineMeeting"
    );

    confirmEmailDeclineButton.addEventListener("click", function () {
      var cancelReason = document.getElementById("cancelReason").value;
      Email.send({
        Host: "smtp.elasticemail.com",
        Username: "pawan.sahu@gmail.com",
        Password: "0D98FA4BC759E4FF8434DDC48E7360564E0A",
        To: "vaishali.mandloi@averybit.in",
        From: "sahu.pawan2001@gmail.com",
        Subject: "Regarding Meeting Cancellation",
        Body: cancelReason,
      }).then((message) => alert(message));

      console.log("mail sent");
      $("#declineRoomModal").modal("hide");
    });

    cancelDeclineBtn.addEventListener("click", function () {
      $("#declineRoomModal").modal("hide");
    });
    actionCell.appendChild(approveButton);
    actionCell.appendChild(declineButton);
    row.appendChild(actionCell);
    approvalDataBody.appendChild(row);
  });
}
generateRowsforApprovalMeeting();
// Data array for upcoming meetings
var upcomingMeetingData = [];
// Get the table body reference
var roomDataBody = document.getElementById("roomData");
function generateRows() {
  roomDataBody.innerHTML = ""; // Clear existing rows
  // Generate the table rows dynamically
  upcomingMeetingData.forEach(function (data) {
    var row = document.createElement("tr");
    var noCell = document.createElement("td");
    noCell.textContent = data.no;
    row.appendChild(noCell);
    var meetingTitleCell = document.createElement("td");
    meetingTitleCell.textContent = data.meetingTitle;
    row.appendChild(meetingTitleCell);
    var roomCell = document.createElement("td");
    roomCell.textContent = data.room;
    row.appendChild(roomCell);
    var roomDayCell = document.createElement("td");
    roomDayCell.textContent = data.dateofMeeting;
    row.appendChild(roomDayCell);
    var clockInTimeCell = document.createElement("td");
    clockInTimeCell.textContent = data.clockInTime;
    row.appendChild(clockInTimeCell);
    var clockOutTimeCell = document.createElement("td");
    clockOutTimeCell.textContent = data.clockOutTime;
    row.appendChild(clockOutTimeCell);
    var actionCell = document.createElement("td");
    var editButton = document.createElement("button");

    editButton.setAttribute("type", "button");

    editButton.setAttribute("class", "btn btn-success");

    editButton.classList.add("m-2");

    editButton.setAttribute("id", "editBtn");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", function () {
      var noToUpdate = data.no;
      $("#editModal").modal("show");

      // Pre-fill the modal with the room data for editing

      var editModalMeetingTitle = document.getElementById(
        "editModalMeetingTitle"
      );
      var editModalRoom = document.getElementById("editModalRoom");
      var editModalDate = document.getElementById("editModalDate");
      var editModalClockInTime = document.getElementById(
        "editModalClockInTime"
      );
      var editModalClockOutTime = document.getElementById(
        "editModalClockOutTime"
      );

      // Retrieve the data from localStorage
      var upcomingMeetingData = JSON.parse(
        localStorage.getItem("upcomingMeetingData")
      );

      // Find the object with the matching 'no' value
      var meetingToEdit = upcomingMeetingData.find(function (meeting) {
        return meeting.no === noToUpdate;
      });

      console.log("test up", meetingToEdit);
      if (meetingToEdit) {
        // Pre-fill the modal fields with the meeting data
        $("#editModalMeetingTitle").val(meetingToEdit.meetingTitle);
        $("#editModalRoom").val(meetingToEdit.room);
        $("#editModalDate").val(meetingToEdit.dateofMeeting);
        $("#editModalClockInTime").val(meetingToEdit.clockInTime);
        $("#editModalClockOutTime").val(meetingToEdit.clockOutTime);

        // Update the meeting data with the new values
        upcomingMeetingData.meetingTitle = editModalMeetingTitle.value;
        upcomingMeetingData.room = editModalRoom.value;
        upcomingMeetingData.dateofMeeting = editModalDate.value;
        upcomingMeetingData.clockInTime = editModalClockInTime.value;
        upcomingMeetingData.clockOutTime = editModalClockOutTime.value;
      }

      var saveEditBtn = document.getElementById("saveEditBtn");

      saveEditBtn.addEventListener("click", function () {
        event.preventDefault();

        // Update the meeting data with the new values
        meetingToEdit.meetingTitle = editModalMeetingTitle.value;
        meetingToEdit.room = editModalRoom.value;
        meetingToEdit.dateofMeeting = editModalDate.value;
        meetingToEdit.clockInTime = editModalClockInTime.value;
        meetingToEdit.clockOutTime = editModalClockOutTime.value;

        localStorage.setItem(
          "upcomingMeetingData",
          JSON.stringify(upcomingMeetingData)
        );

        generateRows();

        generateRows();
        $("#editModal").modal("hide");
        location.reload();
      });
    });

    var deleteButton = document.createElement("button");

    deleteButton.setAttribute("type", "button");

    deleteButton.setAttribute("class", "btn btn-danger delete-button");

    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      var noToDelete = data.no; // Retrieve the 'no' value from the current row's data
      console.log("test id ", noToDelete);
      $("#deleteRoomModal").modal("show");
      var confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
      confirmDeleteBtn.addEventListener("click", function () {
        generateRows();
        // Retrieve the data from localStorage
        var upcomingMeetingData = JSON.parse(
          localStorage.getItem("upcomingMeetingData")
        );
        // Filter the data to exclude the object with the matching 'no' value
        upcomingMeetingData = upcomingMeetingData.filter(function (meeting) {
          return meeting.no !== noToDelete;
        });
        generateRows();
        console.log("test up", upcomingMeetingData);
        localStorage.setItem(
          "upcomingMeetingData",
          JSON.stringify(upcomingMeetingData)
        );
        // saveDataToLocalStorage();
        generateRows();
        $("#deleteRoomModal").modal("hide");
        location.reload();
      });
      generateRows();
    });
    var cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
    cancelDeleteBtn.addEventListener("click", function () {
      $("#deleteRoomModal").modal("hide");
    });
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    roomDataBody.appendChild(row);
  });
}
generateRows();
// Load the data from local storage if available
var upcomingMeetingData =
  JSON.parse(localStorage.getItem("upcomingMeetingData")) || [];
// Function to save the data to local storage
function saveDataToLocalStorage() {
  localStorage.setItem(
    "upcomingMeetingData",
    JSON.stringify(upcomingMeetingData)
  );
}
// Handle form submission to add a new room
var addRoomForm = document.getElementById("addRoomForm");
addRoomForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  var meetingTitleInput = document.getElementById("meetingTitle");
  var roomInput = document.getElementById("roomType");
  var dateInput = document.getElementById("datepicker");
  var clockInTimeInput = document.getElementById("clockInTime");
  var clockOutTimeInput = document.getElementById("clockOutTime");

  var meetingTitle = meetingTitleInput.value;
  var room = roomInput.value;
  var dateofMeeting = dateInput.value;
  var clockInTime = clockInTimeInput.value;
  var clockOutTime = clockOutTimeInput.value;

  // Generate a unique ID for the new room
  var serialNumber = upcomingMeetingData.length + 1;
  // Add the new room to the dummyData array
  upcomingMeetingData.push({
    no: serialNumber,
    meetingTitle: meetingTitle,
    room: room,
    dateofMeeting: dateofMeeting,
    clockInTime: clockInTime,
    clockOutTime: clockOutTime,
  });
  // Save the data to local storage
  saveDataToLocalStorage();
  // Clear the form inputs
  meetingTitleInput.value = "";
  roomInput.value = "";
  dateInput.value = "";
  clockInTimeInput.value = "";
  clockOutTimeInput.value = "";
  // Generate the updated table rows
  generateRows();
  // Hide the modal
  $("#addMeetingModal").modal("hide");
});
generateRows();

$(document).ready(function () {
  // Initialize the date picker
  $("#dashboardButton").click(function () {
    location.reload()
  });
});