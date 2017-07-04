"use strict";

angular.module('app')
    .controller('paymentCtrl', ['$scope', '$rootScope', '$state', '$window', 'Payment',
        function ($scope, $rootScope, $state, $window, Payment) {
            $scope.orderId = null;

            $scope.findOrder = function () {
                Payment.getOrder($scope.orderId).then(function (result) {
                    var expireDate = Date.now() - 6480000000;
                    $scope.orderData = result;
                    var paytime = Date.parse(result.paytime);
                    if(!result.status || result.status === '3' || (paytime > 0 && paytime < expireDate)) {
                        $scope.searchResult = "notFound";
                    } else {
                        //TODO what is payment default page?
                        // TODO how is delivery address is formed? what if there is flat number?
                        result.status === '1' ? $scope.searchResult = "found" : $scope.searchResult = "foundNotPaid";
                    }
                }, function (err) {
                    console.log(err)
                });
            };

            $scope.payInvoice = function(id) {
                var url = "http://print-oboi.com.ua/payment/invoice/" + id;
                $window.open(url, '_blank');
                // TODO switch to service when backend is ready
                // Payment.payOrder(id).then(function (res) {
                //     console.log(res);
                // }, function (err) {
                //     console.log(err)
                // })
            }
        }
    ]);