console.log("<--system0:5yc0re-->");
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Include credentials in the request
    })
        .then(response => {
            if (response.ok) {
                // If the response is OK (status code 200-299), redirect to the protected page
                window.location.href = '/retroshop';
            } else {
                // If the response is not OK, log the status code
                if (response.status == 401) {
                    alert("Error: Invalid Username & Password")
                } else {
                    let resError = response.status;
                    alert(`Error: ${resError}`);
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});