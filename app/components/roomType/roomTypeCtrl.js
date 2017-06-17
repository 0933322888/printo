"use strict";

angular.module('app')
    .controller('roomTypeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Image',
        function ($scope, $rootScope, $state, $stateParams, Image) {

            $scope.roomName = $stateParams.roomType;

            //TODO: for/{rooms} call APL

            Image.getImage(6967).then(function (result) {
                console.log(result)
            }, function (err) {
                console.error(err)
            });

            // Image.getCollection().then(function (result) {
            //     $scope.fullList = result;
            //     $scope.displayList = $scope.fullList.slice(0,12);
            //     $scope.isLoading = false;
            // }, function (err) {
            //     console.log(err);
            // });


            $scope.loadMore = function() {
                var last = $scope.displayList.length;
                var limit = $scope.fullList.length;
                var loadItems = limit - last < 12 ? limit - last : 12;
                for(var i = 0; i < loadItems; i++) {
                    $scope.displayList.push($scope.fullList[last+i]);
                }
            };


        }
    ]);