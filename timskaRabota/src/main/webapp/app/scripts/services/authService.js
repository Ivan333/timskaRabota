FirstApp.factory('AuthService', ['$http', '$rootScope',function ($http,$rootScope) {
	  var authService = {};
	  

	  authService.login = function () {
	  	console.log("enter function from AuthService");
	 }
	 authService.setUserName = function(username){
	 	$rootScope.userData = {
	 		userName: username
	 	}
	 }

	 authService.ClearUserData = function () {
            $rootScope.userData = {};
     };
	  return authService;
	}]);