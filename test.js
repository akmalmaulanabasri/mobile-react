// Replace these with your Firebase Realtime Database URL and authentication token if needed
const firebaseDatabaseUrl = "YOUR_FIREBASE_DATABASE_URL";
const authToken = "YOUR_AUTHENTICATION_TOKEN";

function fetchDataFromFirebase() {
  fetch(`${firebaseDatabaseUrl}.json?auth=${authToken}`)
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {
      console.error("Error fetching data from Firebase:", error);
    });
}

// Fetch data every second
const fetchInterval = setInterval(fetchDataFromFirebase, 1000);

// To stop fetching data, you can clear the interval when needed
// clearInterval(fetchInterval);
