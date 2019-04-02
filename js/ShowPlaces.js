
(function () {
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


  // Data RealTime
  var dbRef = firebase.database().ref().child('places-items'); 
  dbRef.on('value', snap => 
    searchPlace()
  );
  // End Data RealTime

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // console.log(user);
      $("#lblEmail").append(user.email);
      $("#lblName").append(user.displayName);
      var imgProfile = document.getElementById('imgProfile');
      var imgProfileSub = document.getElementById('imgProfileSub');
      imgProfile.src = user.photoURL;
      imgProfileSub.src = user.photoURL;
      // window.location.href = "index.html"
      // ...
    } else {
      // User is signed out.
      console.log("User is signed out.");
      window.location.href = "login.html"
    }
  });

  $("#outputImg1").hide();
  $("#outputImg2").hide();
  $("#outputImg3").hide();

}());


var idDeletePlace = "";
var typePinDelete = "";

$(document).ready(function(){
  
  $("#searchGlobal").hide();
  typePinSelected()
  
  // searchPlace for pines
  desabledSelect();

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


function fillSelectPin(){

  $("#tbAddPlace").empty();

  $("#categorySearch").append("<option disabled='true' selected='true'>Select pin</option>");


   // Fill select TypePines in option with Firebase
    var rootRefPines = firebase.database().ref();
    var urlRefPines = rootRefPines.child("places-items/pines");
    urlRefPines.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        $("#categorySearch").append('<option value="'+child.key+'">Pines '+child.key+'</option>');
      });
    });
}


function desabledSelect(){

  var pinSelected = getId("categorySearch");

  if (pinSelected == "Rojos") {
    $('#countryHidden').show();

   
    searchCountry();
    // searchPlace();
  }else{
    $('#countryHidden').hide();
    $('#stateHidden').hide();
    $('#municipalityHidden').hide();
    $('#colonyHidden').hide();

    searchPlace();
   
  }
}

function searchCountry(){

  $("#tbAddPlace").empty();

  $('#countrySelected').empty();

  $("#countrySelected").append("<option disabled='true' selected='true'>Select country</option>")

  // Fill select Countries in option with Firebase
  var path = "places-items/pines/Rojos";

    var rootRefCountry = firebase.database().ref();
    var urlRefCountry = rootRefCountry.child(path);
    urlRefCountry.once("value", function(snapshot) {
      snapshot.forEach(function(child) {

        $("#countrySelected").append('<option value="'+child.key+'">'+child.key+'</option>');

        var addTable = fillTable(path,child.val().urlImage1, child.key, child.val().descriptionPlace, child.val().rating, child.val().typePin, child.key, "pinRed")

        $("#tbAddPlace").append(addTable);

      });
    });
}

function searchStates(){

  $("#tbAddPlace").empty();

  $("#stateSelected").empty();

  $("#stateSelected").append("<option disabled='true' selected='true'>Select state</option>")


  var countrySelected = getId("countrySelected");

  // Fill select States for Country selected in option with Firebase
  var path = "places-items/pines/Rojos/"+countrySelected+"/States";

  var rootRefState = firebase.database().ref();
  var urlRefState = rootRefState.child(path);
  urlRefState.once("value", function(snapshot) {
    snapshot.forEach(function(child) {      

      $("#stateSelected").append('<option value="'+child.key+'">'+child.key+'</option>');

      var addTable = fillTable(path,child.val().urlImage1, child.key, child.val().descriptionPlace, child.val().rating, child.val().typePin, child.key, "pinRed")

      $("#tbAddPlace").append(addTable);

    });
  });
  $('#stateHidden').show();
  $('#municipalityHidden').hide();
  $('#colonyHidden').hide();
}
function searchMunicipality(){

  $("#tbAddPlace").empty();

  $("#municipalitySelected").empty();

  $("#municipalitySelected").append("<option disabled='true' selected='true'>Select municipalityy</option>")


  var countrySelected = getId("countrySelected");
  var stateSelected = getId("stateSelected");

  // Fill select States for Country selected in option with Firebase
  var path = "places-items/pines/Rojos/"+countrySelected+"/States/"+stateSelected+"/Municipalities"
  var rootRefState = firebase.database().ref();
  var urlRefState = rootRefState.child(path);
  urlRefState.once("value", function(snapshot) {
    snapshot.forEach(function(child) {

      $("#municipalitySelected").append('<option value="'+child.key+'">'+child.key+'</option>');

      var addTable = fillTable(path,child.val().urlImage1, child.key, child.val().descriptionPlace, child.val().rating, child.val().typePin, child.key, "pinRed")

      $("#tbAddPlace").append(addTable);

    });
  });
  $('#municipalityHidden').show();
  $('#colonyHidden').hide();
}
function searchColony(){

  $("#tbAddPlace").empty();

  $("#colonySelected").empty();

  $("#colonySelected").append("<option disabled='true' selected='true'>Select colony</option>")


  var countrySelected = getId("countrySelected");
  var stateSelected = getId("stateSelected");
  var municipalitySelected = getId("municipalitySelected");

  // Fill select States for Country selected in option with Firebase
  var path = "places-items/pines/Rojos/"+countrySelected+"/States/"+
  stateSelected+"/Municipalities/"+municipalitySelected+"/Colonies"

  var rootRefState = firebase.database().ref();
  var urlRefState = rootRefState.child(path);

  urlRefState.once("value", function(snapshot) {
    snapshot.forEach(function(child) {

      $("#colonySelected").append('<option value="'+child.key+'">'+child.key+'</option>');

      var addTable = fillTable(path,child.val().urlImage1, child.key, child.val().descriptionPlace, child.val().rating, child.val().typePin, child.key, "pinRed")

      $("#tbAddPlace").append(addTable);

    });
  });
  $('#colonyHidden').show();
}
function searchPlace(){

  $("#tbAddPlace").empty();

  var countrySelected = getId("countrySelected");
  var stateSelected = getId("stateSelected");
  var municipalitySelected = getId("municipalitySelected");
  var colonySelected = getId("colonySelected");

  var categorySearchSelected = getId("categorySearch");

  if (categorySearchSelected == "Rojos"){

    var path = "places-items/pines/Rojos/"+countrySelected+"/States/"+
    stateSelected+"/Municipalities/"+municipalitySelected+"/Colonies/"+colonySelected+"/Places";

    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child(path);
    urlRef.once("value", function(snapshot) {      
      snapshot.forEach(function(child) {
        
        var addTable = fillTable(path,child.val().urlImage1, child.val().name, child.val().descriptionPlace, child.val().rating, child.val().typePin, child.key, "pinRed")

        $("#tbAddPlace").append(addTable);
      });
    });

  }
  if(categorySearchSelected == "123"){

    var path = "places-items/pines/123";

    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child(path);
    urlRef.once("value", function(snapshot) {      
      snapshot.forEach(function(child) {

        var addTable = fillTable(path,child.val().urlImage1, child.val().name, child.val().descriptionPlace, child.val().rating, child.val().typePin, child.key, "pin123")

        $("#tbAddPlace").append(addTable);
      });
    });
  }
}
function fillTable(path, urlImage1, name, descriptionPlace, rating, typepin,idPlace, type){ 

  // var obj = JSON.parse(value["name"]);
  
  // console.log(obj)
  var table = '<tr class="tr-shadow">'+ 
      '<td>'+
        '<div align="center">'+
          '<img src="'+urlImage1+'" style="border-radius: 60px; width: 120px; height:120px"/>'+
          '<br>'+name+
        '</div>'+
      '</td>'+
      '<td class="text-justify">'+descriptionPlace+'</td>'+
      '<td style="width:20px">'+rating+'</td>'+
      '<td style=""> <div align="center"><img src="images/typePines/'+typepin+'.png" style="border-radius: 25px; width: 50px; height:50px;"/></div></td>'+
      '<td>'+
          '<div class="table-data-feature">'+
            '<button class="item" data-toggle="tooltip" data-placement="top" title="Editar" onclick="getPlace('+"'"+path+"'"+","+"'"+idPlace+"'"+')">'+
              '<i class="zmdi zmdi-edit" data-toggle="modal" data-target="#modalUpdatePlace"></i>'+
            '</button>'+
            '<button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" onclick="deletePlace('+"'"+idPlace+"'"+","+"'"+type+"'"+')">'+
              '<i class="zmdi zmdi-delete"></i>'+
            '</button>'+
            '<button class="item" data-toggle="tooltip" data-placement="top" title="Mas">'+
              '<i class="zmdi zmdi-more"></i>'+
            '</button>'+
          '</div>'+
      '</td>'+
  '</tr>'+
  '<tr class="spacer">'+
  '</tr>';

  // console.log(table)
  
  return table
}

function getId(id) {
  return $('#'+id+'').val();
}

// disabled select Country and State
function typePinSelected(){
  var typepin = getId("typePin");

  if (typepin != "typeFour"){
    $("#country").prop('disabled', true);
    $("#state").prop('disabled', true);
  }else{
    $("#country").removeAttr("disabled");
    $("#state").removeAttr("disabled");
  }
}

function deletePlace(idPlace, typedelete){
  idDeletePlace = idPlace;
  typePinDelete = typedelete;
  // console.log(typedelete)
  $("#modalDeletePlace").modal("show");

}

function aceptDeletePlace(){
  if (typePinDelete == "pinRed") {

    var countrySelected = getId("countrySelected");
    var stateSelected = getId("stateSelected");
    var municipalitySelected = getId("municipalitySelected");
    var colonySelected = getId("colonySelected");

    var path = 'places-items/pines/Rojos/'+countrySelected+'/States/'+
    stateSelected+'/Municipalities/'+municipalitySelected+'/Colonies/'+colonySelected+'/Places/'+idDeletePlace;

    var adaRef = firebase.database().ref(path);

    // alert(stateSelected)
    adaRef.remove()
      .then(function() {
        alert("Remove succeeded.");

        idDeletePlace = "";
      })
      .catch(function(error) {
        alert("Remove failed: " + error.message)
    });
  }

  if (typePinDelete == "pin123") {
    var adaRef = firebase.database().ref('places-items/pines/123/'+idDeletePlace);
    adaRef.remove()
      .then(function() {
        console.log("Remove succeeded.");

        idDeletePlace = "";
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
    });
  } 
}

function getPlace(path, idPlace){

  // console.log(path+"/"+idPlace)
  var Items = [];
  
  var rootRef = firebase.database().ref();
  var urlRef = rootRef.child(path+"/"+idPlace);
  urlRef.once("value", function(snapshot) {      
    snapshot.forEach(function(child) {
      console.log(child.val());
      Items.push(child.val());
    });
  });
  var img1 = document.getElementById('outputImg1');
  var img2 = document.getElementById('outputImg2');
  var img3 = document.getElementById('outputImg3');
  // $("#description").append(Items[0]);
  document.getElementById("description").value = Items[0]
  document.getElementById("latitude").value = Items[1]
  document.getElementById("longitude").value = Items[2]
  document.getElementById("title").value = Items[3]
  $('#rating option[value="'+Items[4]+'"]').attr("selected", "selected");
  document.getElementById("tip1").value = Items[5][0]

  if(Items[5][1] != null){
    document.getElementById("tip2").value = Items[5][1] 
  }
  if(Items[5][2] != null){
    document.getElementById("tip3").value = Items[5][2]
  }
  if(Items[5][3] != null){
    document.getElementById("tip4").value = Items[5][3]
  }
  if(Items[5][4] != null){
    document.getElementById("tip5").value = Items[5][4]
  }
  $("input[name=typePinOptions][value="+Items[6]+"]").attr('checked', 'checked');
  
  // console.log(Items[3]);
  img1.src = Items[7];
  img2.src = Items[8];
  img3.src = Items[9];
  $("#outputImg1").show();
  $("#outputImg2").show();
  $("#outputImg3").show();
}