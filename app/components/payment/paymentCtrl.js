"use strict";

angular.module('app')
    .controller('paymentCtrl', ['$scope', '$rootScope', '$state', 'Payment',
        function ($scope, $rootScope, $state, Payment) {
            $scope.orderId = null;

            $scope.findOrder = function () {
                Payment.getOrder($scope.orderId).then(function (result) {
                    var expireDate = Date.now() - 6480000000;
                    //TODO check with alive order
                    if(!result.status || result.status === 3 || (result.paytime > 0 && result.paytime < expireDate)) {
                        $scope.searchResult = "notFound";
                    } else {
                        //TODO what is payment default page?
                        result.status === 1 ? $scope.searchResult = "found" : "TODO goToPaymentDefault";
                    }
                }, function (err) {
                    console.log(err)
                });
            }
        }
    ]);