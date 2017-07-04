"use strict";

angular.module('app').directive('angularCrop', angularCrop.directive);

angular.module('app')
    .controller('cropCtrl', ['$scope', '$rootScope', '$state',
        function ($scope, $rootScope, $state) {

            $scope.data = {
                x1: 0,
                y1: 0,
                x2: 200,
                y2: 200
            };
            $scope.events = {
                onChange: function () {
                    console.log('changed', $scope.data);
                },
                onSelect: function () {
                    console.log('selected', $scope.data);
                }
            };

            // https://www.npmjs.com/package/cropperjs

            $scope.obj = {};

            // The url or the data64 for the image
            $scope.obj.src = 'https://static.pexels.com/photos/126407/pexels-photo-126407.jpeg';

            // Required: The current selection coords. Must be [x, y, x2, y2, w, h]
            $scope.obj.selection = [100, 100, 300, 250, 100, 50];

            // Optional: The coords of the selection related to the screen.
            // Use this to debug or in case you need to store the current "screen" value to replicate the same selection later
            $scope.obj.coords = [];

            // You can add a thumbnail if you want
            $scope.obj.thumbnail = false;
        }
    ]);