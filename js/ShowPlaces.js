
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


  // Data RealTime
  var dbRef = firebase.database().ref().child('places-items'); 
  dbRef.on('value', snap => searchPlace());
  // End Data RealTime


}());

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

  $("#tbAddPlace").empty();

  $("#stateSelected").empty();

  $("#stateSelected").append("<option disabled='true' selected='true'>Select state</option>")


  var countrySelected = getId("countrySelected");

  // Fill select States for Country selected in option with Firebase
  var rootRefState = firebase.database().ref();
  var urlRefState = rootRefState.child("places-items/pines/Rojos/"+countrySelected);
  urlRefState.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      $("#stateSelected").append('<option value="'+child.key+'">'+child.key+'</option>');
    });
  });
  $("#searchGlobal").show();
  $('#stateHidden').show();
}


function searchPlace(){

  $("#tbAddPlace").empty();

  var country = getId("countrySelected");

  var state = getId("stateSelected");

  var categorySearchSelected = getId("categorySearch");

  if (categorySearchSelected == "Rojos"){

    var place = firebase.database().ref('places-items/pines/Rojos/'+country+'/'+state+'/');

    place.on("child_added", function(data){

      var placeValue = data.val();
      var addTable = fillTable(placeValue.urlImage1, placeValue.name, placeValue.descriptionPlace, placeValue.rating, placeValue.typePin)

      $("#tbAddPlace").append(addTable);
    });

  }
  if(categorySearchSelected == "123"){

    var place = firebase.database().ref('places-items/pines/123/');

    place.on("child_added", function(data){

      var placeValue = data.val();

      var addTable = fillTable(placeValue.urlImage1, placeValue.name, placeValue.descriptionPlace, placeValue.rating, placeValue.typePin)

      $("#tbAddPlace").append(addTable);
    });
    
  }
}

function fillTable(urlImage1, name, descriptionPlace, rating, typepin){ 
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
            '<button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" onclick="deletePlace()">'+
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

function deletePlace(){
  $("#modalDeletePlace").modal("show");
}


function updatePlace(){
  $("#modalUpdatePlace").modal("show");
}