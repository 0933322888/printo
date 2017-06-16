"use strict";

angular.module('app')
    .controller('gluingCtrl', ['$scope', '$rootScope', '$state',
        function ($scope, $rootScope, $state) {

            $scope.$on('languageChange', function (event, data) {
                getText();
            });

            var getText = function () {
                $scope.gluingWallpapersText = $rootScope.LANG.gluingWallpapersText[$rootScope.curLang];
            };

            getText();
        }
    ]);