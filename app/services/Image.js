'use strict';

angular.module('app')
    .service('Image', ['$q', '$http', 'BASE_URL', '$httpParamSerializerJQLike',
        function ($q, $http, BASE_URL, $httpParamSerializerJQLike) {

            var collectionUrl = BASE_URL + 'catalog/wallpapers';
            var searchCollectionUrl = BASE_URL + 'catalog/wallpapers/search/';
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

            var _search = function (querry) {
                //TODO DOES NOT RETURN RESULTS. RESPONSE IS

                // "<div style="border:1px solid #990000;padding-left:20px;margin:0 0 10px 0;">
                //
                // <h4>A PHP Error was encountered</h4>
                //
                // <p>Severity: Notice</p>
                // <p>Message:  Undefined variable: colors</p>
                // <p>Filename: controllers/catalog.php</p>
                // <p>Line Number: 62</p>
                //
                // </div>"

                var deferred = $q.defer();

                $http({
                    url: searchCollectionUrl,
                    method: "POST",
                    data: $httpParamSerializerJQLike(querry)
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
                },
                search: function (querry) {
                    return _search(querry)
                }
            }
        }]);