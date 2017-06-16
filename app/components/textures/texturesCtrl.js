"use strict";

angular.module('app')
    .controller('texturesCtrl', ['$scope', '$rootScope', '$state',
        function ($scope, $rootScope, $state) {

            var paperIndexes = [2,8,9,3,11,12,14,22]; //TODO: are indexes hardcoded? Maybe backend method exists?
            var currPaperIndex = 0;
            $scope.totalPaperSlides = paperIndexes.length;
            $scope.paperLink = 2; // displays first pic when page is opened
            $scope.currentPaperSlide = 1; // displays first index when page is opened
            $scope.paperName = $rootScope.LANG.texturesVinilNames[currPaperIndex][$rootScope.curLang];

            var flizelinIndexes = [25,28,26,29,23,24,27]; //TODO: are indexes hardcoded? Maybe backend method exists?
            var currFlizelinIndex = 0;
            $scope.totalFlizSlides = flizelinIndexes.length;
            $scope.flizelinLink = 25; // displays first pic when page is opened
            $scope.currentFlizelinSlide = 1; // displays first index when page is opened
            $scope.flizelinName = $rootScope.LANG.texturesFlizelinNames[currFlizelinIndex][$rootScope.curLang];


            $scope.goForward = function (type) {
                if (type === 'paper') {
                    currPaperIndex++;
                    if (currPaperIndex >= paperIndexes.length) currPaperIndex = 0;
                } else {
                    currFlizelinIndex++;
                    if (currFlizelinIndex >= flizelinIndexes.length) currFlizelinIndex = 0;
                }
                getParams(type);
            };

            $scope.goBack = function (type) {
                if (type === 'paper') {
                    currPaperIndex--;
                    if (currPaperIndex < 0) currPaperIndex = paperIndexes.length-1;
                } else {
                    currFlizelinIndex--;
                    if (currFlizelinIndex < 0) currFlizelinIndex = flizelinIndexes.length-1;
                }
                getParams(type);
            };

            var getParams = function (type) {
                if (type === 'paper') {
                    $scope.paperLink = paperIndexes[currPaperIndex];
                    $scope.currentPaperSlide = currPaperIndex + 1;
                    $scope.paperName = $rootScope.LANG.texturesVinilNames[currPaperIndex][$rootScope.curLang]
                } else {
                    $scope.flizelinLink = flizelinIndexes[currFlizelinIndex];
                    $scope.currentFlizelinSlide = currFlizelinIndex + 1;
                    $scope.flizelinName = $rootScope.LANG.texturesFlizelinNames[currFlizelinIndex][$rootScope.curLang]
                }
            }
        }
    ]);