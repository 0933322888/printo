"use strict";

//angular.module('app').directive('angularCrop', angularCrop.directive);
// https://www.npmjs.com/package/cropperjs

angular.module('app')
    .controller('cropCtrl', ['$scope', '$stateParams', '$rootScope', '$state', "$timeout",
        function ($scope, $stateParams, $rootScope, $state, $timeout) {
            $scope.item = $stateParams.photo;

            // removes dragging vertical/horizontal lines if true
            $scope.noVLine = false;
            $scope.noHLine = false;

            $scope.obj = {};
            //TODO 2 APIs for image get?
            //https://foto-oboi.com.ua/images/wp/4812/580b480.jpg
            //https://foto-oboi.com.ua/images/wps/poua580b390/4812.jpg (<=== used for cropping)

            $scope.obj.src = 'https://foto-oboi.com.ua/images/wps/poua580b390/' + $scope.item.id + '.jpg';

            // Required: The current selection coords. Must be [x, y, x2, y2, w, h]
            $scope.obj.selection = [0, 0, 580, 390, 580, 390];
            // Optional: The coords of the selection related to the screen.
            // Use this to debug or in case you need to store the current "screen" value to replicate the same selection later
            $scope.obj.coords = [];

            // You can add a thumbnail if you want
            $scope.obj.thumbnail = false;

            $scope.photoWidth = Math.round($scope.item.realWidth);
            $scope.photoHeight = Math.round($scope.item.realHeight);

            $scope.updateSize = function (side) {
                if (side == 'w') {
                    //don't allow to input more than possible
                    if ($scope.photoWidth > $scope.obj.coords[4] / $scope.wCoef) {
                        $scope.photoWidth = Math.round($scope.obj.coords[4] / $scope.wCoef);
                    } else {
                        var diff = $scope.obj.coords[4] - $scope.photoWidth * $scope.wCoef;
                        $scope.obj.selection[0] = Math.round(diff);
                        // $scope.obj.selection[2] -= Math.round(diff / 2);
                        $scope.obj.selection[4] = $scope.obj.coords[4] - Math.round(diff);
                    }
                } else {
                    if ($scope.photoHeight > $scope.obj.coords[5] / $scope.hCoef) {
                        $scope.photoHeight = Math.round($scope.obj.coords[5] / $scope.hCoef)
                    }
                }
            };

            $scope.$watch('obj.selection', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (!$scope.obj.coords.length) {
                        angular.copy($scope.obj.selection, $scope.obj.coords);
                        $scope.wCoef = $scope.obj.coords[4] / Math.round($scope.item.realWidth);
                        $scope.hCoef = $scope.obj.coords[5] / Math.round($scope.item.realHeight);
                    }

                    $scope.noHLine = $scope.obj.selection[0] !== $scope.obj.coords[0] || $scope.obj.selection[2] !== $scope.obj.coords[2];
                    $scope.noVLine = $scope.obj.selection[1] !== $scope.obj.coords[1] || $scope.obj.selection[3] !== $scope.obj.coords[3];

                    console.log($scope.obj.selection);
                    var selectedW = Math.round($scope.obj.selection[4] / $scope.wCoef);
                    var selectedH = Math.round($scope.obj.selection[5] / $scope.hCoef);

                    $scope.square = parseFloat(selectedW * selectedH / 10000).toFixed(2);
                    $scope.photoWidth = selectedW;
                    $scope.photoHeight = selectedH;
                }
            }, true)
        }
    ]);