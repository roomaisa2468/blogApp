// Firebase imports
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  deleteDoc, 
  getDoc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABPdqDX141shx15TYaTK06iMNBFgyonBg",
  authDomain: "login-c9742.firebaseapp.com",
  projectId: "login-c9742",
  storageBucket: "login-c9742.firebasestorage.app",
  messagingSenderId: "755962182191",
  appId: "1:755962182191:web:cd7e7757b7936f0ee1e4da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let backgroundImg = null; // To store selected background image
let currentUser  = "User 's Name"; // Replace this with the actual username from your login logic

// Load posts on page load
window.onload = function () {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, orderBy("timestamp", "desc"));

  onSnapshot(q, (snapshot) => {
    const postContainer = document.getElementById("post");
    postContainer.innerHTML = ""; // Clear previous posts

    snapshot.forEach((doc) => {
      const post = doc.data();
      addPostToUI(post.title, post.description, post.backgroundImg, doc.id);
    });
  });
};

// Add new post to Firestore
async function createPost() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (title && description && backgroundImg) {
    try {
      await addDoc(collection(db, "posts"), {
        title,
        description,
        backgroundImg,
        username: currentUser , // Add the username here
        timestamp: new Date(),
      });

      Swal.fire({
        title: "Success",
        text: "Post added successfully.",
        icon: "success",
      });

      resetForm();
    } catch (error) {
      console.error("Error adding post:", error.message);
      Swal.fire("Error", error.message, "error");
    }
  } else {
    Swal.fire("Validation Error", "Please fill all fields and select a background image.", "warning");
  }
}
window.createPost = createPost;
//add post to ui
function addPostToUI(title, description, backgroundImg, docId, username) {
  const postContainer = document.getElementById("post");
  const postHTML = `
    <div class="card p-2 mb-2" data-id="${docId}">
      <div class="card-header"><em>@${username}</em></div> <!-- Display the username here -->
      <div style="background-image: url(${backgroundImg})" class="card-body">
        <blockquote class="blockquote mb-0">
          <p>${title}</p>
          <footer>${description}</footer>
        </blockquote>
      </div>
      <div>
        <button onclick="editPost('${docId}')" class="btn-small">Edit</button>
        <button onclick="deletePost('${docId}')" class="btn-small">Delete</button>
      </div>
    </div>
  `;
  postContainer.innerHTML += postHTML;
}
window.addPostToUI = addPostToUI

// Select background image
document.querySelectorAll(".bg-img").forEach((img) => {
  img.addEventListener("click", (event) => {
    backgroundImg = event.target.src;
    document.querySelectorAll(".bg-img").forEach((img) => img.classList.remove("selectedImg"));
    event.target.classList.add("selectedImg");
  });
});

// Edit post
async function editPost(docId) {
  try {
      const docRef = doc(db, "posts", docId);
      const postSnap = await getDoc(docRef);

      if (postSnap.exists()) {
          const post = postSnap.data();

          // Populate fields
          document.getElementById("title").value = post.title;
          document.getElementById("description").value = post.description;
          backgroundImg = post.backgroundImg;

          // Highlight selected image
          document.querySelectorAll(".bg-img").forEach((img) => {
              img.classList.remove("selectedImg");
              if (img.src === backgroundImg) {
                  img.classList.add("selectedImg");
              }
          });

          // Update button action
          const updateButton = document.getElementById("updateButton");
          if (updateButton) {
              updateButton.textContent = "Update";
              updateButton.onclick = async () => {
                  const updatedTitle = document.getElementById("title").value.trim();
                  const updatedDescription = document.getElementById("description").value.trim();

                  if (updatedTitle && updatedDescription && backgroundImg) {
                      await setDoc(docRef, {
                          title: updatedTitle,
                          description: updatedDescription,
                          backgroundImg,
                          timestamp: new Date(),
                      });

                      Swal.fire("Success", "Post updated successfully.", "success");
                      resetForm();
                  } else {
                      Swal.fire("Error", "All fields are required!", "warning");
                  }
              };
          } else {
              console.error("Update button not found in the DOM.");
          }
      } else {
          Swal.fire("Error", "Post not found.", "error");
      }
  } catch (error) {
      Swal.fire("Error", error.message, "error");
  }
}
window.editPost = editPost;

// Delete post
async function deletePost(docId) {
  try {
    const confirmDelete = await Swal.fire({
      title: "Confirm Delete",
      text: "Are you sure you want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (confirmDelete.isConfirmed) {
      await deleteDoc(doc(db, "posts", docId));
      Swal.fire("Deleted", "Post deleted successfully.", "success");
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
}
window.deletePost = deletePost;

// Reset form
function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  backgroundImg = null;
  document.querySelectorAll(".bg-img").forEach((img) => img.classList.remove("selectedImg"));

  const updateButton = document.getElementById("updateButton");
  updateButton.textContent = "Post";
  updateButton.onclick = createPost;
}
//logout functionality
document.getElementById("logOut").addEventListener("click", async () => {
  try {
    const confirmLogout = await Swal.fire({
      title: "Confirm Logout",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
    });

    if (confirmLogout.isConfirmed) {
      await signOut(auth);
      Swal.fire({
        title: "Logged Out",
        text: "You have been successfully logged out.",
        icon: "success",
      }).then(() => {
        // Redirect to the login page
        window.location.href = "../index.html"; // Adjusted to point outside the postAPP folder
      });
    }
  } catch (error) {
    console.error("Logout Error:", error.message);
    Swal.fire("Error", "Could not log out. Try again later.", "error");
  }
});
