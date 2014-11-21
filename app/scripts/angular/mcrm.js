/**
 * Created by kai_zhang on 2014/9/15.
 */
'use strict';

// define angular module/app
var mcrm = angular.module('mcrm', ['ui.router',
                                   'ui.utils',
                                   'http-auth-interceptor',
                                   'ngCookies',
                                   'ngResource',
                                   'searchControllers',
                                   'detailControllers',
                                   'reloginControllers'
                                    ]);

mcrm.config(['$stateProvider','$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
        .when('/searchCustomer','searchCustomer')
        .otherwise('/app');

    $stateProvider
        .state('reLogin', {
            url: '/app/relogin',
            templateUrl: '/views/relogin.html',
            controller: 'reloginCtrl'
        })
        .state('searchCustomer', {
            url: '/app/searchCustomer',
            templateUrl: '/views/customer_search.html',
            controller:'searchCtrl'
        })
        .state('detailCustomer', {
            url: '/app/detailCustomer',
            templateUrl: '/views/customer_detail.html',
            controller:'custDetailCtrl'
        })
    $locationProvider.html5Mode(true);
}])
.run(['$rootScope','$state', '$location', 'auth',
     function ($rootScope,$state,$location,auth){
    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
        // if no currentUser and on a page that requires authorization then try to update it
        // will trigger 401s if user does not have a valid session
        if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
            auth.currentUser();
        }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
        $state.go('reLogin');
        return false;
    });
}]);

mcrm.controller('mcrmCtrl',['$scope','$state',function($scope,$state){
    //$state.go('searchCustomer');
}]);
