/**
 * Created by VinceZK on 9/14/14.
 */
var loginControllers = angular.module('loginControllers',[]);

// create angular controller and pass in $scope and $http
loginControllers.controller('loginCtrl',['$scope','$state',function($scope,$state){
    $scope.SignIn = '登入';
    $scope.focusPWD1 = false;
    // create a blank object to hold our form information
    // $scope will allow this to pass between controller and view
    $scope.formData = {
        email : 'zklee@hotmail.com',
        password : '',
        password1 : '',
        password2 : ''
    };

    // process the form
    $scope.processLogin = function() {
        if ($scope.formData.email == 'zklee@hotmail.com') {
            if ($scope.SignIn == '登入') {
                if ($scope.formData.password == 'init1234') {
                    // $scope.message = 'Initial Login, please change your password!';
                    $scope.errorPassword = '';
                    $scope.errorEmail = '';
                    $scope.errorPwdInconsistant = '';
                    $scope.SignIn = '保存并登入';
                    $scope.focusPWD1 = true;
                    $state.go('login.renewPWD');
                } else if ($scope.formData.password == 'zkle1984') {
                    // $scope.message = 'Login Successful!';
                    $state.go('searchCustomer');
                } else {
                    $scope.errorPassword = '密码错误!';
                }
            } else {
                if ($scope.formData.password1 != $scope.formData.password2) {
                    $scope.errorPwdInconsistant = '密码不一致！';
                } else {
                    $scope.errorPwdInconsistant = '';
                    $state.go('searchCustomer');
                    // $scope.message = 'Login Successful!';
                }
            }

        } else {
            $scope.errorEmail = '账号不存在!';
        }
    }
}]);