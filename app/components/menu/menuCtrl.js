"use strict";

angular.module('app')
    .controller('menuCtrl', ['$scope', '$rootScope', '$state', 'Image', '$http',
        function ($scope, $rootScope, $state, Image, $http) {

            $scope.radioModel = null;

            $scope.goToMenu = function () {
                var newState = 'app.' + $scope.radioModel;
                $state.go(newState);
            };

            $scope.setLanguage = function (language) {
                $rootScope.curLang = language;
            };

            $scope.goToCateg = function (id, name) {
                $scope.radioModel = null;
                $state.go('app.wallpapers', {id: id, name: name})
            };

            $http.get('dist/categories.json').then(function (resp) {
                var categories = resp.data;

                $scope.popular = [
                    {name: categories[54]["name_" + $rootScope.curLang], id: 54},
                    {name: categories[70].name_ru, id: 70},
                    {name: categories[133].name_ru, id: 133},
                    {name: categories[71].name_ru, id: 71},
                    {name: categories[18].name_ru, id: 18}
                ];


                $scope.categories = [
                    {name: categories[1587].name_ru, id: 1587},
                    {name: categories[1588].name_ru, id: 1588},
                    {name: categories[56].name_ru, id: 56},
                    {name: categories[60].name_ru, id: 60},
                    {name: categories[1583].name_ru, id: 1583},
                    {name: categories[142].name_ru, id: 142},
                    {name: categories[59].name_ru, id: 59},
                    {name: categories[69].name_ru, id: 69},
                    {name: categories[25].name_ru, id: 25},
                    {name: categories[120].name_ru, id: 120},
                    {name: categories[1573].name_ru, id: 1573},
                    {name: categories[132].name_ru, id: 132},
                    {name: categories[125].name_ru, id: 125},
                    {name: categories[128].name_ru, id: 128},
                    {name: categories[118].name_ru, id: 118},
                    {name: categories[140].name_ru, id: 140},
                    {name: categories[1586].name_ru, id: 1586},
                    {name: categories[143].name_ru, id: 143},
                    {name: categories[134].name_ru, id: 134}
                ];

                $scope.interiors = [
                    {name: categories[1587].name_ru, id: 1587},
                    {name: categories[1588].name_ru, id: 1588}

                ];







            });


        }
    ]);