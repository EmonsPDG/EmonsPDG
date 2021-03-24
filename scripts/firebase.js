var firebaseConfig = {
    apiKey: "AIzaSyDL-rNYK0pHVnZq-uAAdkXss3PNzfuBJJ8",
    authDomain: "pdg-emons.firebaseapp.com",
    projectId: "pdg-emons",
    storageBucket: "pdg-emons.appspot.com",
    messagingSenderId: "279739295643",
    appId: "1:279739295643:web:b11558eee3c885ef7be33e",
    measurementId: "G-ZY3Z65Q664"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();