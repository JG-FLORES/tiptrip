
// Initialize Firebase
var config = {

apiKey: "AIzaSyC28dAntLwKMR4q3BlLH6OlLocitABMdCI",
authDomain: "amole-441d3.firebaseapp.com",
databaseURL: "https://amole-441d3.firebaseio.com",
projectId: "amole-441d3",
storageBucket: "amole-441d3.appspot.com",
messagingSenderId: "813935639249"

// Me Account in Firebase
// apiKey: "AIzaSyB_cPHyAYC4j66GcU4F7cU8gTYpeNFmwEQ",
// authDomain: "amole-87b44.firebaseapp.com",
// databaseURL: "https://amole-87b44.firebaseio.com",
// projectId: "amole-87b44",
// storageBucket: "amole-87b44.appspot.com",
// messagingSenderId: "692612234466"
};
firebase.initializeApp(config);

var user = firebase.auth().currentUser;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user);
    $("#lblEmail").append(user.email);
	  $("#lblName").append(user.displayName);
	  var output = document.getElementById('imgProfile');
    output.src = user.photoURL;

   //  user.updateProfile({
	  // displayName: "JG Flores",
	  // photoURL: "https://firebasestorage.googleapis.com/v0/b/amole-441d3.appspot.com/o/imagenes%2FCODIGO%20FUENTE.png?alt=media&token=380999e2-fa2f-44ec-b5a3-e2028245e6a6"
  	// }).then(function() {
  	//   // Update successful.
  	// }).catch(function(error) {
  	//   // An error happened.
  	// });
  } else {
    // User is signed out.
    console.log("User is signed out.");
    window.location.href = "login.html"
  }
});



function logout(){
  // alert("logout");
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href = "login.html";
  }).catch(function(error) {
    // An error happened.
  });
}
