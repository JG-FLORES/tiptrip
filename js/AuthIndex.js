
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
    $("#lblEmail").append(user.email);
	  $("#lblName").append(user.displayName);
    var imgProfile = document.getElementById('imgProfile');
    var imgProfileSub = document.getElementById('imgProfileSub');
    imgProfile.src = user.photoURL;
    imgProfileSub.src = user.photoURL;

    // user.updateProfile({
	  // displayName: "Mike",
	  // photoURL: "https://firebasestorage.googleapis.com/v0/b/amole-441d3.appspot.com/o/AdminProfile%2F1200px-Flag_of_Canada.svg.png?alt=media&token=9948a637-1dd6-4956-aaff-6ee2a686b0b4"
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
