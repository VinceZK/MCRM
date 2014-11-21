/**
 * Created by VinceZK on 9/14/14.
 */
var dkDirectives = angular.module('dkDirectives',[]);


// Define a directive and have it $watch a property/trigger so it knows when to focus the element:
dkDirectives.directive('focusMe', function($timeout, $parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function(value) {
                console.log('value=',value);
                if(value === true) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
            element.bind('blur', function() {
                console.log('blur')
                scope.$apply(model.assign(scope, false));
            })
        }
    };
});
dkDirectives.directive('loginFormAutofillFix', function(){
    return{
        restrict: 'A',
        link:function(scope, elem, attrs) {
            if (!attrs.ngSubmit) {
                return;
            }
            setTimeout(function () {
                elem.unbind("submit").bind("submit", function (e) {
                    //DO NOT PREVENT!  e.preventDefault();
                    elem.find("input").triggerHandler("input");
                    scope.$apply(attrs.ngSubmit);
                });
            }, 0);
        }
    }


});
