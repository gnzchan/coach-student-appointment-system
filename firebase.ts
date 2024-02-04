// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp_wt_7gg-cEmoCfINVmkrpBqoVhd3kuQ",
  authDomain: "coach-student-scheduler.firebaseapp.com",
  projectId: "coach-student-scheduler",
  storageBucket: "coach-student-scheduler.appspot.com",
  messagingSenderId: "558767902240",
  appId: "1:558767902240:web:161fff706ab6caee3c3645",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };
