"use strict";

angular.module('app')
    .controller('wallpapersCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Image',
        function ($scope, $rootScope, $state, $stateParams, Image) {

            $scope.categoryName = $stateParams.name;

            var filter = {
                where: {
                    categories: $stateParams.id
                }
            };
            $scope.fullList = [];
            $scope.list = [];

            $scope.isLoading = true;
            Image.getCollection(filter).then(function (result) {
                $scope.fullList = result;
                $scope.list = $scope.fullList.slice(0,12);
                $scope.isLoading = false;
            }, function (err) {
                console.log(err);
                $scope.isLoading = false;
            });

            $scope.loadMore = function() {
                var last = $scope.list.length;
                var limit = $scope.fullList.length;
                var loadItems = limit - last < 12 ? limit - last : 12;
                for(var i = 0; i < loadItems; i++) {
                    $scope.list.push($scope.fullList[last+i]);
                }
            };

        }
    ]);