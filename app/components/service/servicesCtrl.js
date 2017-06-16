"use strict";

angular.module('app')
    .controller('servicesCtrl', ['$scope', '$rootScope', '$state',
        function ($scope, $rootScope, $state) {

            $scope.$on('languageChange', function (event, data) {
                getText();
            });

            var getText = function () {
                $scope.exclusive1 = $rootScope.LANG.exclusive1[$rootScope.curLang];
                $scope.exclusive2 = $rootScope.LANG.exclusive2[$rootScope.curLang];
                $scope.exclusive3 = $rootScope.LANG.exclusive3[$rootScope.curLang];
                $scope.exclusiveServices1 = $rootScope.LANG.exclusiveServices1[$rootScope.curLang];
            };

            getText();

        }
    ]);