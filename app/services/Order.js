'use strict';

angular.module('app')
    .service('Order', ['$q', '$http', 'BASE_URL', '$httpParamSerializerJQLike',
        function ($q, $http, BASE_URL, $httpParamSerializerJQLike) {
            var sendOrderUrl = BASE_URL + 'order';
            var sendOrderUrl2 = "http://print-oboi.com.ua/" + 'order';

            var _sendOrder = function (params) {
                var deferred = $q.defer();
                $http({
                    url: sendOrderUrl,
                    method: "POST",
                    data: $httpParamSerializerJQLike(params),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (result) {
                    deferred.resolve(result.data);
                }, function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            };

            return {
                sendOrder: function (data) {
                    return _sendOrder(data);
                }
            }
        }]);