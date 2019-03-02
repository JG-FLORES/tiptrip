
// Initialize Firebase
  var config = {
    // apiKey: "AIzaSyC28dAntLwKMR4q3BlLH6OlLocitABMdCI",
    // authDomain: "amole-441d3.firebaseapp.com",
    // databaseURL: "https://amole-441d3.firebaseio.com",
    // projectId: "amole-441d3",
    // storageBucket: "amole-441d3.appspot.com",
    // messagingSenderId: "813935639249"
    apiKey: "AIzaSyB_cPHyAYC4j66GcU4F7cU8gTYpeNFmwEQ",
    authDomain: "amole-87b44.firebaseapp.com",
    databaseURL: "https://amole-87b44.firebaseio.com",
    projectId: "amole-87b44",
    storageBucket: "amole-87b44.appspot.com",
    messagingSenderId: "692612234466"
  };
  firebase.initializeApp(config);

var UrlImage1 = "";
var UrlImage2 = "";
var UrlImage3 = "";

$("#frmPlace").submit(function(e){

  e.preventDefault();

  var title = getId("title");
  var description = getId("description");
  var latitude = getId("latitude");
  var longitude = getId("longitude");
  // var name = getId("name");
  var rating = getId("rating");
  var typepin = getId("typePin");
  var country = getId("country");
  var state = getId("state");
  var urlimage1 = UrlImage1;
  var urlimage2 = UrlImage2;
  var urlimage3 = UrlImage3;

  // tips
  var tip1 = getId("tip1");
  var tip2 = getId("tip2");
  var tip3 = getId("tip3");
  var tip4 = getId("tip4");
  var tip5 = getId("tip5");

  insertNewPlace(country, state, title, description, latitude, longitude, rating, typepin, urlimage1, urlimage2, urlimage3, tip1, tip2, tip3, tip4, tip5);
 

});


function insertNewPlace(country, state, title, description, latitude, longitude, rating, typepin, urlimage1, urlimage2, urlimage3, tip1, tip2, tip3, tip4, tip5) {

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


  firebase.database().ref('places-items/'+country+'/'+state+'/'+title).set({
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
      // The write failed...
      alert("Write Failed Place...");
    } else {
      // Data saved successfully!
      alert("Place saved successfully!");
      $("#frmPlace").reset();
      $("#imgPlace").hide();
    }
  });
}


var loadFile1 = function(event) { 
  var storageRef = firebase.storage().ref('imagenes/' + event.target.files[0].name);

  var task = storageRef.put(event.target.files[0]);

  task.on('state_changed', 
    function progess(snapshot){

      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      if (progress == 100) {
       
      }    
    },
    function error(err){

      alert("No se pudo subir la Imagen");

    },
    function complete(){
      task.snapshot.ref.getDownloadURL().then((url)=>{
        console.log(url);
        UrlImage1 = url;

        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('outputImg1');
          output.src = url;
        };
        reader.readAsDataURL(event.target.files[0]);

      });
    }
  );
};

var loadFile2 = function(event) { 
  var storageRef = firebase.storage().ref('imagenes/' + event.target.files[0].name);

  var task = storageRef.put(event.target.files[0]);

  task.on('state_changed', 
    function progess(snapshot){

      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      if (progress == 100) {
       
      }    
    },
    function error(err){

      alert("No se pudo subir la Imagen");

    },
    function complete(){
      task.snapshot.ref.getDownloadURL().then((url)=>{
        console.log(url);
        UrlImage2 = url;

        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('outputImg2');
          output.src = url;
        };
        reader.readAsDataURL(event.target.files[0]);

      });
    }
  );
};

var loadFile3 = function(event) { 
  var storageRef = firebase.storage().ref('imagenes/' + event.target.files[0].name);

  var task = storageRef.put(event.target.files[0]);

  task.on('state_changed', 
    function progess(snapshot){

      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      if (progress == 100) {
       
      }    
    },
    function error(err){

      alert("No se pudo subir la Imagen");

    },
    function complete(){
      task.snapshot.ref.getDownloadURL().then((url)=>{
        console.log(url);
        UrlImage3 = url;

        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('outputImg3');
          output.src = url;
        };
        reader.readAsDataURL(event.target.files[0]);

      });
    }
  );
};


function getId(id) {
  return $('#'+id+'').val();
}


function searchPlace(){

  var country = getId("countrySelected");
  var state = getId("stateSelected");
  // alert(country+state);

  $("#tbAddPlace").empty();
  var place = firebase.database().ref('places-items/'+country+'/'+state+'/');

  place.on("child_added", function(data){

    var placeValue = data.val();

    console.log(placeValue);
    $("#tbAddPlace").append('<tr class="tr-shadow"> <td><div align="center"><img src="'+placeValue.urlImage1+'" style="border-radius: 60px; width: 120px; height:120px"/><br>'+placeValue.name+'</div></td><td class="text-justify">'+placeValue.descriptionPlace+'</td><td style="width:20px">'+placeValue.rating+'</td><td>'+placeValue.typePin+'</td><td><div class="table-data-feature"><button class="item" data-toggle="tooltip" data-placement="top" title="Editar" onclick="updatePlace()"><i class="zmdi zmdi-edit"></i></button><button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" onclick="deletePlace()"><i class="zmdi zmdi-delete"></i></button><button class="item" data-toggle="tooltip" data-placement="top" title="Mas"><i class="zmdi zmdi-more"></i></button></div></td></tr></tr><tr class="spacer"></tr>');   
  });

}

function showPlaces(){
  var place = firebase.database().ref("places-items/");

  place.on("child_added", function(data){

    var placeValue = data.val();

    console.log(placeValue);

    // console.log(placeValue[0])

    // $("#tbAddPlace").append('<tr class="tr-shadow"> <td><div align="center"><img src="'+placeValue.urlImage+'" style="border-radius: 60px; width: 120px; height:120px"/><br>'+placeValue.name+'</div></td><td class="text-justify">'+placeValue.descriptionPlace+'</td><td style="width:20px">'+placeValue.rating+'</td><td>'+placeValue.typePin+'</td><td><div class="table-data-feature"><button class="item" data-toggle="tooltip" data-placement="top" title="Editar" onclick="updatePlace()"><i class="zmdi zmdi-edit"></i></button><button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" onclick="deletePlace()"><i class="zmdi zmdi-delete"></i></button><button class="item" data-toggle="tooltip" data-placement="top" title="Mas"><i class="zmdi zmdi-more"></i></button></div></td></tr></tr><tr class="spacer"></tr>');   
  });
}

function deletePlace(){
  $("#modalDeletePlace").modal("show");
}

// function aceptDeletePlace(){

//   var place = firebase.database().ref("places-items/Joel");
//   // place.remove();
//   // alert("Aceptaste la eliminacion del Place")

//   pace.remove(function (error) {
//       if (!error) {
//           // removed!
//       }else{
//         alert("Ocurrio un error al borrar el Place");
//       }
//   }
// }



function updatePlace(){
  $("#modalUpdatePlace").modal("show");
}

// <td><div class="table-data-feature"><button class="item" data-toggle="tooltip" data-placement="top" title="Editar"><i class="zmdi zmdi-edit"></i></button><button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="zmdi zmdi-delete"></i></button><button class="item" data-toggle="tooltip" data-placement="top" title="More"><i class="zmdi zmdi-more"></i></button></div></td>