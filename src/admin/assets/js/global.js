function checkUserAuth() {
    const token = localStorage.getItem("accessToken");
    
    // Check if the user is on the sign-in page
    const currentPage = window.location.pathname.split("/").pop(); // Get the current page

    if (!token) {
        console.log("No token found, user needs to sign in.");
        if (currentPage !== "sign-in.html") { // Prevent redirect if already on the sign-in page
            window.location.href = "sign-in.html"; // Redirect to sign-in page
        }
    } else {
        console.log("User is logged in.");
        if (currentPage === "sign-in.html") { // If user is signed in and on the sign-in page
            window.location.href = "dashboard.html"; // Redirect to the dashboard or a protected page
        }
    }
}

document.addEventListener("DOMContentLoaded", checkUserAuth);
