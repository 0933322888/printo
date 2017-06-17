var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'infinite-scroll', 'ngSanitize']);

app.constant('BASE_URL', 'http://foto-oboi.com.ua/');

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: "./app/components/menu/menu.html",
                controller: 'menuCtrl'
            })
            .state('app.home', {
                url: "/home",
                templateUrl: "./app/components/home/home.html",
                controller: 'homeCtrl'
            })
            .state('app.wallpapers', {
                url: "/wallpapers",
                templateUrl: "./app/components/wallpapersPane/wallpapers.html",
                controller: 'wallpapersCtrl',
                params: {
                    id: null,
                    name: null,
                    type: null
                }
            })
            .state('app.gluing', {
                url: "/gluing",
                templateUrl: "./app/components/gluing/gluing.html",
                controller: 'gluingCtrl'
            })
            .state('app.textures', {
                url: "/textures",
                templateUrl: "./app/components/textures/textures.html",
                controller: 'texturesCtrl'
            })
            .state('app.services', {
                url: "/services",
                templateUrl: "./app/components/service/services.html",
                controller: 'servicesCtrl'
            })
            .state('app.delivery', {
                url: "/delivery",
                templateUrl: "./app/components/delivery/delivery.html",
                controller: 'deliveryCtrl'
            })
            .state('app.contacts', {
                url: "/contacts",
                templateUrl: "./app/components/contacts/contacts.html",
                controller: 'contactsCtrl'
            })
            .state('app.payment', {
                url: "/payment",
                templateUrl: "./app/components/payment/payment.html",
                controller: 'paymentCtrl'
            })
            .state('app.rooms', {
                url: "/rooms",
                templateUrl: "./app/components/forRooms/rooms.html",
                controller: 'roomsCtrl'
            })
            .state('app.roomstype', {
                url: "/rooms/{roomType}",
                templateUrl: "./app/components/roomType/roomType.html",
                controller: 'roomTypeCtrl'
            })
            .state('app.crop', {
                url: "/crop",
                templateUrl: "./app/components/crop/crop.html",
                controller: 'cropCtrl'
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