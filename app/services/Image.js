'use strict';

angular.module('app')
    .service('Image', ['$q', '$http', 'BASE_URL', 'SITEID', '$httpParamSerializerJQLike',
        function ($q, $http, BASE_URL, SITEID, $httpParamSerializerJQLike) {

            var collectionUrl = BASE_URL + 'catalog/wallpapers';
            var searchCollectionUrl = BASE_URL + 'catalog/search/';
            var instanceUrl = BASE_URL + 'catalog/wallpaper/';
            var sendFavUrl = BASE_URL + 'v2/favorites/send/' + SITEID;

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

            var _search = function (querry) {
                var deferred = $q.defer();

                $http({
                    url: searchCollectionUrl,
                    method: "POST",
                    data: $httpParamSerializerJQLike(querry),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded, charset=UTF-8'}
                }).then(function (result) {
                    deferred.resolve(result.data);
                }, function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            };

            var _sendFavs = function (obj) {
                var deferred = $q.defer();

                $http({
                    url: sendFavUrl,
                    method: "POST",
                    data: $httpParamSerializerJQLike(obj),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded, charset=UTF-8'}
                }).then(function (result) {
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
                },
                search: function (querry) {
                    return _search(querry)
                },
                sendFavs: function (data) {
                    return _sendFavs(data)
                }
            }
        }]);