document
  .getElementById("addDestinationForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const image = document.getElementById("image").value;
    const entryFee = document.getElementById("entryFee").value;
    const category = document.getElementById("category").value;

    // Prepare the destination object
    const destinationData = {
      name,
      description,
      location,
      image,
      entryFee: parseFloat(entryFee),
      category,
    };

    try {
      // Send the data to your backend API
      const response = await fetch(
        "http://localhost:5000/api/destinations/destinations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(destinationData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add destination");
      }

      const result = await response.json();
      alert("Destination added successfully!");
      this.reset(); 
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error adding the destination.");
    }
  });
