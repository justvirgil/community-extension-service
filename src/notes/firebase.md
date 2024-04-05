If you're already using npm and a module bundler such as webpack or Rollup, you can run the following command to install the latest SDK (Learn more):
npm install firebase

Then, initialize Firebase and begin using the SDKs for the products you'd like to use.

<script setup>
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfDkqgqg-MbfkieM6_wreb58ILwFD5hQU",
  authDomain: "ces-cms-usc.firebaseapp.com",
  databaseURL: "https://ces-cms-usc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ces-cms-usc",
  storageBucket: "ces-cms-usc.appspot.com",
  messagingSenderId: "832395927864",
  appId: "1:832395927864:web:5241b7554a8b737819a1cd"
};

// Initialize Firebase
initializeApp(firebaseConfig);
</script>

If you don't use build tools, use this option to add and use the Firebase JS SDK. Use this option to get started, but it's not recommended for production apps. Learn more.

Copy and paste these scripts into the bottom of your <body> tag, but before you use any Firebase services:

<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAfDkqgqg-MbfkieM6_wreb58ILwFD5hQU",
    authDomain: "ces-cms-usc.firebaseapp.com",
    databaseURL: "https://ces-cms-usc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ces-cms-usc",
    storageBucket: "ces-cms-usc.appspot.com",
    messagingSenderId: "832395927864",
    appId: "1:832395927864:web:5241b7554a8b737819a1cd"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>


#08743c = green
and white, yellow = #e0bc1c