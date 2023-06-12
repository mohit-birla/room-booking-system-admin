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







 