window.onload = getMyLocation;

function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation);
	} else {
		alert("Oops, no geolocation support");
	}
}

var map;

function showMap(coords) {
	var googleLatAndLong = new google.maps.LatLng(latitude, longitude);

	var mapOptions = {
		zoom: 10,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);	
}

function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var div = document.getElementById("location");
	div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;

	var km = computeDistance(position.coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "You are " + km + " km from the WickedlySmart HQ";
}

var ourCoords = {
	latitude: 47.624851,
	longitude: -122.52099
}

function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(startCoords.longitude);

	var Radius = 6371;
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
							Math.cos(startLatRads) * Math.cos(destLatRads) *
							Math.cos(startLongRads - destLongRads)) * Radius;
	return distance;
}

function degreesToRadians(degrees) {
	var radians = (degrees * Math.pi)/ 180;
	return radians;
}

