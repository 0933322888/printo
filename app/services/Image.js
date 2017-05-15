'use strict';

angular.module('app')
    .service('Image', ['$q', '$http', 'BASE_URL', '$httpParamSerializerJQLike', function ($q, $http, BASE_URL, $httpParamSerializerJQLike) {

        var collectionUrl = BASE_URL + 'catalog/wallpapers';
        var instanceUrl = BASE_URL + 'catalog/wallpaper/';

        var _get = function (id) {
            var deferred = $q.defer();
            var fullUrl = instanceUrl + id;
            $http.get(fullUrl).then(function (result) {
                deferred.resolve(result.data);
            }, function (e) {
                deferred.reject(e);
            });
            return deferred.promise;
        };


        var _getCollection = function (params) {
            var deferred = $q.defer();
            $http({
                url: collectionUrl,
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
            $http.post(collectionUrl + '/delete', deletionData).then(function (result) {
                deferred.resolve(result.data);
            }, function (e) {
                deferred.reject(e);
            });
            return deferred.promise;
        };

        return {
            getImage: function (id) {
                return _get(id);
            },
            getCollection: function (collectionParams) {
                return _getCollection(collectionParams)
            }
        }
    }]);