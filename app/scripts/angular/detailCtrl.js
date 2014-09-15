/**
 * Created by kai_zhang on 2014/9/15.
 */
var detailControllers = angular.module('detailControllers',[]);

// create angular controller and pass in $scope and $http
detailControllers.controller('custDetailCtrl',['$scope','$state',function($scope,$state){
    // process the form
    $scope.processSearch = function() {
        $state.go('detailCustomer');
    }
}]);