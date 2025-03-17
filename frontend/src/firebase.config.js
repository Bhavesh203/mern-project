// src/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCnnuSvfznFf9zOGUbNZF5z1A8zADYLQmE",
    authDomain: "e-commerce-747fd.firebaseapp.com",
    projectId: "e-commerce-747fd",
    storageBucket: "e-commerce-747fd.firebasestorage.app",
    messagingSenderId: "442644817988",
    appId: "1:442644817988:web:ddacf1beb0ea3509a53411",
    measurementId: "G-1HF29VD4S0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
