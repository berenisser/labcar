function initMap(){
	var map = new google.maps.Map(document.getElementById("map"),{
		zoom: 5,
		center: {lat: -9.1191427, lng: -77.0349046},
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false
	});


	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}

	//document.getElementById("tarifa").addEventListener("load",buscar);
	var latitud, longitud;

	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var miUbicacion = new google.maps.Marker({
			position : {lat: latitud, lng: longitud},
			animation: google.maps.Animation.DROP,
			map: map,
		});

		map.setZoom(17);
		map.setCenter({lat: latitud, lng: longitud});
	}

	var funcionError = function(error){
		alert("Tenemos problemas encontrando tu ubicación");
	}  

	buscar();

//autocompletado
	var origen = document.getElementById("origen");
	var autocomplete = new google.maps.places.Autocomplete(origen);
 	autocomplete.bindTo('bounds', map);

 	var destino = document.getElementById("destino");
	var autocomplete = new google.maps.places.Autocomplete(destino);
 	autocomplete.bindTo('bounds', map);

/*ruta....Primero se declaran 2 objetos globales
REFERENCIA: https://developers.google.com/maps/documentation/javascript/examples/directions-simple?hl=es-419
*/
	var directionsDisplay = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();

	 

	directionsDisplay.setMap(map);

        var onChangeHandler = function() {
         calculateAndDisplayRoute(directionsService, directionsDisplay);
        };

     document.getElementById("ruta").addEventListener("click",onChangeHandler);
        
       /* 
		estos hacen que despues de cambiar las direcciones se envie la info
       document.getElementById('origen').addEventListener('change', onChangeHandler);
       document.getElementById('destino').addEventListener('change', onChangeHandler);*/


	function calculateAndDisplayRoute(directionsService, directionsDisplay) {
		directionsService.route({
			origin: document.getElementById('origen').value,
			destination: document.getElementById('destino').value,
			travelMode: 'DRIVING'
		}, function(response, status) {
			if (status === 'OK') {
				directionsDisplay.setDirections(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}

}
