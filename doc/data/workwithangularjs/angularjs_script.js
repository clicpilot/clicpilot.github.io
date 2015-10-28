var testApp = angular.module('testApp', ['ngRoute']);

testApp.config(function($routeProvider) {
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

testApp.controller('createController', function($scope) {
    $scope.message = 'Create Message';


});

testApp.controller('queryController', function($scope) {
    $scope.message = 'Query Message';
    CP_DoAction("QueryMsg");
});



