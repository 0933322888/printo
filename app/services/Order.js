'use strict';

angular.module('app')
    .service('Order', ['$q', '$http', 'BASE_URL', 'SITEID', '$httpParamSerializerJQLike',
        function ($q, $http, BASE_URL, SITEID, $httpParamSerializerJQLike) {
            var sendOrderUrl = BASE_URL + 'v2/requests/insert/'+ SITEID + '/robot';
            var displayOrderUrl = BASE_URL + 'orders/get/';
            var robotIdUrl = BASE_URL + 'v2/requests/get/';

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

            var _displayOrder = function (id) {
                var deferred = $q.defer();
                $http({
                    url: displayOrderUrl + id,
                    method: "GET"
                }).then(function (result) {
                    deferred.resolve(result.data);
                }, function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            };

            var _getRobotData = function (id) {
                var deferred = $q.defer();
                $http({
                    url: robotIdUrl + id,
                    method: "GET"
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
                },
                displayOrder: function (id) {
                    return _displayOrder(id);
                },
                getRobotData: function (id) {
                    return _getRobotData(id);
                }
            }
        }]);
