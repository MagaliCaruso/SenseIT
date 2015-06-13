angular.module('starter.services', ['ngResource'])

.factory('login', function ($resource) {

    //return $resource('http://localhost:5000/sessions/:sessionId');
    return $resource('http://localhost:5000/login')
});