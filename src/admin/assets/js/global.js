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
            window.location.href = "users.html"; // Redirect to the dashboard or a protected page
        }
    }
}
function setActiveLink() {
    const activePage = localStorage.getItem('activePage');

    // Select all sidebar links
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        // Check if the link's data-page matches the active page
        if (link.dataset.page === activePage) {
            link.classList.add('active', 'bg-gradient-primary'); // Add active class
        }

        // Add click event to each link to update local storage
        link.addEventListener('click', () => {
            localStorage.setItem('activePage', link.dataset.page);
        });
    });
}

// Call the function on page load
window.onload = setActiveLink;

document.addEventListener("DOMContentLoaded", checkUserAuth,setActiveLink);
