var scotchApp = angular.module('testApp', ['ngRoute']);

scotchApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'html_angularjs_create.html',
            controller  : 'createController'
        })
        .when('/query', {
            templateUrl : 'html_angularjs_query.html',
            controller  : 'queryController'
        })
});

scotchApp.controller('createController', function($scope) {
    $scope.message = 'Create Message';


});

scotchApp.controller('queryController', function($scope) {
    $scope.message = 'Query Message';
    CP_DoAction("QueryMsg");
});



