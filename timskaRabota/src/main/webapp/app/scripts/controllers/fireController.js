FirstApp.controller('FireController' ,['$scope','AuthService','$firebase','$rootScope',function ($scope,AuthService,$firebase,$rootScope){
	//CREATE A FIREBASE REFERENCE
          var ref = new Firebase("https://sizzling-fire-4229.firebaseio.com/");

          // GET MESSAGES AS AN ARRAY
          $scope.messages = $firebase(ref).$asArray();

          //ADD MESSAGE METHOD
          $scope.addMessage = function(e) {
            //LISTEN FOR RETURN KEY
            if (e.keyCode === 13 && $scope.msg) {

              var name = $rootScope.userData.userName;

              //ADD TO FIREBASE
              $scope.messages.$add({
                name: name,
                text: $scope.msg
              });

              //RESET MESSAGE
              $scope.msg = "";
            }
          }
}]);