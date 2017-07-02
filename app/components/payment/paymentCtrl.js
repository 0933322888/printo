"use strict";

angular.module('app')
    .controller('paymentCtrl', ['$scope', '$rootScope', '$state', 'Payment',
        function ($scope, $rootScope, $state, Payment) {
            $scope.orderId = null;

            $scope.findOrder = function () {
                Payment.getOrder($scope.orderId).then(function (result) {
                    var expireDate = Date.now() - 6480000000;
                    $scope.orderData = result;
                    //TODO check with alive order
                    if(!result.status || result.status === 3 || (result.paytime > 0 && result.paytime < expireDate)) {
                        $scope.searchResult = "notFound";
                    } else {
                        //TODO what is payment default page?
                        // TODO how is delivery address is formed? what if there is flat number?
                        result.status === 1 ? $scope.searchResult = "found" : $scope.searchResult = "foundNotPaid";
                    }
                }, function (err) {
                    console.log(err)
                });
            };

            $scope.payInvoice = function(id) {
                Payment.payOrder(id).then(function (res) {
                    console.log(res);
                }, function (err) {
                    console.log(err)
                })
            }
        }
    ]);