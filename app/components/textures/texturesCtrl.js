"use strict";

angular.module('app')
    .controller('texturesCtrl', ['$scope', '$rootScope', '$state',
        function ($scope, $rootScope, $state) {

            var vinilIndexes = [2,8,9,3,11,12,14,22]; //TODO: are indexes hardcoded? Maybe backend method exists?
            var currIndex = 0;
            $scope.totalSlides = vinilIndexes.length;
            $scope.link = 2; // displays first pic when page is opened
            $scope.currentSlide = 1; // displays first index when page is opened
            $scope.vinilName = $rootScope.LANG.texturesVinilNames[currIndex][$rootScope.curLang];

            $scope.goForward = function () {
                currIndex++;
                if (currIndex > 7) currIndex = 0;
                getParams();
            };

            $scope.goBack = function () {
                currIndex--;
                if (currIndex < 0) currIndex = vinilIndexes.length-1;
                getParams();
            };

            var getParams = function () {
                $scope.link = vinilIndexes[currIndex];
                $scope.currentSlide = currIndex + 1;
                $scope.vinilName = $rootScope.LANG.texturesVinilNames[currIndex][$rootScope.curLang]
            }
        }
    ]);