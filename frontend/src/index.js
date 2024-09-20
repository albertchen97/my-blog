import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	// Public key. Safe to publish on GitHub.
	apiKey: "AIzaSyAhkJfFQTJqpeASw27CMrwSacc_gi1p3l4",
	authDomain: "my-blog-6acd6.firebaseapp.com",
	projectId: "my-blog-6acd6",
	storageBucket: "my-blog-6acd6.appspot.com",
	messagingSenderId: "259869127678",
	appId: "1:259869127678:web:d7600db68e87de70d386af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create a root for rendering React components inside the browswer's DOM 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
