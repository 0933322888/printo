"use strict";

angular.module('app')
    .controller('orderCtrl', ['$scope', '$stateParams', 'BASE_URL', '$rootScope', '$state', 'Order',
        function ($scope, $stateParams, BASE_URL, $rootScope, $state, Order) {
            // $scope.order = $stateParams.order;
            if ($stateParams && $stateParams.order) localStorage.setItem("robotData", JSON.stringify($stateParams.order));
            $scope.order = JSON.parse(localStorage.getItem('robotData'));

            //TODO: move to app.js to resolve obj
            Order.displayOrder($scope.order.id).then(function (result) {
                $scope.orderId = result.id
            }, function (err) {

            });

            $scope.croppedImageLink = BASE_URL + 'images/robots/' + $scope.order.s_data.crop.code + '.jpg';
            $scope.isVertical = ($scope.order.s_data.crop.left + $scope.order.s_data.crop.right) == 0;
            $scope.filters = $scope.order.s_data.image.filters;

        }
    ]);