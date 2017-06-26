'use strict';

angular.module('app')
    .service('Categories', ['$q', '$http', 'BASE_URL',
        function ($q, $http, BASE_URL) {
            var categoriesUrl = BASE_URL + 'catalog/categories/0';

            var _getCategories = function () {
                var deferred = $q.defer();
                $http.get(categoriesUrl).then(function (result) {
                    deferred.resolve(result.data);
                }, function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            };

            return {
                getCategories: function () {
                    return _getCategories();
                }
            }
        }]);
