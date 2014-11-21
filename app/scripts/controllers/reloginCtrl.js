/**
 * Created by kai_zhang on 2014/9/29.
 */
var reloginControllers = angular.module('reloginControllers',[]);

// create angular controller and pass in $scope and $http
reloginControllers.controller('reloginCtrl',['$window','$scope',
    function($window,$scope){
        $scope.reLogin = function(){
            $window.location.href = '/login';
        }
    }])