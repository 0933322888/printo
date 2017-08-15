"use strict";

angular.module('app')
    .controller('interiorCtrl', ['$scope', '$rootScope', '$state', '$stateParams',
        function ($scope, $rootScope, $state, $stateParams) {
            $scope.item = $stateParams.item || {};
            $scope.item.id = $scope.item.id || 4882;
            //TODO: 1) remove mocking above
            //2) get from seesionStorage last category and use it for going back button
            $scope.img = 'https://foto-oboi.com.ua/poua/images/wp/' + $scope.item.id + '/' + '580b390' + '.jpg';
            $scope.displayModel = {
                floor: {
                    collection: [1,2,3,4,5,6,7,8],
                    selection: 1
                },
                beds: {
                    collection: [11,12,13,14],
                    collection2: [21,22,23,24],
                    selection: 110
                },
                doors: {
                    collection: [41,42,43,44,45,46,47],
                    collection2: [48],
                    selection: 44
                },
                chairs: {
                    collection: [34,35,36,37],
                    collection2: [31,32],
                    selection: 34
                }
            };


            $scope.filters = {
                g: false,
                f: false,
                s: false
            };

            $scope.setFilter = function (type) {
                $scope.filters[type] = !$scope.filters[type];

                if (type == "g" && $scope.filters.s == true) $scope.filters.s = false;
                if (type == "s" && $scope.filters.g == true) $scope.filters.g = false;

                $scope.chosenFilters = '';
                angular.forEach($scope.filters, function (value, key) {
                    if (value) $scope.chosenFilters += key;
                });

                $scope.img = 'https://foto-oboi.com.ua/poua/images/wp/' + $scope.item.id + '/' + '580b390' + $scope.chosenFilters + '.jpg';
            };

            $scope.clearRoom = function () {
                var floor = $scope.displayModel.floor.selection;
                angular.forEach($scope.displayModel, function (el) {
                    el.selection = null;
                });
                $scope.displayModel.floor.selection = floor;
            };

            $scope.goBack= function() {
                var category = JSON.parse(sessionStorage.getItem("lastCategory"));
                $state.go('app.wallpapers', category);
            }
        }
    ]);