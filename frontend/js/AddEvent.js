document
  .getElementById("addEventForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      title: document.getElementById("title").value,
      content: document.getElementById("content").value,
      author: document.getElementById("author").value,
      category: document.getElementById("category").value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/events/event", {
        // Update API URL if needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Event added successfully!");
        document.getElementById("addEventForm").reset();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add the event. Please try again.");
    }
  });
