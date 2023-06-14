// Function to toggle dropdown for add meeting

$(document).ready(function () {
  $("#myBtn").click(function () {
    console.log('test')
    $("#addMeetingModal").modal("show");
  });
});

$('.modal .close').click(function () {
  $(this).closest('.modal').modal('hide');
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



// Data array for meetingforApproval meetings
var meetingsForApprovalData = [{
  no: 1, meetingTitle: "g", room: "A2", dateofMeeting: "06/15/2023", clockInTime: "15:30", clockOutTime
    :
    "15:30"

}];

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
    approveButton.setAttribute("class", "edit-button");
    approveButton.setAttribute("id", "editBtn");
    approveButton.textContent = "Approve";

    approveButton.addEventListener("click", function () {
      $("#approveRoomModal").modal("show");

    });

    var declineButton = document.createElement("button");
    declineButton.setAttribute("class", "delete-button");
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
    var confirmDeclineButton = document.getElementById("confirmDeclineMeeting");

    confirmDeclineButton.addEventListener("click", function () {
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
    editButton.setAttribute("class", "edit-button");
    editButton.setAttribute("id", "editBtn");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", function () {
      $("#editModal").modal("show");
      // You can add logic here to pre-fill the modal with the room data for editing
    });

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      $("#deleteRoomModal").modal("show");
    });

    var cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

    var confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

    confirmDeleteBtn.addEventListener("click", function () {
      $("#deleteRoomModal").modal("hide");
    });
    cancelDeleteBtn.addEventListener("click", function () {
      $("#deleteRoomModal").modal("hide");
    });

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    roomDataBody.appendChild(row);
  });
}

// Load the data from local storage if available
var upcomingMeetingData = JSON.parse(localStorage.getItem("upcomingMeetingData")) || [];

// Function to save the data to local storage
function saveDataToLocalStorage() {
  localStorage.setItem("upcomingMeetingData", JSON.stringify(upcomingMeetingData));
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
    clockOutTime: clockOutTime
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











