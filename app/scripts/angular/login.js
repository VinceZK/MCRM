/**
 * Created by kai_zhang on 2014/9/19.
 */
var login = angular.module('login',
    ['ui.router','ngResource']);

login.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
        .otherwise('/login');

    $stateProvider
        .state('renewPWD', {
            url: '/login/renewPWD',
            templateUrl: '/views/renewPWD.html'
        })
/*        .state('index',{
            redirectTo: '/index'
        })*/
    $locationProvider.html5Mode(true);
})

login.controller('loginCtrl',['$scope','$rootScope','$state','$window', 'auth',
    function($scope,$rootScope,$state,$window,auth){
        $scope.SignIn = '登入';
        $scope.focusPWD1 = false;
        // create a blank object to hold our form information
        // $scope will allow this to pass between controller and view
        $scope.formData = {
            email : '',
            password : '',
            password1 : '',
            password2 : ''
        };

        // process the form
        $scope.processLogin = function() {
            if ($scope.SignIn == '登入') {
                auth.login_resource({
                        username: $scope.formData.email,
                        password: $scope.formData.password
                    },
                    function (data) {
                        $rootScope.currentUser = data.userInfo;
                        $scope.errorPassword = data.otherInfo.errorPassword;
                        $scope.errorEmail = data.otherInfo.errorEmail;
                        if(!data.userInfo)$scope.errorPassword = data.otherInfo.message;
                        if($scope.errorPassword || $scope.errorEmail)
                            return;
                        if (data.otherInfo.message == 'ChangePWD') {
                            $scope.SignIn = '保存并登入';
                            $scope.focusPWD1 = true;
                            $state.go('renewPWD');
                            return;
                        }

                        $window.location.href = '/app/searchCustomer';
                    },
                    function (err) {
                        $scope.message = err;
                    });
            }else{
                auth.save_login({
                        username: $scope.formData.email,
                        password: $scope.formData.password,
                        password1: $scope.formData.password1,
                        password2: $scope.formData.password2
                    },
                    function (data) {
                        $rootScope.user = data.userInfo;
                        $window.location.href = '/app/searchCustomer';
                    },
                    function (err) {
                        $scope.message = err;
                    });
            }
        }

        /**
         * Validate the form data
         */
        $scope.validateFormData = function(){
            if($scope.formData.password1 != $scope.formData.password2 ||
                $scope.formData.password1 == $scope.formData.password){
                return false;
            }
            else{
                return true;
            }
        }
    }])

login.factory('auth',function($http, $resource){

    return{
        login: function(user, success, err) {
            $http.post('/api/login', user)
                .success(function(data){
                    success(data);
                })
                .error(err);
        },

        login_resource: function (user, success, error) {
            $resource('/api/login').save(user,
                function(value){
                    success(value);
                },
                function(err){
                    error(err);
                } )
        },

        save_login: function(user, success, error){
            $resource('/api/save_login').save(user,
                function(value){
                    success(value);
                },
                function(err){
                    error(err);
                } )
        },

        currentUser: function () {
            $resource('/api/login').get(function (user) {
                $rootScope.currentUser = user;
            })
        }
    }
})

