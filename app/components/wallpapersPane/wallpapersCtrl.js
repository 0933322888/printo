"use strict";

angular.module('app')
    .controller('wallpapersCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Image', '$uibModal',
        function ($scope, $rootScope, $state, $stateParams, Image, $uibModal) {
            $scope.categoryName = $stateParams.name;
            $scope.categoryId = $stateParams.id;
            $scope.categoryType = $stateParams.type;
            $scope.displayList = [];
            $scope.sortedList = [];
            $rootScope.favorites = $rootScope.favorites || [];
            $rootScope.favoritesForClass = $rootScope.favoritesForClass || [];
            var fullList = [];
            var getFilter = function () {
                if ($scope.categoryType === 'color') {
                    return {
                        where: {
                            color: $scope.categoryId
                        }
                    };
                } else {
                    return {
                        where: {
                            categories: $scope.categoryId
                        }
                    };
                }
            };

            $scope.isLoading = true;
            Image.getCollection(getFilter()).then(function (result) {
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
                $scope.isLoading = true;
                $scope.activeMenu = param;
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
                    templateUrl: './app/components/wallpapersPane/modals/selectionHelp.html',
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

            $scope.openPhoto = function (item) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: './app/components/wallpapersPane/modals/openPhoto.html',
                    controller: ['$uibModalInstance', '$scope', '$rootScope', 'Image',
                        function ($uibModalInstance, $scope, $rootScope, Image) {
                        $scope.item = item;
                        var currentIndex = function (item) {
                            return fullList.indexOf(item);
                        };

                        $scope.ok = function () {
                            $uibModalInstance.close();
                        };

                        $scope.addToFavs = function (item) {
                            $scope.$emit('addToFavs', item);
                        };

                        $scope.previous = function () {
                            var prevItem = currentIndex($scope.item) === 0 ? fullList.length - 1 : currentIndex($scope.item) - 1;
                            $scope.item = fullList[prevItem];
                        };

                        $scope.next = function () {
                            var nextItem = currentIndex($scope.item) === fullList.length - 1 ? 0 : currentIndex($scope.item) + 1;
                            $scope.item = fullList[nextItem];
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };

                        Image.getImage($scope.id).then(function (data) {
                            $scope.tags = data.tags
                        }, function (err) {
                            console.log(err)
                        })
                    }]

                });
                modalInstance.result.then(function (selectedItem) {

                }, function () {

                });
            };
            
            $scope.$on('remove', function (event, data) {
                if (data === "all") {
                    $rootScope.favorites = [];
                    $rootScope.favoritesForClass = [];
                } else {
                    $scope.addToFavorites (data);
                }
            });

            $rootScope.$on("addToFavs", function (event, data) {
                $scope.addToFavorites(data);
            });

            $scope.addToFavorites = function (item) {
                var alreadyInIndex = $rootScope.favorites.findIndex(function (ele, ind) {
                    return ele.id === item.id
                });
                //if not null, then delete from favorites
                if (alreadyInIndex >= 0) {
                    $rootScope.favorites.splice(alreadyInIndex, 1);
                    $rootScope.favoritesForClass[item.id] = null;
                } else {
                    $rootScope.favorites.push(item);
                    $rootScope.favoritesForClass[item.id] = item;
                }
            }

        }
    ]);