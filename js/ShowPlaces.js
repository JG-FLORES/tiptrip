
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
  dbRef.on('value', snap => searchPlace());
  // End Data RealTime


}());


var idDeletePlace = "";
var typePinDelete = "";

$(document).ready(function(){
  
  $("#searchGlobal").hide();
  typePinSelected()
  
  // searchPlace for pines
  desabledSelect();

});

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

    searchPlace();

  }else{
    $('#countryHidden').hide();
    $('#stateHidden').hide();
    $('#municipalityHidden').hide();
    $('#colonyHidden').hide();

    searchPlace();
   
  }
}

function searchCountry(){

  $('#countrySelected').empty();

  $("#countrySelected").append("<option disabled='true' selected='true'>Select country</option>")

  // Fill select Countries in option with Firebase
    var rootRefCountry = firebase.database().ref();
    var urlRefCountry = rootRefCountry.child("places-items/pines/Rojos");
    urlRefCountry.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        $("#countrySelected").append('<option value="'+child.key+'">'+child.key+'</option>');
      });
    });
}

function searchStates(){

  $("#stateSelected").empty();

  $("#stateSelected").append("<option disabled='true' selected='true'>Select state</option>")


  var countrySelected = getId("countrySelected");

  // Fill select States for Country selected in option with Firebase
  var rootRefState = firebase.database().ref();
  var urlRefState = rootRefState.child("places-items/pines/Rojos/"+countrySelected+"/States");
  urlRefState.once("value", function(snapshot) {
    snapshot.forEach(function(child) {      
      $("#stateSelected").append('<option value="'+child.key+'">'+child.key+'</option>');
    });
  });
  $('#stateHidden').show();
}


function searchMunicipality(){

  $("#tbAddPlace").empty();

  $("#municipalitySelected").empty();

  $("#municipalitySelected").append("<option disabled='true' selected='true'>Select municipalityy</option>")


  var countrySelected = getId("countrySelected");
  var stateSelected = getId("stateSelected");

  // Fill select States for Country selected in option with Firebase
  var rootRefState = firebase.database().ref();
  var urlRefState = rootRefState.child("places-items/pines/Rojos/"+countrySelected+"/States/"+stateSelected+"/Municipalities");
  urlRefState.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      $("#municipalitySelected").append('<option value="'+child.key+'">'+child.key+'</option>');
    });
  });
  $('#municipalityHidden').show();
}

function searchColony(){

  $("#tbAddPlace").empty();

  $("#colonySelected").empty();

  $("#colonySelected").append("<option disabled='true' selected='true'>Select colony</option>")


  var countrySelected = getId("countrySelected");
  var stateSelected = getId("stateSelected");
  var municipalitySelected = getId("municipalitySelected");

  // Fill select States for Country selected in option with Firebase
  var rootRefState = firebase.database().ref();
  var urlRefState = rootRefState.child("places-items/pines/Rojos/"+countrySelected+"/States/"+
    stateSelected+"/Municipalities/"+municipalitySelected+"/Colonies");

  urlRefState.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      $("#colonySelected").append('<option value="'+child.key+'">'+child.key+'</option>');
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

    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("places-items/pines/Rojos/"+countrySelected+"/States/"+
    stateSelected+"/Municipalities/"+municipalitySelected+"/Colonies/"+colonySelected+"/Places");
    urlRef.once("value", function(snapshot) {      
      snapshot.forEach(function(child) {
        
        var addTable = fillTable(child.val().urlImage1, child.val().name, child.val().descriptionPlace, child.val().rating, child.val().typePin, child.key, "pinRed")

        $("#tbAddPlace").append(addTable);
      });
    });

  }
  if(categorySearchSelected == "123"){

    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("places-items/pines/123");
    urlRef.once("value", function(snapshot) {      
      snapshot.forEach(function(child) {

        var addTable = fillTable(child.val().urlImage1, child.val().name, child.val().descriptionPlace, child.val().rating, child.val().typePin, child.key, "pin123")

        $("#tbAddPlace").append(addTable);
      });
    });
  }
}

function fillTable(urlImage1, name, descriptionPlace, rating, typepin,idPlace, type){ 

  // console.log(typepindelete)
  var table = '<tr class="tr-shadow">'+ 
      '<td>'+
        '<div align="center">'+
          '<img src="'+urlImage1+'" style="border-radius: 60px; width: 120px; height:120px"/>'+
          '<br>'+name+
        '</div>'+
      '</td>'+
      '<td class="text-justify">'+descriptionPlace+'</td>'+
      '<td style="width:20px">'+rating+'</td>'+
      '<td>'+typepin+'</td>'+
      '<td>'+
          '<div class="table-data-feature">'+
            '<button class="item" data-toggle="tooltip" data-placement="top" title="Editar" onclick="updatePlace()">'+
              '<i class="zmdi zmdi-edit"></i>'+
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

    var adaRef = firebase.database().ref("places-items/pines/Rojos/"+countrySelected+"/States/"+
    stateSelected+"/Municipalities/"+municipalitySelected+"/Colonies/"+colonySelected+"/Places/"+idDeletePlace);
    adaRef.remove()
      .then(function() {
        console.log("Remove succeeded.");

        idDeletePlace = "";
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
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

function updatePlace(){
  $("#modalUpdatePlace").modal("show");
}