import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyABPdqDX141shx15TYaTK06iMNBFgyonBg",
    authDomain: "login-c9742.firebaseapp.com",
    projectId: "login-c9742",
    storageBucket: "login-c9742.firebasestorage.app",
    messagingSenderId: "755962182191",
    appId: "1:755962182191:web:cd7e7757b7936f0ee1e4da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Display Greeting based on Time
const greeting = document.getElementById('greeting');
const hours = new Date().getHours();
if (hours < 12) {
    greeting.textContent = "Good Morning!";
} else if (hours < 18) {
    greeting.textContent = "Good Afternoon!";
} else {
    greeting.textContent = "Good Evening!";
}

// Fetch and Display Posts
const postsContainer = document.getElementById('posts-container');

window.onload = function() {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("timestamp", "desc"));

    onSnapshot(q, (snapshot) => {
        postsContainer.innerHTML = ""; // Clear previous posts

        snapshot.forEach((doc) => {
            const post = doc.data();
            const postHTML = `
                <div class="post">
                    <h3>${post.title}</h3>
                    <p><em>By: ${post.username}</em></p>
                    <p><strong>Published:</strong> ${new Date(post.timestamp.seconds * 1000).toLocaleString()}</p>
                    <p>${post.description}</p>
                    <button onclick="viewPostDetails('${doc.id}')">View Details</button>
                </div>
            `;
            postsContainer.innerHTML += postHTML;
        });
    });
};

// Redirect to post details page
function viewPostDetails(postId) {
    // Here you can redirect to a page showing the detailed post, or open a modal
    window.location.href = `post-details.html?id=${postId}`;
}
