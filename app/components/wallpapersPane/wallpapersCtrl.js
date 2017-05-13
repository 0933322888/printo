"use strict";

angular.module('app')
    .controller('wallpapersCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Image', '$uibModal',
        function ($scope, $rootScope, $state, $stateParams, Image, $uibModal) {
            $scope.categoryName = $stateParams.name;
            $scope.categoryId = $stateParams.id;
            $scope.displayList = [];
            $scope.sortedList = [];
            var fullList = [];
            var filter = {
                where: {
                    categories: $scope.categoryId
                }
            };

            $scope.isLoading = true;
            Image.getCollection(filter).then(function (result) {
                fullList = result;
                $scope.displayList = fullList.slice(0,12);
                $scope.isLoading = false;
            }, function (err) {
                console.log(err);
                $scope.isLoading = false;
            });

            $scope.loadMore = function() {
                var last = $scope.displayList.length;
                var limit = fullList.length;
                var loadItems = limit - last < 12 ? limit - last : 12;
                for(var i = 0; i < loadItems; i++) {
                    $scope.displayList.push(fullList[last+i]);
                }
            };

            // would be good to update backend for not get pics from the same collection
            $scope.fastSort = function (param) {
                $scope.activeMenu = param;
                $scope.isLoading = true;
                var filter = {
                    where: {
                        categories: $scope.categoryId,
                        ratio: param
                    }
                };

                if (param === null) delete filter.where.ratio;

                Image.getCollection(filter).then(function (result) {
                    fullList = result;
                    $scope.displayList = fullList.slice(0,12);
                    $scope.isLoading = false;
                }, function (err) {
                    console.log(err);
                    $scope.isLoading = false;
                });
            };

            $scope.modalOpen = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: './app/components/wallpapersPane/modal/myModalContent.html',
                    controller: ['$uibModalInstance', '$scope', function ($uibModalInstance, $scope) {

                        $scope.ok = function () {
                            $uibModalInstance.close();
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }]

                });
                modalInstance.result.then(function (selectedItem) {

                }, function () {

                });
            };


        }
    ]);