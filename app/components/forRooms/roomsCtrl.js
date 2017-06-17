"use strict";

angular.module('app')
    .controller('roomsCtrl', ['$scope', '$rootScope', '$state',
        function ($scope, $rootScope, $state) {

            $scope.roomsList = [
                {
                    pic: "http://print-oboi.com.ua/public/img/for/detskiye_fotooboi.jpg",
                    room: "children"
                },
                {
                    pic: "http://print-oboi.com.ua/public/img/for/fotooboi_dlya_kukhni.jpg",
                    room: "kitchen"
                },
                {
                    pic: "http://print-oboi.com.ua/public/img/for/fotooboi_dlya_spalni.jpg",
                    room: "bedroom"
                },
                {
                    pic: "http://print-oboi.com.ua/public/img/for/fotooboi_v_gostinuyu.jpg",
                    room: "hallway"
                },
                {
                    pic: "http://print-oboi.com.ua/public/img/for/fotooboi_v_prikhozhuyu.jpg",
                    room: "greeting"
                },
                {
                    pic: "http://print-oboi.com.ua/public/img/for/fotooboi_dlya_vannoy.jpg",
                    room: "bathroom"
                },
                {
                    pic: "http://print-oboi.com.ua/public/img/for/fotooboi_dlya_ofisa.jpg",
                    room: "office"
                }
            ];

            $scope.goToRoom = function (room) {
                $state.go("app.room", room)
            }

        }
    ]);