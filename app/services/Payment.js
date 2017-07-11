'use strict';

angular.module('app')
    .service('Payment', ['$q', '$http', 'BASE_URL',
        function ($q, $http, BASE_URL) {
            var orderUrl = BASE_URL + 'bills/get/';
            var paymentUrl = BASE_URL + 'v2/invoice/create/';

            var _get = function (id) {
                var deferred = $q.defer();
                var fullOrderUrl = orderUrl + id;
                $http.get(fullOrderUrl).then(function (result) {
                    deferred.resolve(result.data);
                }, function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            };

            var _pay = function (id) {
                var deferred = $q.defer();
                $http({
                    url: paymentUrl + id,
                    method: "GET"
                }).then(function (result) {
                    deferred.resolve(result);
                }, function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            };

            return {
                getOrder: function (id) {
                    return _get(id);
                },
                payOrder: function (id) {
                    return _pay(id);
                }
            }
        }]
    );