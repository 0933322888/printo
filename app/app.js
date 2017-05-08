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