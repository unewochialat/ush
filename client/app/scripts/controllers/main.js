'use strict';

/**
 * @ngdoc function
 * @name spaceappsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spaceappsApp
 */
angular.module('spaceappsApp')
        .controller('MainCtrl', function ($scope, $http, $log, uiGmapGoogleMapApi) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.method = 'GET';
        $scope.url = 'http://space.lasse-nielsen.de/api?resp=json&task=incidents';

        $http.get($scope.url).
            then(function(result) {
                $scope.initMap(result.data);
            }).catch(function() {
                console.log('Error');
            })
            .finally(function() {
                console.log('Finished');
            });


        $scope.map = {
            doCluster: true,
            center: {
                latitude: 50.124694,
                longitude: 8.706254
            },
            zoom: 8,
            bounds: {}
        };

        $scope.initMap = function(data) {
            var locations = data.payload.incidents;
            $scope.markers = [];

            uiGmapGoogleMapApi.then(function() {

                var lat, lon;
                var title;

                angular.forEach(locations, function(location, index){

                    lat = location.incident.locationlatitude;
                    lon = location.incident.locationlongitude;
                    title = location.incident.locationname;

                    if(!!lat) {
                        $scope.markers.push({
                            id: index,
                            latitude: lat,
                            longitude: lon
                        }) ;
                    }
                });

                $log.log($scope.markers);
            });
        };
    });

//'use strict';

/**
 * @ngdoc function
 * @name spaceappsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spaceappsApp
 */
angular.module('spaceappsApp')
    .controller('MainCtrl', function ($scope, $http, $log, uiGmapGoogleMapApi) {
        $scope.method = 'GET';
        $scope.url = 'http://space.lasse-nielsen.de/api?resp=json&task=incidents';

        $http.get($scope.url).
            then(function(result) {
                $scope.initMap(result.data);
            }).catch(function() {
                console.log('Error');
            })
            .finally(function() {
                console.log('Finished');
            });


        $scope.map = {
            doCluster: true,
            center: {
                latitude: 50.124694,
                longitude: 8.706254
            },
            zoom: 8,
            bounds: {}
        };

        $scope.initMap = function(data) {
            var locations = data.payload.incidents;
            $scope.markers = [];

            uiGmapGoogleMapApi.then(function() {

                var lat, lon;
                var title;

                angular.forEach(locations, function(location, index){

                    lat = location.incident.locationlatitude;
                    lon = location.incident.locationlongitude;
                    title = location.incident.locationname;

                    if(!!lat) {
                        $scope.markers.push({
                            id: index,
                            latitude: parseFloat(lat),
                            longitude: parseFloat(lon),
                            title: 'm' + index
                        }) ;
                    }
                });
            });
        };
    });
