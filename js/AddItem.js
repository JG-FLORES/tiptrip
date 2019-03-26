$(document).ready(function(){

  $("#outputImg1").hide();
  $("#outputImg2").hide();
  $("#outputImg3").hide();
  $("#addNewC-S").hide();

  optionItemSelected();

});

var UrlImage1 = "";
var UrlImage2 = "";
var UrlImage3 = "";
var newCountry = "";
var newState = "";

var aceptAddC_S = false;

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

var loadFile1 = function(event) { 
  var storageRef = firebase.storage().ref('imagenes/' + event.target.files[0].name);

  var task = storageRef.put(event.target.files[0]);

  task.on('state_changed', 
    function progess(snapshot){

      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      // uploader.value = progress

      $("#uploader1").width(progress+"%")
      
      // $("#uploader1").html(progress+"%");

      if (progress == 100) {
        $("#uploader1").html("100%");
        $( "#uploader1" ).removeClass("progress-bar-animated");  
        $( "#uploader1" ).removeClass("progress-bar-striped");
      }    
    },
    function error(err){

      alert("No se pudo subir la Imagen");

    },
    function complete(){
      
      task.snapshot.ref.getDownloadURL().then((url)=>{
       
        UrlImage1 = url;

        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('outputImg1');
          output.src = url;
        };
        reader.readAsDataURL(event.target.files[0]);

      });
      $("#outputImg1").show();
    }
  );
};

var loadFile2 = function(event) { 
  var storageRef = firebase.storage().ref('imagenes/' + event.target.files[0].name);

  var task = storageRef.put(event.target.files[0]);

  task.on('state_changed', 
    function progess(snapshot){

      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      // uploader.value = progress
      $("#uploader2").width(progress+"%")
     
      // $("#uploader2").html(progress+"%");
      if (progress == 100) {
        $("#uploader2").html("100%");
        $( "#uploader2" ).removeClass("progress-bar-animated");  
        $( "#uploader2" ).removeClass("progress-bar-striped");
      }    
    },
    function error(err){

      alert("No se pudo subir la Imagen");

    },
    function complete(){
      
      task.snapshot.ref.getDownloadURL().then((url)=>{
        
        UrlImage2 = url;

        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('outputImg2');
          output.src = url;
        };
        reader.readAsDataURL(event.target.files[0]);

      });
      $("#outputImg2").show();
    }
  );
};

var loadFile3 = function(event) {

  var storageRef = firebase.storage().ref('imagenes/' + event.target.files[0].name);

  var task = storageRef.put(event.target.files[0]);

  task.on('state_changed', 
    function progess(snapshot){

      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      $("#uploader3").width(progress+"%")
     
      // $("#uploader3").html(progress+"%");
      if (progress == 100) {
        $("#uploader3").html("100%");
        $( "#uploader3" ).removeClass("progress-bar-animated");  
        $( "#uploader3" ).removeClass("progress-bar-striped");
        
      }    
    },
    function error(err){

      alert("No se pudo subir la Imagen");

    },
    function complete(){
     
      task.snapshot.ref.getDownloadURL().then((url)=>{
        
        UrlImage3 = url;

        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('outputImg3');
          output.src = url;
        };
        reader.readAsDataURL(event.target.files[0]);

      });
       $("#outputImg3").show();
    }
  );
};


function getId(id) {
  return $('#'+id+'').val();
}


$("#frmPlace").submit(function(e){

  e.preventDefault();

  var optionItemSelected = getId("optionItem");

  var title = getId("title");
  var description = getId("description");
  var latitude = getId("latitude");
  var longitude = getId("longitude");
  var typepin = "typeFour";
  var rating = getId("rating");

  var country = getId("country");
  var state = getId("state");
  var municipality = getId("municipality");

  if (optionItemSelected == "Pais") {
    country = ""
    state = ""
    municipality = ""
  }
  if (optionItemSelected == "Estado") 
  {
    state = ""
    municipality = ""
  } 
  if (optionItemSelected == "Municipio"){
    municipality = ""
  }

  // var colony = getId("colony");
  var urlimage1 = UrlImage1;
  var urlimage2 = UrlImage2;
  var urlimage3 = UrlImage3;

  // tips
  var tip1 = getId("tip1");
  var tip2 = getId("tip2");
  var tip3 = getId("tip3");
  var tip4 = getId("tip4");
  var tip5 = getId("tip5");

  insertNewPlace(country, state, municipality, title, description, latitude, longitude, rating, typepin, urlimage1, urlimage2, urlimage3, tip1, tip2, tip3, tip4, tip5);
 
});


function insertNewPlace(country, state, municipality, title, description, latitude, longitude, rating, typepin, urlimage1, urlimage2, urlimage3, tip1, tip2, tip3, tip4, tip5) {


  var optionItemSelected = getId("optionItem");

  var arrayItems = [];
  // item to arrayItems
  if (tip1.length > 0) {
    arrayItems.push(tip1);
  }
  if (tip2.length > 0) {
    arrayItems.push(tip2);
  }
  if (tip3.length > 0) {
    arrayItems.push(tip3);
  }
  if (tip4.length > 0) {
    arrayItems.push(tip4);
  }
  if (tip5.length > 0) {
    arrayItems.push(tip5);
  }

  if (optionItemSelected == "Pais"){

    firebase.database().ref('places-items/pines/Rojos/'+title).set({
      descriptionPlace: description,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude), 
      name: title,
      rating: parseFloat(rating),
      tipsArray: arrayItems,
      typePin: typepin,
      urlImage1: urlimage1,
      urlImage2: urlimage2,
      urlImage3: urlimage3
      }, function(error) {
        if (error) {
          alert("Write Failed Place...");
        } else {
          $("#modalSavedsuccessfully").modal('show');        
        }
      }); 
  } 
  if (optionItemSelected == "Estado"){

    firebase.database().ref('places-items/pines/Rojos/'+country+'/States/'+title).set({
      descriptionPlace: description,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude), 
      name: title,
      rating: parseFloat(rating),
      tipsArray: arrayItems,
      typePin: typepin,
      urlImage1: urlimage1,
      urlImage2: urlimage2,
      urlImage3: urlimage3
      }, function(error) {
        if (error) {
          alert("Write Failed Place...");
        } else {
          $("#modalSavedsuccessfully").modal('show');        
        }
    }); 
  } 
  if (optionItemSelected == "Municipio"){

    firebase.database().ref('places-items/pines/Rojos/'+country+'/States/'+state+'/Municipalities/'+title).set({
      descriptionPlace: description,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude), 
      name: title,
      rating: parseFloat(rating),
      tipsArray: arrayItems,
      typePin: typepin,
      urlImage1: urlimage1,
      urlImage2: urlimage2,
      urlImage3: urlimage3
      }, function(error) {
        if (error) {
          alert("Write Failed Place...");
        } else {
          $("#modalSavedsuccessfully").modal('show');        
        }
    }); 
  }

  if (optionItemSelected == "Colonia"){
    
    firebase.database().ref('places-items/pines/Rojos/'+country+'/States/'+state+'/Municipalities/'+municipality+'/Colonies/'+title).set({
      descriptionPlace: description,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude), 
      name: title,
      rating: parseFloat(rating),
      tipsArray: arrayItems,
      typePin: typepin,
      urlImage1: urlimage1,
      urlImage2: urlimage2,
      urlImage3: urlimage3
      }, function(error) {
        if (error) {
          alert("Write Failed Place...");
        } else {
          $("#modalSavedsuccessfully").modal('show');        
        }
    }); 
  } 
}

function optionItemSelected(){
  
  var item = getId("optionItem");

  if (item == "Pais") {
    $("#country").prop('disabled', true);
    $("#state").prop('disabled', true);
    $("#municipality").prop('disabled', true);

    $('#country').empty();
    $('#state').empty();
    $('#municipality').empty();


    $("#description").attr("placeholder","Descripcion del pais");
    $("#title").attr("placeholder","Nombre del pais");
  }

  if (item == "Estado") {
    $("#country").removeAttr("disabled");
    
    $('#state').empty();
    $('#municipality').empty();

    $("#state").prop('disabled', true);
    $("#municipality").prop('disabled', true);

    $("#description").attr("placeholder","Descripcion del estado");
    $("#title").attr("placeholder","Nombre del estado");

    searchCountry();
  } 

  if (item == "Municipio") {
    $("#country").removeAttr("disabled");
    $("#state").removeAttr("disabled");

    $('#municipality').empty();

    $("#municipality").prop('disabled', true);

    $("#description").attr("placeholder","Descripcion del municipio");
    $("#title").attr("placeholder","Nombre del municipio");

    searchCountry();
  } 

  if (item == "Colonia") {

    $("#country").removeAttr("disabled");
    $("#state").removeAttr("disabled");
    $("#municipality").removeAttr("disabled");

    $("#description").attr("placeholder","Descripcion de la colonia");
    $("#title").attr("placeholder","Nombre de la colonia");

    searchCountry();
  }
}

function searchCountry(){

  $('#country').empty();
  $("#country").append("<option disabled='true' selected='true'>Select country</option>")

  // Fill select Countries in option with Firebase
    var rootRefCountry = firebase.database().ref();
    var urlRefCountry = rootRefCountry.child("places-items/pines/Rojos");
    urlRefCountry.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        $("#country").append('<option value="'+child.key+'">'+child.key+'</option>');
      });
    });
}

function searchStates(){

  var optionItemSelected = getId("optionItem");

  if (optionItemSelected != "Estado") {
    $("#state").empty();
    $("#state").append("<option disabled='true' selected='true'>Select state</option>")
    var countrySelected = getId("country");

    // Fill select States for Country selected in option with Firebase
    var rootRefState = firebase.database().ref();
    var urlRefState = rootRefState.child("places-items/pines/Rojos/"+countrySelected+"/States");
    urlRefState.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        $("#state").append('<option value="'+child.key+'">'+child.key+'</option>');
      });
    });
  }
}

function searchMunicipality(){

  var optionItemSelected = getId("optionItem");

  if (optionItemSelected != "Municipio") {

      $("#municipality").empty();
      $("#municipality").append("<option disabled='true' selected='true'>Select municipality</option>")
      var countrySelected = getId("country");
      var stateSelected = getId("state");


      var rootRefState = firebase.database().ref();
      var urlRefState = rootRefState.child("places-items/pines/Rojos/"+countrySelected+"/States/"+stateSelected+"/Municipalities");
      urlRefState.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
          // console.log("for key"+child.key);
          $("#municipality").append('<option value="'+child.key+'">'+child.key+'</option>');
        });
      });
  }
}


