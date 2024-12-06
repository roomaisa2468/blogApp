import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
const auth = getAuth(app)
auth.languageCode = 'en';
const provider = new GoogleAuthProvider()


// sign-up submit button
const signSubmit = document.getElementById("signup-submit");
signSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    const signEmail = document.getElementById("sign-email").value;
    const signpassword = document.getElementById("sign-password").value;

    createUserWithEmailAndPassword(auth, signEmail, signpassword)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            alert("Account created successfully!"),
            window.location.href= "././postApp"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // alert("Error: " + error.message)
            alert(errorCode)
        })
})
//login-submit button
const loginSubmit = document.getElementById("login-submit");
loginSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;


    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            alert("Login successful!");
             window.location.href= "././postApp"
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // alert("Error: " + error.message)
            alert(errorCode)
        })
});

//sign-in-google
const googleLoginBtn = document.getElementById("google-login-btn");
googleLoginBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(user);
            window.location.href= "../postApp"
            
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
       });
});


// //adding firestore 
// import { 
//     initializeApp 
//   } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
//   import { 
//     getAuth, 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword, 
//     GoogleAuthProvider, 
//     signInWithPopup 
//   } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
//   import { 
//     getFirestore, 
//     collection, 
//     addDoc, 
//     getDocs, 
//     doc, 
//     setDoc, 
//     updateDoc, 
//     serverTimestamp, 
//     arrayUnion, 
//     arrayRemove, 
//     deleteDoc 
//   } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
  
//   // Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyABPdqDX141shx15TYaTK06iMNBFgyonBg",
//     authDomain: "login-c9742.firebaseapp.com",
//     projectId: "login-c9742",
//     storageBucket: "login-c9742.firebasestorage.app",
//     messagingSenderId: "755962182191",
//     appId: "1:755962182191:web:cd7e7757b7936f0ee1e4da"
//   };
  
//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth(app);
//   const db = getFirestore(app);
//   auth.languageCode = 'en';
//   const provider = new GoogleAuthProvider();
  
// //   // Sign-up submit button functionality
// //   const signSubmit = document.getElementById("signup-submit");
// //   signSubmit.addEventListener("click", async (event) => {
// //     event.preventDefault();
  
// //     const signEmail = document.getElementById("sign-email").value;
// //     const signPassword = document.getElementById("sign-password").value;
  
// //     try {
// //       const userCredential = await createUserWithEmailAndPassword(auth, signEmail, signPassword);
// //       const user = userCredential.user;
  
// //       await setDoc(doc(db, "users", user.uid), {
// //         email: signEmail,
// //         timestamp: serverTimestamp(),
// //       });
  
// //       console.log(user);
// //       alert("Account created successfully!");
// //       window.location.href = "././postApp";
// //     } catch (error) {
// //       alert(error.code);
// //     }
// //   });
// // Sign-up functionality
// const signSubmit = document.getElementById("signup-submit");
// signSubmit.addEventListener("click", async (event) => {
//     event.preventDefault();

//     // Get input values
//     const username = document.getElementById("username").value.trim();
//     const signEmail = document.getElementById("sign-email").value.trim();
//     const signPassword = document.getElementById("sign-password").value;
//     const repeatPassword = document.getElementById("repeat-password").value;

//     // Validation: Ensure no fields are empty
//     if (!username || !sign-email || !sign-password || !repeat-password) {
//         alert("All fields are required!");
//         return;
//     }

//     // Validation: Ensure passwords match
//     if (sign-password !== repeat-password) {
//         alert("Passwords do not match!");
//         return;
//     }

//     try {
//         // Create user with email and password
//         const userCredential = await createUserWithEmailAndPassword(auth, sign-email, sign-password);
//         const user = userCredential.user;

//         // Save user data to Firestore
//         await setDoc(doc(db, "users", user.uid), {
//             username,
//             email: signEmail,
//             uid: user.uid,
//             createdAt: serverTimestamp(),
//         });

//         alert("Account created successfully!");
//         console.log("User signed up and data saved:", user);

//         // Redirect to the postApp or dashboard page
//         window.location.href = "././postApp";
//     } catch (error) {
//         // console.error("Signup error:", error);
//         alert(error.code);
//     }
// });
// console.log("Username:", username);
// console.log("Email:", sign-email);
// console.log("Password:", sign-password);
// console.log("Repeat Password:", repeat-password);  

//   // Login submit button functionality
//   const loginSubmit = document.getElementById("login-submit");
//   loginSubmit.addEventListener("click", async (event) => {
//     event.preventDefault();
  
//     const loginEmail = document.getElementById("login-email").value;
//     const loginPassword = document.getElementById("login-password").value;
  
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
//       const user = userCredential.user;
  
//       console.log(user);
//       alert("Login successful!");
//       window.location.href = "././postApp";
//     } catch (error) {
//       alert(error.code);
//     }
//   });
  
//   // Google sign-in button functionality
//   const googleLoginBtn = document.getElementById("google-login-btn");
//   googleLoginBtn.addEventListener("click", async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
  
//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         name: user.displayName,
//         email: user.email,
//         image: user.photoURL,
//         number: user.phoneNumber,
//         timestamp: serverTimestamp(),
//       });
  
//       console.log(user);
//       window.location.href = "././postApp";
//     } catch (error) {
//       alert(error.code);
//     }
//   });
  
//   // Fetch all users from Firestore
//   const getAllUsers = async () => {
//     const querySnapshot = await getDocs(collection(db, "users"));
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} =>`, doc.data());
//     });
//   };
//   getAllUsers();
  
//   // Update profile functionality
//   const updateProfile = async () => {
//     const name = document.getElementById("name").value;
//     const number = document.getElementById("number").value;
//     const userId = auth.currentUser.uid;
  
//     try {
//       const userRef = doc(db, "users", userId);
  
//       await updateDoc(userRef, {
//         name,
//         number,
//         timestamp: serverTimestamp(),
//         class: "10th",
//         subjects: arrayUnion("Urdu"),
//       });
  
//       console.log("Profile updated!");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const updateBtn = document.getElementById("update_btn");
//   updateBtn.addEventListener("click", updateProfile);
  
//   // Delete account functionality
//   const deleteAccount = async () => {
//     const userId = auth.currentUser.uid;
  
//     try {
//       await deleteDoc(doc(db, "users", userId));
//       console.log("Account deleted!");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const deleteBtn = document.getElementById("delete_btn");
//   deleteBtn.addEventListener("click", deleteAccount);
   