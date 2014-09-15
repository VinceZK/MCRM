/**
 * Created by kai_zhang on 2014/9/15.
 */
'use strict';

// define angular module/app
var mcrm = angular.module('mcrm', ['ui.router',
                                   'ui.utils',
                                   'dkDirectives',
                                   'dkFilters',
                                   'loginControllers',
                                   'searchControllers',
                                   'detailControllers'
                                    ]);

mcrm.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('login', {
            url: 'login',
            templateUrl: '/views/component/login.html',
            controller:'loginCtrl'
        })
        .state('login.renewPWD', {
            url: 'login/renewPWD',
            templateUrl: '/views/component/renewPWD.html',
            controller:'loginCtrl'
        })
        .state('searchCustomer', {
            url: 'searchCustomer',
            templateUrl: '/views/component/customer_search.html',
            controller:'searchCtrl'
        })
        .state('detailCustomer', {
            url: 'detailCustomer',
            templateUrl: '/views/component/customer_detail.html',
            controller:'custDetailCtrl'
        })

    $locationProvider.html5Mode(true);
});

mcrm.controller('mcrmCtrl',['$scope','$state',function($scope,$state){
    $state.go('login');
}])
