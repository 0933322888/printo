"use strict";

angular.module('app')
    .controller('homeCtrl', ['$scope', '$state', 'Image', '$http',
        function ($scope, $state, Image, $http) {

            $scope.myInterval = 2500;
            $scope.active = 0;

            $scope.slides = [
                {"image": 'http://print-oboi.com.ua/public/pictures/maintext/zakaz_fotooboyev.jpg', "id": 0},
                {"image": 'http://print-oboi.com.ua/public/pictures/maintext/fotooboi_na_zakaz.jpg', "id": 1},
                {"image": 'http://print-oboi.com.ua/public/pictures/maintext/zakazat_fotooboi.jpg', "id": 2}
            ];

            $scope.slides2 = [
                {"image": 'http://print-oboi.com.ua/public/pictures/maintext/prodazha_fotooboyev.jpg', "id": 0},
                {"image": 'http://print-oboi.com.ua/public/pictures/maintext/fotooboi_v_Ukraine.jpg', "id": 1},
                {"image": 'http://print-oboi.com.ua/public/pictures/maintext/prodazha_foto_oboyev.jpg', "id": 2}
            ];

            $scope.slides3 = [
                {"image": 'http://print-oboi.com.ua/public/pictures/maintext/fotooboi_na_stenu.jpg', "id": 0},
                {"image": 'http://print-oboi.com.ua/public/pictures/maintext/vybor_fotooboyev.jpg', "id": 1},
                {"image": 'http://print-oboi.com.ua/public/pictures/maintext/fotooboi_po_fen-shuyu.jpg', "id": 2}
            ];

        }
    ]);

