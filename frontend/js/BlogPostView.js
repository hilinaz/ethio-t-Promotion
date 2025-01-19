// Array of locally hosted image paths
const localImages = [
  "./image/Blogimage1.jpg",
  "./image/blogimage2.jpg",
  "./image/blogimage3.jpg",
  "./image/blogimage4.jpg",
];

// Function to fetch posts from the backend API
async function fetchPosts() {
  try {
    // Send a GET request to fetch blog posts from your backend API
    const response = await fetch(
      "http://localhost:5000/api/blogPosts/blog-posts"
    ); // Your API endpoint
    const posts = await response.json();

    // Get the posts container element where we will display posts
    const postsContainer = document.querySelector(".posts");

    if (posts.length === 0) {
      // If there are no posts, do nothing and keep the default posts in the HTML
      return;
    }

    // If posts are available, clear default posts and append the new ones
    postsContainer.innerHTML = ""; // Clear any existing content

    // Loop through the fetched posts and display them
    posts.forEach((post, index) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      // Use the corresponding image from the localImages array or fallback
      const imageUrl =
        localImages[index % localImages.length] ||
        localImages[localImages.length - 1];

      postElement.innerHTML = `
                <img src="${imageUrl}" alt="${post.title}">
                <div class="caption">${post.title}</div>
            `;

      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Call the function to fetch and display posts when the page loads
window.onload = fetchPosts;
