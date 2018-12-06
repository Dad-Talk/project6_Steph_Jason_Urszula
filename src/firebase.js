import firebase from "firebase"

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDYKO4NUxYv7mh4EbS01NqnHd7BvVj38l4",
    authDomain: "project-6-1f870.firebaseapp.com",
    databaseURL: "https://project-6-1f870.firebaseio.com",
    projectId: "project-6-1f870",
    storageBucket: "project-6-1f870.appspot.com",
    messagingSenderId: "959955144530"
};
firebase.initializeApp(config);
// export default firebase;

// Exports auth module and Google auth provider
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;