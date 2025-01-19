// Predefined array of image paths

const images = [
  "./image/Destination_img1.png",
  "./image/Destination_img2.png",
  "./image/Destination_img3.png",
];

// Fetch destinations data from the backend API
async function fetchDestinations() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/destinations/destinations"
    ); // Make sure to call the backend API
    if (!response.ok) {
      throw new Error("Failed to fetch destinations");
    }
    const destinations = await response.json();

    // Get the container for the destination cards
    const destinationContainer = document.getElementById(
      "destination-container"
    );
    destinationContainer.innerHTML = ""; // Clear any existing content

    // Loop through the fetched destinations and create HTML content
    destinations.forEach((destination) => {
      // Randomly select an image from the images array
      const randomImage = images[Math.floor(Math.random() * images.length)];

      const destinationCard = document.createElement("div");
      destinationCard.classList.add("row", "mb-4");

      destinationCard.innerHTML = `
        <div class="col-12 col-sm-4 col-md-3 container-fluid">
          <img
            src="${randomImage}"
            alt="Image of ${destination.name}"
            class="img-fluid destination-card it"
          />
        </div>
        <div class="col-12 col-sm-8 col-md-9">
          <h2 class="fs-4">${destination.name}</h2>
          <p>${destination.description}</p>
          <p><strong>Location:</strong> ${destination.location}</p>
          <p><strong>Entry Fee:</strong> ${destination.entryFee}</p>
        </div>
      `;

      // Append the card to the destination container
      destinationContainer.appendChild(destinationCard);
    });
  } catch (error) {
    console.error("Error fetching destinations:", error);
    const destinationContainer = document.getElementById(
      "destination-container"
    );
    destinationContainer.innerHTML =
      "<p>Failed to load destinations. Please try again later.</p>";
  }
}

// Call the function to fetch and display destinations on page load
document.addEventListener("DOMContentLoaded", fetchDestinations);
