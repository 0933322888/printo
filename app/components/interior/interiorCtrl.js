"use strict";

angular.module('app')
    .controller('interiorCtrl', ['$scope', '$rootScope', '$state',
        function ($scope, $rootScope, $state) {

            $scope.displayModel = {
                floor: {
                    collection: [1,2,3,4,5,6,7,8],
                    selection: 1
                },
                sofa: {
                    collection: [11,12,13,14],
                    selection: null
                },
                beds: {
                    collection: [21,22,23,24],
                    selection: null
                },
                doors: {
                    collection: [41,42,43,44,45,46,47],
                    selection: 44
                },
                chairs: {
                    collection: [31,32,34,35,36,37],
                    selection: null
                }
            };

            $scope.drag = function (event) {
                event.target.offsetLeft += 50;
            }

        }
    ]);