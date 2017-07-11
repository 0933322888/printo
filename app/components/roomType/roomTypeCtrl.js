"use strict";

angular.module('app')
    .controller('roomTypeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Image', 'interiors',
        function ($scope, $rootScope, $state, $stateParams, Image, interiors) {
            $scope.displayList = [];
            $scope.fullList = [];
            $scope.roomName = $stateParams.name;

            var categIndex = interiors.linkid[$scope.roomName];



                $scope.fullList = interiors.categories[categIndex].interiors;
                $scope.displayList = $scope.fullList.slice(0, 12);


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