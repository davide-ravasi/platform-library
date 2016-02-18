'use strict';

// Declare app level module which depends on views, and components
angular.module('myContacts', [
  'ngRoute',
  'firebase',
  'myContacts.contacts',
  'myContacts.home'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
