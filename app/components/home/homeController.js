"use strict";

angular.module('app')
    .controller('homeCtrl', ['$scope', '$rootScope', '$state', 'Image', '$http',
        function ($scope, $rootScope, $state, Image, $http) {

            $scope.myInterval = 2500;
            $scope.active = 0;
            var slides = $scope.slides = [];
            var currIndex = 0;


            $scope.slides = [
                {"image": 'http://print-oboi.com.ua/public/pictures/maintext/zakaz_fotooboyev.jpg', "id": 0},
                {"image": 'http://print-oboi.com.ua/public/pictures/maintext/fotooboi_na_zakaz.jpg', "id": 1},
                {"image": 'http://print-oboi.com.ua/public/pictures/maintext/zakazat_fotooboi.jpg', "id": 2}
            ];


        }
    ]);

