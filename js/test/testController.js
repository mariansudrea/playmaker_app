app.controller('testController', ['$scope', function($scope){
	$scope.test = 23;
	$scope.testFunction = function(){
		return "it works."
	}
}])

