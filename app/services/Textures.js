'use strict';

angular.module('app')
    .service('Textures', ['$q', '$http', 'BASE_URL',
        function ($q, $http, BASE_URL) {
        var texturesUrl = BASE_URL + 'textures/get';

            var _getAll = function () {
                var deferred = $q.defer();
                $http({
                    url: texturesUrl,
                    method: "GET"
                }).then(function (result) {
                    deferred.resolve(result.data);
                }, function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            };

        return {
            getTextures: function () {
                return _getAll();
            }
        }
    }]);