"use strict";

angular.module('app')
    .controller('paymentCtrl', ['$scope', '$rootScope', '$state',
        function ($scope, $rootScope, $state) {

            $scope.findOrder = function () {
                console.log("call to find order API")
            }
        }
    ]);