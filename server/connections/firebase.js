// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { BUCKET_URL } from "../config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-xHMqe6_imQ7dxk3awS9V5TtfujvyaZg",
  authDomain: "phamd-aa4ef.firebaseapp.com",
  projectId: "phamd-aa4ef",
  storageBucket: "phamd-aa4ef.appspot.com",
  messagingSenderId: "528601072493",
  appId: "1:528601072493:web:554fb7752288d399ee9064",
  measurementId: "G-8T9231Y8QW",
  storageBucket: BUCKET_URL
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

const storage = getStorage();

const uploadImage = (name, file) => {
    const storageRef = ref(storage, 'images/' + name);
    
    uploadBytes(ref, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            return downloadURL;
        });
    }).catch((err) => {
        return err;
    })
}

export { uploadImage };