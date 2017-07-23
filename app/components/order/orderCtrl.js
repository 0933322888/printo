"use strict";

angular.module('app')
    .controller('orderCtrl', ['$scope', '$stateParams', 'BASE_URL', '$rootScope', '$state',
        function ($scope, $stateParams, BASE_URL, $rootScope, $state) {
            // $scope.order = $stateParams.order;
            if($stateParams && $stateParams.order) localStorage.setItem("robotData", JSON.stringify($stateParams.order));
            $scope.order = JSON.parse(localStorage.getItem('robotData'));


            $scope.croppedImageLink = BASE_URL + 'images/robots/' + $scope.order.s_data.crop.code + '.jpg';
            $scope.isVertical = ($scope.order.s_data.crop.left + $scope.order.s_data.crop.right) == 0;
            $scope.filters = "";

            angular.forEach($scope.order.s_data.image.filters, function (value, key) {
                if(value) {

                }

            })

        }
    ]);