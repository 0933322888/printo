"use strict";

angular.module('app')
    .controller('wallpapersCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Image', '$uibModal', 'SITEID',
        function ($scope, $rootScope, $state, $stateParams, Image, $uibModal, SITEID) {
            $scope.categoryName = $stateParams.name;
            $scope.categoryId = $stateParams.id;
            $scope.categoryType = $stateParams.type;
            $scope.displayList = [];
            $scope.activeMenu = 'fullList';
            $rootScope.favorites = $rootScope.favorites || [];
            $rootScope.favoritesForClass = $rootScope.favoritesForClass || [];
            $scope.fullList = [];

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
            if ($scope.categoryType === 'search') {
                var searchParams = {
                    q: $scope.categoryName,
                    siteid: SITEID
                };
                Image.search(searchParams).then(function (result) {
                    $scope.fullList = result;
                    $scope.displayList = $scope.fullList.slice(0, 12);
                    $scope.isLoading = false;
                }, function (err) {
                    console.log(err);
                    $scope.isLoading = false;
                })
            } else {
                Image.getCollection(getFilter()).then(function (result) {
                    $scope.fullList = result;
                    $scope.displayList = $scope.fullList.slice(0, 12);
                    makeSortedList(result);
                    $scope.isLoading = false;
                }, function (err) {
                    console.log(err);
                    $scope.isLoading = false;
                });
            }

            $scope.loadMore = function () {
                var last = $scope.displayList.length;
                var limit = $scope[$scope.activeMenu].length;
                var loadItems = limit - last < 12 ? limit - last : 12;
                for (var i = 0; i < loadItems; i++) {
                    $scope.displayList.push($scope[$scope.activeMenu][last + i]);
                }
            };

            var makeSortedList = function (data) {
                $scope.vertical = [];
                $scope.horizontal = [];
                $scope.panoramic = [];

                data.forEach(function (ele) {
                    if (ele.ratio <= 100) {
                        $scope.vertical.push(ele);
                    } else {
                        ele.ratio > 180 ? $scope.panoramic.push(ele) : $scope.horizontal.push(ele);
                    }
                })
            };

            $scope.fastSort = function (param) {
                $scope.activeMenu = param;
                $scope.displayList = $scope[param].slice(0, 12);
            };

            $scope.modalOpen = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: './app/components/wallpapersPane/modals/selectionHelp.html',
                    controller: ['$uibModalInstance', '$rootScope', '$scope',
                        function ($uibModalInstance, $rootScope, $scope) {

                        $scope.ok = function () {
                            $uibModalInstance.close();
                        };
                        $scope.similarPicText = $rootScope.LANG.similarPicText[$rootScope.curLang];

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
                                return $scope.fullList.indexOf(item);
                            };

                            $scope.ok = function () {
                                $uibModalInstance.close();
                            };

                            $scope.toggleFavs = function (item) {
                                $scope.$emit('toggleFavs', item);
                            };

                            $scope.previous = function () {
                                var prevItem = currentIndex($scope.item) === 0 ? $scope.fullList.length - 1 : currentIndex($scope.item) - 1;
                                $scope.item = $scope.fullList[prevItem];
                            };

                            $scope.next = function () {
                                var nextItem = currentIndex($scope.item) === $scope.fullList.length - 1 ? 0 : currentIndex($scope.item) + 1;
                                $scope.item = $scope.fullList[nextItem];
                            };

                            $scope.cancel = function () {
                                $uibModalInstance.dismiss('cancel');
                            };

                            Image.getImage($scope.item.id).then(function (data) {
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
                    $scope.toggleFavorites(data);
                }
            });

            $rootScope.$on("toggleFavs", function (event, data) {
                $scope.toggleFavorites(data);
            });

            $scope.toggleFavorites = function (item) {
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
            };


        }
    ]);