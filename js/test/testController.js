app.controller('testController', ['$scope', function($scope){
	$scope.test = 23;
	$scope.testFunction = function(){
		return "it works."
	}
	
	$scope.players = [];
	$scope.grid_size = [];
	$scope.grid_size.length = 200;	
	for (var i = 0; i < $scope.grid_size.length ; i++ ){
		$scope.grid_size[i] = i; 
	}

//	Player Prototype

	$scope.player1 = {
		current_style:  { 	top:		"40px",
							left:		"40px",
			},
		frames: [	{ 	posX: "2",	posY: "4" }, 
					{ 	posX: "4",	posY: "5" }, 
					{ 	posX: "11",	posY: "1" }
			] ,
		transitionTo:	function(index){
				this.current_style= {
						top: ( this.frames[index].posY * 40 ) + "px",
						left: ( this.frames[index].posX * 40 ) + "px"
					}
			}
		
	}
//  ************END PLAYER PROTOTYPE
//
	$scope.player1.position = "p4";

	$scope.players.push($scope.player1);

	$scope.frames = [0,1,2];	
	$scope.current_frame_index = 0;
//	GENERAL FUNCTIONS
	$scope.goToFrame = function(destination_frame_index){
//		console.log('starting go to frame function');
		console.log('destination frame: ' + destination_frame_index);
		console.log('current frame: ' + $scope.current_frame_index);
		for ( var i = 0 ; i < $scope.players.length ; i++ ){
			if ( destination_frame_index > $scope.current_frame_index ){
				$scope.players[i].transitionTo(destination_frame_index);
				$scope.current_frame_index = destination_frame_index;
				console.log('Going up');
//				console.log('players ' + i + " posX: " + $scope.players[i].frames[$scope.current_frame_index].posX);
			} else if ( destination_frame_index < $scope.current_frame_index ){
				console.log('Going down');
				$scope.players[i].transitionTo(destination_frame_index);
				$scope.current_frame_index = destination_frame_index;
			}
		}
	}

}])

