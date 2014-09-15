/**
 * Created by kai_zhang on 2014/9/15.
 */

var searchControllers = angular.module('searchControllers',[]);

// create angular controller and pass in $scope and $http
searchControllers.controller('searchCtrl',['$scope','$state',function($scope,$state){
    $scope.focusPhone = true;

    // Initial dropdown list
    $scope.saleOrgs = [
        {
            saleOrgID: '0251',
            saleOrgDesc: '世茂外滩新城'
        },
        {
            saleOrgID: '0252',
            saleOrgDesc: '世茂君望野'
        }
    ];

    $scope.currentSaleOrg = $scope.saleOrgs[1];

    // process the form
    $scope.processSearch = function() {
        $state.go('detailCustomer');
    }
}]);