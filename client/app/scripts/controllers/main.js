'use strict';

/**
 * @ngdoc function
 * @name spaceappsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spaceappsApp
 */

var mapStyle = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f00b0b"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#787878"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#2e2e2e"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c91515"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#da2020"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#611c1c"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#973a3a"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0f252e"
            },
            {
                "lightness": 17
            }
        ]
    }
];


angular.module('spaceappsApp')
    .controller('MainCtrl', function ($scope, $http, $log, uiGmapGoogleMapApi) {

        $scope.method = 'GET';
        $scope.url = 'http://space.lasse-nielsen.de/api?resp=json&task=incidents';

        $http.get($scope.url).
            then(function (result) {
                $scope.initMap(result.data);
            }).catch(function () {
                console.log('Error');
            })
            .finally(function () {
                console.log('Finished');
            });

        $scope.map = {
            doCluster: true,
            center: {
                latitude: 50.124694,
                longitude: 8.706254
            },
            zoom: 8,
            bounds: {},
            options: {
                scrollwheel: false,
                styles: mapStyle
            }
        };

        $scope.initMap = function (data) {
            var locations = data.payload.incidents;
            $scope.markers = [];

            uiGmapGoogleMapApi.then(function () {

                var incident;
                var lat, lon;
                var title;

                angular.forEach(locations, function (location, index) {

                    incident = location.incident;

                    lat = incident.locationlatitude;
                    lon = incident.locationlongitude;
                    title = incident.incidenttitle;

                    $log.log(title);

                    if (!!lat) {
                        $scope.markers.push({
                            id: index,
                            latitude: lat,
                            longitude: lon,
                            title: title
                        });
                    }
                });
            });
        };

        $.stellar();

    });