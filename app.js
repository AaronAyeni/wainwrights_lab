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

// Function to create and display Wainwrights as list items
function displayWainwrights(wainwrights) {
    const list = document.getElementById("wainwrights-list");
    list.innerHTML = ""; // Clear the current list

    // Loop through each Wainwright and create list items
    wainwrights.forEach(wainwright => {
        const listItem = document.createElement("li"); // Create a list item element
        listItem.innerHTML = `
            <h2>${wainwright.name}</h2>
            <p><strong>Height:</strong> ${wainwright.height}m</p>
            <p><strong>Area:</strong> ${wainwright.area}</p>
        `; // Set the inner HTML with Wainwright details
        list.appendChild(listItem); // Append the list item to the list
    });
}
// Function to handle the form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const filterValue = document.getElementById("filter-input").value.toLowerCase(); // Get the input value and convert to lowercase
    console.log("Filter value:", filterValue); // Log the filter value to the console

    // Filter the Wainwrights based on the input value
    const filteredWainwrights = allWainwrights.filter(wainwright =>
        wainwright.name.toLowerCase().includes(filterValue)
    );
    displayWainwrights(filteredWainwrights); // Display the filtered Wainwrights
}
