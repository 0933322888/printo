"use strict";

//angular.module('app').directive('angularCrop', angularCrop.directive);
// https://www.npmjs.com/package/cropperjs

angular.module('app')
    .controller('cropCtrl', ['$scope', '$stateParams', '$rootScope', '$state', 'Order', 'Textures',
        function ($scope, $stateParams, $rootScope, $state, Order, Textures) {
            $scope.item = $stateParams.photo;
            $scope.vinilTextures = [2,8,3,22,11,12,14,9];
            $scope.flizTextures = [26,25,23,24,27,28,29];

            // removes dragging vertical/horizontal lines if true
            $scope.noVLine = false;
            $scope.noHLine = false;

            $scope.obj = {};
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
            }, true);

            //TODO move it to app.js or texturex controller
            Textures.getTextures().then(function (responce) {
                $scope.texturesCollection = [];
                responce.forEach(function (item) {
                    $scope.texturesCollection[item.id] = item;
               });
                localStorage.setItem("textures", JSON.stringify(responce))
            }, function (error) {
                console.log(error)
            });



            $scope.sendOrder = function () {
                var adjustedSelection = $scope.obj.selection.map(function (coord, index) {
                    return index%2 == 0 ? coord/$scope.wCoef : coord/$scope.hCoef;
                });

                var orderModel = {
                    wpId: $scope.item.id,
                    image: $scope.item.realWidth + "," + $scope.item.realHeight,
                    trueDimensions: $scope.item.realWidth + "," + $scope.item.realHeight,
                    crop: adjustedSelection.join(),
                    texture: 2,
                    filters: '',
                    robot_id: '',
                    manager: '',
                    name: "test",
                    phone:"0931234567",
                    email: "test@test",
                    comment: "test"
                };

                Order.sendOrder(orderModel).then(function (response) {
                    var robotId = response.id;
                    displayOrder(robotId);
                }, function (err) {
                    //TODO: dev-data, remove
                    var response = JSON.parse(localStorage.getItem("orderResult"));
                    displayOrder(response.id);
                    console.log(err)
                });
            };

            var displayOrder = function (id) {
                Order.getRobotData(id).then(function (response) {

                    var link = 'API' + 'images/robots/' + response.s_data.crop.code + '.jpg';
                    $state.go('app.order', {'order': response});

                }, function (err) {
                    console.log(err);
                });

                // Order.displayOrder(id).then(function (response) {
                //     var link = 'API' + 'images/robots/' + response.cropcode + '.jpg';
                //
                // }, function (err) {
                //     console.log(err);
                // })
            }
        }
    ]);