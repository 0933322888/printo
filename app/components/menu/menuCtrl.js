"use strict";

angular.module('app')
    .controller('menuCtrl', ['$scope', '$rootScope', '$state', 'Image', '$http',
        function ($scope, $rootScope, $state, Image, $http) {

            $scope.radioModel = null;

            $scope.goToMenu = function (param) {
                var newState = 'app.' + ($scope.radioModel || param);
                $state.go(newState);
            };

            $scope.setLanguage = function (language) {
                $rootScope.curLang = language;
                getCategories();
            };

            $scope.goToCateg = function (id, name) {
                $scope.radioModel = null;
                $state.go('app.wallpapers', {id: id, name: name})
            };

            var getCategories = function () {
                $http.get('dist/categories.json').then(function (resp) {
                    var categories = resp.data;
                    $scope.popular = [
                        {name: categories[54]["name_" + $rootScope.curLang], id: 54},
                        {name: categories[70]["name_" + $rootScope.curLang], id: 70},
                        {name: categories[133]["name_" + $rootScope.curLang], id: 133},
                        {name: categories[71]["name_" + $rootScope.curLang], id: 71},
                        {name: categories[18]["name_" + $rootScope.curLang], id: 18}
                    ];
                    $scope.categories = [
                        {name: categories[1587]["name_" + $rootScope.curLang], id: 1587},
                        {name: categories[1588]["name_" + $rootScope.curLang], id: 1588},
                        {name: categories[56]["name_" + $rootScope.curLang], id: 56},
                        {name: categories[60]["name_" + $rootScope.curLang], id: 60},
                        {name: categories[1583]["name_" + $rootScope.curLang], id: 1583},
                        {name: categories[142]["name_" + $rootScope.curLang], id: 142},
                        {name: categories[59]["name_" + $rootScope.curLang], id: 59},
                        {name: categories[69]["name_" + $rootScope.curLang], id: 69},
                        {name: categories[25]["name_" + $rootScope.curLang], id: 25},
                        {name: categories[120]["name_" + $rootScope.curLang], id: 120},
                        {name: categories[1573]["name_" + $rootScope.curLang], id: 1573},
                        {name: categories[132]["name_" + $rootScope.curLang], id: 132},
                        {name: categories[125]["name_" + $rootScope.curLang], id: 125},
                        {name: categories[128]["name_" + $rootScope.curLang], id: 128},
                        {name: categories[118]["name_" + $rootScope.curLang], id: 118},
                        {name: categories[140]["name_" + $rootScope.curLang], id: 140},
                        {name: categories[1586]["name_" + $rootScope.curLang], id: 1586},
                        {name: categories[143]["name_" + $rootScope.curLang], id: 143},
                        {name: categories[134]["name_" + $rootScope.curLang], id: 134}
                    ];
                    $scope.interiors = [
                        {name: categories[1587]["name_" + $rootScope.curLang], id: 1587},
                        {name: categories[1588]["name_" + $rootScope.curLang], id: 1588}
                    ];
                });
            };

            getCategories();
        }
    ]);