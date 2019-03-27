
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


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // console.log(user);
    window.location.href = "index.html"
    // ...
  } else {
    // User is signed out.
    // console.log("User is signed out.");
    // window.location.href = "login.html"
  }
});


$("#frmLogin").submit(function(e){

	e.preventDefault();
	$("#lblEmail").addClass('invisible');
	$("#lblPass").addClass('invisible');

	$("#password").removeClass('is-invalid form-control');
	$("#email").removeClass('is-invalid form-control');
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	// [START_EXCLUDE]
	if (errorCode === 'auth/wrong-password') {
	  // is-invalid form-control
	  $("#password").addClass('is-invalid form-control');
	  $("#lblPass").removeClass('invisible');
	  // $("#lblPass").append("Wrong password.");
	} else {
	  $("#email").addClass('is-invalid form-control');
	  $("#lblEmail").removeClass('invisible');
	  // $("#lblEmail").append(errorMessage);
	  // alert(errorMessage);
	}
	// console.log(error);
	// document.getElementById('quickstart-sign-in').disabled = false;
	// [END_EXCLUDE]
	});
});
