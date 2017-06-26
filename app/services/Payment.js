'use strict';

angular.module('app')
    .service('Payment', ['$q', '$http', 'BASE_URL',
        function ($q, $http, BASE_URL) {
            var orderUrl = BASE_URL + 'bills/get/';

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

            return {
                getOrder: function (id) {
                    return _get(id);
                }
            }
        }]
    );