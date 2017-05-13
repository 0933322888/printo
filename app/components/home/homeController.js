"use strict";

angular.module('app')
    .controller('homeCtrl', ['$scope', '$rootScope', '$state', 'Image', '$http',
        function ($scope, $rootScope, $state, Image, $http) {

            $scope.myInterval = 2500;
            $scope.active = 0;
            var slides = $scope.slides = [];
            var currIndex = 0;


            $scope.slides = [
                {"image": './app/components/pics/detskiye_fotooboi.jpg', "text": 'Hello', "id": 0},
                {"image": './app/components/pics/fotooboi_dlya_kukhni.jpg', "text": 'Hello', "id": 1},
                {"image": './app/components/pics/fotooboi_dlya_ofisa.jpg', "text": 'Hello', "id": 2}
            ];


        }
    ]);

