// Select the login form
const loginForm = document.getElementById('loginForm');

// Add a submit event listener
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Collect user credentials from the form
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic validation to ensure fields are not empty
    if (!email || !password) {
        alert('Please fill in both email and password.');
        return;
    }

    // Prepare the data to send to the API
    const credentials = {
        email,
        password,
    };

    try {
        // Make the POST request to the login API
        const response = await fetch('http://localhost:5000/api/accounts/log-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Inform the server you're sending JSON
            },
            body: JSON.stringify(credentials), // Convert credentials to JSON string
        });

        if (response.ok) {
            // If login is successful, handle the response
            const result = await response.json();
            alert('Login successful! Redirecting...'); 
            console.log('Response from server:', result);

            // Example: Redirect user to the homepage after successful login
            window.location.href = '../../frontend/home-page/index.html'; 
        } else {
            // Handle errors returned by the API
            const errorData = await response.json();
            alert(`Login failed: ${errorData.message || 'Invalid credentials'}`);
            console.error('Error from server:', errorData);
        }
    } catch (error) {
        // Handle network or unexpected errors
        console.error('Network error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
});
