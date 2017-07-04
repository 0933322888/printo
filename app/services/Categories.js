'use strict';

angular.module('app')
    .service('Categories', ['$q', '$http', 'BASE_URL',
        function ($q, $http, BASE_URL) {
            var categoriesUrl = BASE_URL + 'catalog/categories/0';
            var interiorsUrl = BASE_URL + 'catalog/interiors';

            var _getCategories = function () {
                var deferred = $q.defer();
                $http.get(categoriesUrl).then(function (result) {
                    deferred.resolve(result.data);
                }, function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            };

            var _getInteriors = function () {
                var deferred = $q.defer();
                $http.get(interiorsUrl).then(function (result) {
                    deferred.resolve(result.data);
                }, function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            };

            return {
                getCategories: function () {
                    return _getCategories();
                },
                getInteriors: function () {
                    return _getInteriors();
                }
            }
        }]);
