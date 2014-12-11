FirstApp.controller('LoginController', ['$scope', '$rootScope', '$location','AuthService',function ($scope,$rootScope,$location,Auth) {
	 $scope.login = function(){
	 	Auth.setUserName($scope.username);
        $location.path('/fire');
	 }
}]);
