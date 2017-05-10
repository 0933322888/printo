var app = angular.module('app', ['ui.router',  'ui.bootstrap', 'infinite-scroll']);

app.constant('BASE_URL', 'http://foto-oboi.com.ua/');

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/home");


    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "./app/components/home/home.html",
            controller: 'homeCtrl'
        })
        .state('home.wallpapers', {
            url: "/wallpapers",
            templateUrl: "./app/components/wallpapersPane/wallpapers.html",
            controller: 'wallpapersCtrl',
            params: {
                id: null,
                name: null
            }
        });
        $locationProvider.html5Mode(true);
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    // $httpProvider.interceptors.push('Interceptor');
}])
    .run(['$rootScope', '$state', '$http',
        function ($rootScope, $state, $http) {
            $rootScope.curLang = $rootScope.curLang || 'ru';
            $http.get('dist/languages.json').then(function (responce) {
                $rootScope.LANG = responce.data;
            }, function (err) {
                console.log(err)
            });


            $rootScope.$on('$stateChangeError', function (e) {
                e.preventDefault();
                    $state.go('home');

            });

        }]);
'use strict';

angular.module('app')
    .service('Image', ['$q', '$http', 'BASE_URL', '$httpParamSerializerJQLike', function ($q, $http, BASE_URL, $httpParamSerializerJQLike) {

        var url = BASE_URL + 'catalog/wallpapers';

        var _get = function () {
            var deferred = $q.defer();
            $http.get(url).then(function (result) {
                deferred.resolve(result.data);
            }, function (e) {
                deferred.reject(e);
            });
            return deferred.promise;
        };


        var _getCollection = function (params) {
            var deferred = $q.defer();
            $http({
                url: url,
                method: "POST",
                data: $httpParamSerializerJQLike(params),
                headers: {'Content-Type': 'application/x-www-form-urlencoded, charset=UTF-8'}
            }).then(function (result) {
                deferred.resolve(result.data);
            }, function (e) {
                deferred.reject(e);
            });
            return deferred.promise;
        };

        var _delete = function (deletionData) {
            var deferred = $q.defer();
            $http.post(url + '/delete', deletionData).then(function (result) {
                deferred.resolve(result.data);
            }, function (e) {
                deferred.reject(e);
            });
            return deferred.promise;
        };

        return {
            getImage: function () {
                return _get();
            },
            getCollection: function (collectionParams) {
                return _getCollection(collectionParams)
            }
        }
    }]);
"use strict";

angular.module('app')
    .controller('homeCtrl', ['$scope', '$rootScope', '$state', 'Image', '$http',
        function ($scope, $rootScope, $state, Image, $http) {

            //$scope.paramID = $routeParams.paramID;

            $scope.setLanguage = function (language) {
              $rootScope.curLang = language;
            };

            $scope.goToCateg = function (id, name) {
              $state.go('home.wallpapers', {id: id, name: name})
            };

            $http.get('dist/categories.json').then(function (resp) {
                var categories = resp.data;

                $scope.popular = [
                    {name: categories[54]["name_" + $rootScope.curLang], id: 54},
                    {name: categories[70].name_ru, id: 70},
                    {name: categories[133].name_ru, id: 133},
                    {name: categories[71].name_ru, id: 71},
                    {name: categories[18].name_ru, id: 18}
                ];

                $scope.categories = [
                    {name: categories[1587].name_ru, id: 1587},
                    {name: categories[1588].name_ru, id: 1588},
                    {name: categories[56].name_ru, id: 56},
                    {name: categories[60].name_ru, id: 60},
                    {name: categories[1583].name_ru, id: 1583},
                    {name: categories[142].name_ru, id: 142},
                    {name: categories[59].name_ru, id: 59},
                    {name: categories[69].name_ru, id: 69},
                    {name: categories[25].name_ru, id: 25},
                    {name: categories[120].name_ru, id: 120},
                    {name: categories[1573].name_ru, id: 1573},
                    {name: categories[132].name_ru, id: 132},
                    {name: categories[125].name_ru, id: 125},
                    {name: categories[128].name_ru, id: 128},
                    {name: categories[118].name_ru, id: 118},
                    {name: categories[140].name_ru, id: 140},
                    {name: categories[1586].name_ru, id: 1586},
                    {name: categories[143].name_ru, id: 143},
                    {name: categories[134].name_ru, id: 134}
                ];

            });


        }
    ]);
"use strict";

angular.module('app')
    .controller('wallpapersCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Image',
        function ($scope, $rootScope, $state, $stateParams, Image) {

            $scope.categoryName = $stateParams.name;

            var filter = {
                where: {
                    categories: $stateParams.id
                }
            };
            $scope.fullList = [];
            $scope.list = [];

            Image.getCollection(filter).then(function (result) {
                $scope.fullList = result;
                $scope.list = $scope.fullList.slice(0,12);
            }, function (err) {
                console.log(err);
            });

            $scope.loadMore = function() {
                var last = $scope.list.length;
                var limit = $scope.fullList.length;
                var loadItems = limit - last < 12 ? limit - last : 12;
                for(var i = 0; i < loadItems; i++) {
                    $scope.list.push($scope.fullList[last+i]);
                }
            };
        }
    ]);