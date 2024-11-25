// Simulate fetching user-related charging station data
const stationsList = document.getElementById('stationsList');

function fetchChargingStations() {
    // This function should fetch user-specific data
    // For demonstration, we will mock some data

    const stations = [
        { name: 'Station A', location: 'Downtown', status: 'Available' },
        { name: 'Station B', location: 'City Center', status: 'In Use' },
        { name: 'Station C', location: 'Uptown', status: 'Available' }
    ];

    stations.forEach(station => {
        const stationCard = document.createElement('div');
        stationCard.classList.add('station-card');
        stationCard.innerHTML = `
            <h3>${station.name}</h3>
            <p>Location: ${station.location}</p>
            <p>Status: ${station.status}</p>
        `;
        stationsList.appendChild(stationCard);
    });
}

// Call the fetch function when the page loads
window.onload = fetchChargingStations;

// Handle logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('userLoggedIn'); // Simulate user logout
    window.location.href = 'index.html'; // Redirect to landing page
});
