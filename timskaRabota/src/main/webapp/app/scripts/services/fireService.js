FirstApp.factory('FireService',['$scope','AuthService',function($scope,AuthService){
	$scope.userName = AuthService.userName;
}]);