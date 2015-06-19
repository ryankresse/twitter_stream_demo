(function (){
  // this directive hooks up with the google maps api to create our map functionality
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
              
              // intial map view positioning
              var mapOptions = {
                center: { lat: 40.7127 , lng: -72.0059 },
                zoom: 8
              };
             
              var map = new google.maps.Map(document.getElementById('map-canvas'),
                  mapOptions);
            
              //creating our box
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
            
            
            //when the box's position changes, update the coordinates in our controller
            function getNewPosition (event) {
              
              var neCorner = rectangle.getBounds().getNorthEast();
                  swCorner = rectangle.getBounds().getSouthWest();
              
              var neLat = String(neCorner.A),
                  neLong = String(neCorner.F),
                  swLat = String(swCorner.A),
                  swLong = String(swCorner.F);
                            
              var coords = [swLong, swLat, neLong, neLat];
               console.log(coords);
              scope.updatecoords(coords);
            }

            google.maps.event.addListener(rectangle, 'bounds_changed', getNewPosition);
          }

            google.maps.event.addDomListener(window, 'load', initialize); 
		      
        },

        template: "<div id = 'map-canvas' class = 'map-canvas'></div>"
         
       };
	});
})();