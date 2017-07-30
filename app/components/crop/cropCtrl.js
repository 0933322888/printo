"use strict";

//angular.module('app').directive('angularCrop', angularCrop.directive);
// https://www.npmjs.com/package/cropperjs

angular.module('app')
    .controller('cropCtrl', ['$scope', '$stateParams', '$rootScope', '$state', 'Order', 'Textures', 'Image', '$uibModal',
        function ($scope, $stateParams, $rootScope, $state, Order, Textures, Image, $uibModal) {
            $scope.item = $stateParams.photo;
            $scope.vinilTextures = [2,8,3,22,11,12,14,9];
            $scope.flizTextures = [26,25,23,24,27,28,29];
            $scope.filters = {
                g: false,
                f: false,
                s: false
            };

            // this part is because of different image models. Select several favorite
            // images and click on them from favorite section in left menu. The model
            // will be not the same as on big pics from wp pane (no realHeight
            var getImageData = function () {
                Image.getImage($scope.item.id).then(function (result) {
                    $scope.item = result;
                    $scope.photoWidth = Math.round($scope.item.realWidth);
                    $scope.photoHeight = Math.round($scope.item.realHeight);
                }, function (err) {
                    console.log(err)
                })
            };
            if (!$scope.item.realWidth) getImageData();

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
                localStorage.setItem("textures", JSON.stringify(responce));
                //find first non empty index in array
                $scope.selectedTexture = $scope.texturesCollection.findIndex(function (ele) {
                    return ele != undefined;
                })
            }, function (error) {
                console.log(error)
            });

            $scope.openTexture = function (texture) {
                //TODO: API for textures samples. Currently the first pic is on another url

                $scope.textureId = texture;
                var modalInstance = $uibModal.open({
                    animation: true,
                    size: 'lg',
                    windowClass: 'textureWidth',
                    ariaDescribedBy: 'modal-body',
                    scope: $scope,
                    templateUrl: './app/components/crop/modals/openTexture.html',
                    controller: ['$uibModalInstance', '$scope', function ($uibModalInstance, $scope) {


                        $scope.counter = 1;
                        $scope.next = function () {
                            $scope.counter++;
                            if ($scope.counter > 5) $scope.counter = 1;
                        };

                        $scope.previous = function () {
                            $scope.counter--;
                            if ($scope.counter < 1) $scope.counter = 5;
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }]

                });
                modalInstance.result.then(function (selectedItem) {

                }, function () {

                });
            };

            $scope.selectTexture = function (texture) {
                $scope.selectedTexture = texture;
            };

            //TODO: method duplication. Original method is in menuCtrl. Refactor logic
            $scope.goToCateg = function (id, name, type) {
                $state.go('app.wallpapers', {id: id, name: name, type: type})
            };

            $scope.setFilter = function (type) {
                $scope.filters[type] = !$scope.filters[type];

                if (type == "g" && $scope.filters.s == true) $scope.filters.s = false;
                if (type == "s" && $scope.filters.g == true) $scope.filters.g = false;

                $scope.chosenFilters = '';
                angular.forEach($scope.filters, function (value, key) {
                   if (value) $scope.chosenFilters += key;
                });

                $scope.obj.src = 'https://foto-oboi.com.ua/poua/images/wp/' + $scope.item.id + '/' + '580b390' + $scope.chosenFilters + '.jpg';

            };

            $scope.sendOrder = function () {
                var adjustedSelection = $scope.obj.selection.map(function (coord, index) {
                    return index%2 == 0 ? coord/$scope.wCoef : coord/$scope.hCoef;
                });

                var orderModel = {
                    wpId: $scope.item.id,
                    image: $scope.item.realWidth + "," + $scope.item.realHeight,
                    trueDimensions: $scope.item.realWidth + "," + $scope.item.realHeight,
                    crop: adjustedSelection.join(),
                    texture: $scope.selectedTexture,
                    filters: $scope.chosenFilters || '',
                    robot_id: '',
                    manager: '',
                    name: $scope.clientName,
                    phone: $scope.clientPhone,
                    email: $scope.clientEmail || '',
                    comment: $scope.clientComment || ''
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

                    $state.go('app.order', {'order': response});

                }, function (err) {
                    console.log(err);
                });

            }
        }
    ]);