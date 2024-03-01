// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);

            window.location.href = "http://localhost:3000/index.html";
            event.target.reset();

            if (data.user && data.user.role === 'admin') {
                // If the logged-in user is an admin, show the admin link
                document.getElementById('adminLink').style.display = 'block';
            } else {
                // If the logged-in user is not an admin, hide the admin link
                document.getElementById('adminLink').style.display = 'none';
            }
            
        } else {
            const errorData = await response.json();
            alert(errorData.error);
            console.error('Error:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


// Handle register form submission
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: formData
        });

        if (response.status === 201) {
            const data = await response.json();
            console.log('Success:', data);
            document.getElementById('registerForm').reset();
            window.location.href = "http://localhost:3000/login.html"; 

        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
        }

        
    } catch (error) {
        console.error('Error:', error);
    }
});

