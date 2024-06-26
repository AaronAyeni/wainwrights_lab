// Global variable to store all Wainwrights data
let allWainwrights = [];

// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Fetch all Wainwrights data when the page loads
    getAllWainwrights();

    // Get the form element and add a submit event listener
    const form = document.getElementById("filter-form");
    form.addEventListener("submit", handleFormSubmit);
});

// Function to fetch all Wainwrights data from the API
function getAllWainwrights() {
    fetch('https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json')
        .then(response => response.json()) // Parse the JSON from the response
        .then(data => {
            allWainwrights = data; // Store the data in the global variable
            displayWainwrights(allWainwrights); // Display all Wainwrights
        })
        .catch(error => console.error('Error fetching data:', error)); // Log any errors
}