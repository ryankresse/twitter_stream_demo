(function (){
  
  angular
      .module('app')
      .directive('map', function() {
        return {
          restrict: 'EA',
          replace: false,
          scope: {
	  		coords: '=coords',
        updatecoords: '=updatecoords'
	  	  },
          link: function(scope, $element, attrs) {
            function initialize() { 
              var mapOptions = {
                center: { lat: 40.7127 , lng: -74.0059 },
                zoom: 8
              };
              var map = new google.maps.Map(document.getElementById('map-canvas'),
                  mapOptions);
            
               var rectangle = new google.maps.Rectangle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                draggable: true,
                map: map,
                bounds: new google.maps.LatLngBounds(
                  new google.maps.LatLng(40.559966, -74.367142),
                  new google.maps.LatLng(40.97081, -73.736801))
              });
            
          
            
            function getNewPosition (event) {
              var neLong = String(rectangle.getBounds().getNorthEast().D);
              var neLat = String(rectangle.getBounds().getNorthEast().k);
              var swLong = String(rectangle.getBounds().getSouthWest().D);
              var swLat = String(rectangle.getBounds().getSouthWest().k);
              var coords = [swLong, swLat, neLong, neLat];
              //console.log(coords);
              //scope.coords = coords;
              scope.updatecoords(coords);
              //console.log(scope.coords);
            }

            google.maps.event.addListener(rectangle, 'bounds_changed', getNewPosition);
          }

            google.maps.event.addDomListener(window, 'load', initialize); 
		      
        },

        template: "<div id = 'map-canvas' style = 'width: 500px; height: 500px;'></div>"
         
       };
	});
})();