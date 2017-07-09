"use strict";

//angular.module('app').directive('angularCrop', angularCrop.directive);
            // https://www.npmjs.com/package/cropperjs

angular.module('app')
    .controller('cropCtrl', ['$scope', '$stateParams', '$rootScope', '$state',
        function ($scope, $stateParams, $rootScope, $state) {
            var item = $stateParams.photo;

            $scope.obj = {};
            //TODO 2 APIs for image get?
            //https://foto-oboi.com.ua/images/wp/4812/580b480.jpg
            //https://foto-oboi.com.ua/images/wps/poua580b390/4812.jpg (<=== used for cropping)

            $scope.obj.src = 'https://foto-oboi.com.ua/images/wps/poua580b390/' + item.id + '.jpg';

            // Required: The current selection coords. Must be [x, y, x2, y2, w, h]
            $scope.obj.selection = [0, 0, 580, 390, 580, 390];
            // Optional: The coords of the selection related to the screen.
            // Use this to debug or in case you need to store the current "screen" value to replicate the same selection later
            $scope.obj.coords = [];
            // You can add a thumbnail if you want
            $scope.obj.thumbnail = false;
        }
    ]);