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
    fetch('https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.jso')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON from the response
    })
    .then(data => {
        allWainwrights = data; // Store the data in the global variable
        displayWainwrights(allWainwrights); // Display all Wainwrights
        document.getElementById("status-message").innerText = ""; // Clear the status message
    })
    .catch(error => {
        console.error('Error fetching data:', error); // Log the error
        document.getElementById("status-message").innerText = "Error fetching data. Please try again later."; // Display error message
    });
}

// Function to create and display Wainwrights as list items
function displayWainwrights(wainwrights) {
    const list = document.getElementById("wainwrights-list");
    list.innerHTML = ""; // Clear the current list

    // Loop through each Wainwright and create list items
    wainwrights.forEach(wainwright => {
        const listItem = document.createElement("li"); // Create a list item element

        // Access the properties
        const name = wainwright.name;
        const heightMetres = wainwright.heightMetres; 
        const heightFeet = wainwright.heightFeet;
        const areaName = wainwright.area.areaName; 

        // Set the inner HTML with Wainwright details
        listItem.innerHTML = `
            <h2>${name}</h2>
            <p><strong>Height:</strong> ${heightMetres}m (${heightFeet}ft)</p>
            <p><strong>Area:</strong> ${areaName}</p>
        `; 
        list.appendChild(listItem); // Append the list item to the list
    });
}
// Function to handle the form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const filterValue = document.getElementById("filter-input").value.toLowerCase(); // Get the input value and convert to lowercase
    console.log("Filter value:", filterValue); // Log the filter value to the console
    // Show filtering status message
    document.getElementById("status-message").innerText = "Filtering Wainwrights...";
    
    // Introduce an artificial delay before filtering
    setTimeout(() => {
        filterWainwrights(filterValue); // Call the filter function with the filter/input value
        
        // Clear the status message
        document.getElementById("status-message").innerText = "";
    }, 1000); // 1 second delay

    // Filter the Wainwrights based on the input value
    function filterWainwrights(filter) {
        const filteredWainwrights = allWainwrights.filter(wainwright => 
            wainwright.name.toLowerCase().includes(filter) ||
            wainwright.area.areaName.toLowerCase().includes(filter)
        ); // Filter the Wainwrights based on the name or area name
        displayWainwrights(filteredWainwrights); // Display the filtered Wainwrights
    }
}


