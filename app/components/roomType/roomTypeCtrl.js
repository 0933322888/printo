"use strict";

angular.module('app')
    .controller('roomTypeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Image',
        function ($scope, $rootScope, $state, $stateParams, Image) {
            $scope.displayList = [];
            $scope.fullList = [];
            $scope.roomName = $stateParams.roomType;

            //TODO: interiors categories API

            var getRoomId = function (id) {
                return {
                    where: {
                        categories: [id]
                    }
                };
            };

            Image.getCollection(getRoomId(roomCategories[$scope.roomName])).then(function (result) {
                $scope.fullList = result;
                $scope.displayList = $scope.fullList.slice(0, 12);
                $scope.isLoading = false;
            }, function (err) {
                console.log(err);
            });

            $scope.loadMore = function () {
                var last = $scope.displayList.length;
                var limit = $scope.fullList.length;
                var loadItems = limit - last < 12 ? limit - last : 12;
                for (var i = 0; i < loadItems; i++) {
                    $scope.displayList.push($scope.fullList[last + i]);
                }
            };
        }
    ]);