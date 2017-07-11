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
                        // TODO how is delivery address is formed? what if there is flat number?
                        result.status === '1' ? $scope.searchResult = "found" : $scope.searchResult = "foundNotPaid";
                    }
                }, function (err) {
                    console.log(err)
                });
            };

            $scope.payInvoice = function(id) {
                Payment.payOrder(id).then(function (res) {
                    //TODO replace with file download
                    $window.open(res.config.url, '_blank');
                }, function (err) {
                    console.log(err)
                })
            }
        }
    ]);