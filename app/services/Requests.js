'use strict';

angular.module('app')
    .service('Requests', ['$q', '$http', 'BASE_URL', 'SITEID', '$httpParamSerializerJQLike',
        function ($q, $http, BASE_URL, SITEID, $httpParamSerializerJQLike) {
        var recallUrl = BASE_URL + 'v2/requests/insert/' + SITEID + '/recall';
        var precalcUrl = BASE_URL + 'v2/requests/insert/' + SITEID + '/robot';

            var _recall = function (params) {
                var deferred = $q.defer();
                $http({
                    url: recallUrl,
                    method: "POST",
                    data: $httpParamSerializerJQLike(params),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded, charset=UTF-8'}
                }).then(function (result) {
                    deferred.resolve(result.data);
                }, function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            };


        return {
            recall: function (data) {
                return _recall(data);
            }
        }
    }]);