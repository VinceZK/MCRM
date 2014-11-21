/**
 * Created by kai_zhang on 2014/9/29.
 */
'use strict';

angular.module('mcrm')
    .factory('auth',['$resource', '$rootScope',
        function($resource,$rootScope){

        return{
            currentUser: function () {
                $resource('/api/login').get(function (user) {
                    $rootScope.currentUser = user;
                })
            }
        }
    }])