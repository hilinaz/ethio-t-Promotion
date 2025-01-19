// Select the signup form
const signupForm = document.getElementById('signupForm');

// Add a submit event listener
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Collect form data
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic validation
    if (!firstName || !lastName || !username || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Prepare the data to send
    const userData = {
        firstName,
        lastName,
        username,
        email,
        password,
    };

    try {
        // Make the POST request to the API
        const response = await fetch('http://localhost:5000/api/accounts/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Inform the server you're sending JSON data
            },
            body: JSON.stringify(userData), // Convert the user data to a JSON string
        });

        if (response.ok) {
            // If signup is successful, handle the response
            const result = await response.json();
            alert('Signup successful!'); 
            console.log('Response from server:', result);
        } else {
            // Handle errors returned by the API
            const errorData = await response.json();
            alert(`Signup failed: ${errorData.message || 'An error occurred'}`);
            console.error('Error from server:', errorData);
        }
    } catch (error) {
        // Handle network or other unexpected errors
        console.error('Network error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
});
