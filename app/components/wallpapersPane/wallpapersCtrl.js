"use strict";

angular.module('app')
    .controller('wallpapersCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Image',
        function ($scope, $rootScope, $state, $stateParams, Image) {
            $scope.filter = $stateParams.id;

            var filter = {
                where: {
                    categories: $stateParams.id
                }
            };

            $scope.list = [];

            Image.getCollection(filter).then(function (result) {
                $scope.list = result;
            }, function (err) {

            })
        }
    ]);