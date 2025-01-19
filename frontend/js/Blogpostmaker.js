document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("postForm");

  postForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect data from the form
    const postData = {
      title: document.getElementById("title").value.trim(),
      tags: document.getElementById("tags").value.trim(),
      author: document.getElementById("author").value.trim(),
      content: document.getElementById("message").value.trim(),
    };

    // Validate required fields
    if (
      !postData.title ||
      !postData.tags ||
      !postData.author ||
      !postData.content
    ) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Send a POST request to the backend
      const response = await fetch(
        "http://localhost:5000/api/blogPosts/blog-posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert("Post created successfully!");
        postForm.reset(); 
        console.log(result); 
        window.location.href = "/blog.html"; 
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("Failed to create the post:", err);
      alert(
        "An error occurred while creating the post. Please try again later."
      );
    }
  });
});
