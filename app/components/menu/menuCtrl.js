"use strict";

angular.module('app')
    .controller('menuCtrl', ['$scope', '$rootScope', '$state', '$http', '$uibModal',
        function ($scope, $rootScope, $state, $http, $uibModal) {

            $scope.radioModel = null;
            $scope.popular = [54, 70, 133, 71, 18];
            $scope.categories = [1587, 1588, 56, 60, 1583, 142, 59, 69, 25, 120, 1573, 132, 125, 128, 118, 140, 1586, 143, 134];
            //TODO replace with interiors
            $scope.interiors = [];

            $scope.goToMenu = function (param) {
                var newState;
                if (param === 'home') {
                    $scope.radioModel = null;
                    newState = 'app.' + param;
                } else {
                    newState = 'app.' + $scope.radioModel;
                }
                $state.go(newState);
            };

            $scope.setLanguage = function (language) {
                $rootScope.curLang = language;
                $scope.$broadcast('languageChange', language);
                getCategories();
            };

            $scope.goToCateg = function (id, name, type) {
                $scope.radioModel = null;
                $state.go('app.wallpapers', {id: id, name: name, type: type})
            };

            $scope.removeFav = function (item) {
                $scope.$broadcast('remove', item);
            };

            $scope.saveArc = function () {
                //TODO: save arc
            };

            $scope.search = function () {
                $scope.goToCateg(null, $scope.searchText, 'search');
            };

            $scope.sendToFriend = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaDescribedBy: 'modal-body',
                    templateUrl: './app/components/menu/modals/sendToFriend.html',
                    controller: ['$uibModalInstance', '$scope', function ($uibModalInstance, $scope) {

                        $scope.send = function () {
                            //TODO: send to friend API
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

            $scope.recall = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: './app/components/menu/modals/recall.html',
                    controller: ['$uibModalInstance', '$scope', 'Requests', '$timeout',
                        function ($uibModalInstance, $scope, Requests, $timeout) {

                        $scope.requestSent = false;
                        $scope.sendRequest = function () {
                            var data = {
                                name: $scope.name,
                                phone: $scope.phone,
                                email: $scope.email,
                                comment: $scope.comment
                            };
                            Requests.recall(data);
                            $scope.requestSent = true;
                            $timeout(function () {
                                $uibModalInstance.close();
                            }, 2500);
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

            $scope.loadOwn = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    size: 'lg',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: './app/components/menu/modals/loadOwn.html',
                    controller: ['$uibModalInstance', '$scope', function ($uibModalInstance, $scope) {

                        $scope.orderCalc = function () {
                            //TODO: order calculations API
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