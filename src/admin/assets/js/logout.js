async function logout() {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:3002/api/auth/logout", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear the local storage
        localStorage.removeItem("accessToken");
        // Redirect to sign-in page
        window.location.href = 'sign-in.html';
      } else {
        alert("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }