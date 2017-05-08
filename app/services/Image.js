'use strict';

angular.module('app')
    .service('Image', ['$q', '$http', 'BASE_URL', '$httpParamSerializerJQLike', function ($q, $http, BASE_URL, $httpParamSerializerJQLike) {

        var url = BASE_URL + 'catalog/wallpapers';

        var _get = function () {
            var deferred = $q.defer();
            $http.get(url).then(function (result) {
                deferred.resolve(result.data);
            }, function (e) {
                deferred.reject(e);
            });
            return deferred.promise;
        };


        var _getCollection = function (params) {
            var deferred = $q.defer();
            $http({
                url: url,
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

        var _delete = function (deletionData) {
            var deferred = $q.defer();
            $http.post(url + '/delete', deletionData).then(function (result) {
                deferred.resolve(result.data);
            }, function (e) {
                deferred.reject(e);
            });
            return deferred.promise;
        };

        return {
            getImage: function () {
                return _get();
            },
            getCollection: function (collectionParams) {
                return _getCollection(collectionParams)
            }
        }
    }]);