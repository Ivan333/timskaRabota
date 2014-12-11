
FirstApp.controller('studContr', ['$scope','Grade','subjectsFactory',
    function($scope,Grade,subjectsFactory) {
	var fb = new Firebase('https://sizzling-fire-4229.firebaseio.com/');
      $scope.subjects = subjectsFactory.getSubjects();
      $scope.grades = Grade.getGradesAsArray();
      $scope.addGrade = function(){
    	  var sub = $scope.sub;
    	  var grade = $scope.grade;
    	  Grade.setGrade(sub,grade);
    	  $scope.grades = Grade.getGradesAsArray();
    	  $scope.sub='';
    	  $scope.grade='';
      }
      $scope.removeGrade = function(g){
    	  var sub = $scope.item;
    	  var grade = $scope.grade;
    	  Grade.removeGrade(g);
    	  $scope.grades = Grade.getGradesAsArray();
      }
    }]); 
