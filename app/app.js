var app = angular.module('app', ['ui.router',  'ui.bootstrap']);

app.constant('BASE_URL', 'http://foto-oboi.com.ua/');

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "./app/components/home/home.html",
            controller: 'homeCtrl'
        })
        .state('home.wallpapers', {
            url: "/wallpapers/:id",
            templateUrl: "./app/components/wallpapersPane/wallpapers.html",
            controller: 'wallpapersCtrl'
        });
        $locationProvider.html5Mode(true);
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    // $httpProvider.interceptors.push('Interceptor');
}])
    .run(['$rootScope', '$state',
        function ($rootScope, $state) {

            $rootScope.$on('$stateChangeError', function (e) {
                e.preventDefault();
                    $state.go('/');

            });

        }]);