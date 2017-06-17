"use strict";

angular.module('app')
    .controller('roomsCtrl', ['$scope', '$rootScope', '$state',
        function ($scope, $rootScope, $state) {

            $scope.categoriesList = [
                // $rootScope.LANG.categories.
            ];

            $scope.goToCategory = function (room) {
                $state.go("app.room", room)
            }

        }
    ]);