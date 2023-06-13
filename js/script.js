const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach(item => {
  const li = item.parentElement;

  item.addEventListener("click", function() {
    allSideMenu.forEach(i => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function() {
  sidebar.classList.toggle("hide");
});

// Attach click event listener to profile button
const profileButton = document.getElementById("profileButton");
profileButton.addEventListener("click", toggleDropdown);

// Function to toggle dropdown menu
function toggleDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

// Function to toggle dropdown for add meeting

$(document).ready(function() {
  $("#myBtn").click(function() {
    $("#myModal").modal();
  });
});


// Data array for upcoming meetings
var upcomingMeetingData = [];

// Get the table body reference
var roomDataBody = document.getElementById("roomData");

function generateRows() {
  roomDataBody.innerHTML = ""; // Clear existing rows

  // Generate the table rows dynamically
  upcomingMeetingData.forEach(function(data) {
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

    editButton.addEventListener("click", function() {
      $("#editModal").modal("show");
      // You can add logic here to pre-fill the modal with the room data for editing
    });

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function() {
      $("#deleteRoomModal").modal("show");
      // You can add logic here to pre-fill the modal with the room data for editing
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
addRoomForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  var meetingTitleInput = document.getElementById("meetingTitle");
  var roomInput = document.getElementById("roomType");
  var clockInTimeInput = document.getElementById("clockInTime");
  var clockOutTimeInput = document.getElementById("clockOutTime");

  var meetingTitle = meetingTitleInput.value;
  var room = roomInput.value;
  var clockInTime = clockInTimeInput.value;
  var clockOutTime = clockOutTimeInput.value;

  // Generate a unique ID for the new room
  var serialNumber = upcomingMeetingData.length + 1;

  // Add the new room to the dummyData array
  upcomingMeetingData.push({
    no: serialNumber,
    meetingTitle: meetingTitle,
    room: room,
    clockInTime: clockInTime,
    clockOutTime: clockOutTime
  });


  // Save the data to local storage
  saveDataToLocalStorage();

  // Clear the form inputs
  meetingTitleInput.value = "";
  roomInput.value = "";
  clockInTimeInput.value = "";
  clockOutTimeInput.value = "";

  // Generate the updated table rows
  generateRows();

  // Hide the modal
  $("#myModal").modal("hide");
});

generateRows();






