
(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC28dAntLwKMR4q3BlLH6OlLocitABMdCI",
    authDomain: "amole-441d3.firebaseapp.com",
    databaseURL: "https://amole-441d3.firebaseio.com",
    projectId: "amole-441d3",
    storageBucket: "amole-441d3.appspot.com",
    messagingSenderId: "813935639249"

    
    // apiKey: "AIzaSyB_cPHyAYC4j66GcU4F7cU8gTYpeNFmwEQ",
    // authDomain: "amole-87b44.firebaseapp.com",
    // databaseURL: "https://amole-87b44.firebaseio.com",
    // projectId: "amole-87b44",
    // storageBucket: "amole-87b44.appspot.com",
    // messagingSenderId: "692612234466"
  };
  firebase.initializeApp(config);

  var dbRef = firebase.database().ref().child('places-items/pines/Rojos/México/Puebla'); 

  dbRef.on('value', snap => console.log(snap.val()));


}());