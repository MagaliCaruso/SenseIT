angular.module('starter.controllers', ['starter.services', 'ngOpenFB'])

.controller('AppCtrl', function($scope, $state, $window, $ionicModal, $timeout, ngFB, $ionicPlatform) {
  
  // Form data for the login modal
  $scope.loginData = {};
 
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  
    $ionicPlatform.ready(function() {  
      
      var token = window.localStorage.getItem('TokenResponse');
      
      if (token === null)
      {
        $scope.login();
      }else
      {
        //$state.go('browse');
      }
      
      });
      
    });
      /*ngFB.getLoginStatus(function (response) {
        alert(response.status);
        console.log(response);

        if (response.status !== 'connected') {
          $scope.login();
        }        
        $scope.statusChangeCallback(response);*/
      
 
          

  

 /* $scope.statusChangeCallback = function(){
      if(response.status === 'connected'){

        alert('conectada');
      }else if( response.status === 'not_authorized'){
        alert('no aut');
      }else{
        alert('otro');
      }
    };  */

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.fbLogin = function () {
    ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                window.localStorage.setItem('TokenResponse', response.authResponse.accessToken);
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
};
  
})


.controller('SessionsCtrl', function($scope, Session) {
    $scope.sessions = Session.query();
})

.controller('SessionCtrl', function($scope, $stateParams, Session, ngFB) {
    $scope.session = Session.get({sessionId: $stateParams.sessionId});

    $scope.share = function (event) {
    ngFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
            message: "I'll be attending: '" + $scope.session.title + "' by " +
            $scope.session.speaker
        }
    }).then(
        function () {
            alert('The session was shared on Facebook');
        },
        function () {
            alert('An error occurred while sharing this session on Facebook');
        });
};
})

.controller('ProfileCtrl', function ($scope, ngFB) {

 ngFB.api({
        path: '/me',
        params: {access_token: window.localStorage.TokenResponse,fields: 'id,name'}
    }).then(
        function (user) {
            $scope.user = user;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        });
  
})
;;