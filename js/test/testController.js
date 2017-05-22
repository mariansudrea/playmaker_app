app.controller('testController', ['$scope','$timeout', function($scope,$timeout){
	$scope.test = 23;
	$scope.testFunction = function(){
		return "it works."
	}
	
	$scope.players = [];
	$scope.grid_size = [];
	$scope.grid_size.length = 200;	
	$scope.selected_player = null;


// Grid init with X/Y coordinates for each.

	for (var i = 0; i < $scope.grid_size.length ; i++ ){
		$scope.grid_size[i] = { posX: i % 20,
								posY: Math.floor(i/20)					
			}; 
	}

//	Player Prototypes / Mocks

	$scope.player1 = {
		selected: false,
		current_style:  { 	top:		"40px",
							left:		"40px",
			},
		frames: [	{ 	posX: "2",	posY: "4" }, 
					{ 	posX: "4",	posY: "5" }, 
					{ 	posX: "5",	posY: "9" }, 
					{ 	posX: "6",	posY: "5" }, 
					{ 	posX: "11",	posY: "1" }
			] ,
		transitionTo:	function(index){
				this.current_style= {
						top: ( this.frames[index].posY * 40 ) + "px",
						left: ( this.frames[index].posX * 40 ) + "px"
					}
			}
		
	}
	$scope.player2 = {
		default_color: '#ff0000',
		jersey_number: 14,
		default_shadow: 'none',
		current_style:  { 	top:		"120px",
							left:		"120px",
					'background-color': 	'#ff0000',
			},
		frames: [	{ 	posX: "10",	posY: "5" }, 
					{ 	posX: "7",	posY: "7", highlighted: true}, 
					{ 	posX: "8",	posY: "2", highlighted: false }, 
					{ 	posX: "9",	posY: "7" }, 
					{ 	posX: "3",	posY: "4" }
			] ,
		transitionTo:	function(index){
				if ( this.frames[index].highlighted == true ){
					console.log('%c true value found for highlighted', 'color:red');
					console.log('this.highlighted = ' + this.frames[index].highlighted);
					this.calculated_color = this.default_color ;
//					this.calculated_shadow = "0px 0px 20px 6px rgba(255, 0, 0, 1)"
					this.calculated_shadow = "0px 0px 20px 6px "+ this.default_color;
				} else {
					this.calculated_color = this.default_color;
					this.calculated_shadow = this.default_shadow;
				}
				this.current_style= {
						top: ( this.frames[index].posY * 40 ) + "px",
						left: ( this.frames[index].posX * 40 ) + "px",
						'background-color': this.calculated_color,
						'box-shadow': this.calculated_shadow,
						//add more dialects
						'border': ( this.frames[index].highlighted == true ? '1px solid #38cc24' : "1 px solid transparent" )
					}
			}
		
	}
//  ************END PLAYER PROTOTYPE
//
	$scope.player1.position = "p4";

	$scope.players.push($scope.player1);
	$scope.players.push($scope.player2);
	console.log('players length: ' + $scope.players.length);
	$scope.frames = [0,1,2,3,4];	
	$scope.current_frame_index = 0;

//	GENERAL FUNCTIONS

	$scope.goToFrame = function(destination_frame_index){
//		console.log('starting go to frame function');
		console.log('destination frame: ' + destination_frame_index);
		console.log('current frame: ' + $scope.current_frame_index);
		for ( var i = 0 ; i < $scope.players.length ; i++ ){
//			console.log('handling player : ' + i);
			if ( destination_frame_index > $scope.current_frame_index ){
				$scope.players[i].transitionTo(destination_frame_index);
//				console.log('Going up');
//				console.log('players ' + i + " posX: " + $scope.players[i].frames[$scope.current_frame_index].posX);
			} else if ( destination_frame_index < $scope.current_frame_index ){
//				console.log('Going down');
				$scope.players[i].transitionTo(destination_frame_index);
			}
		}
		$scope.current_frame_index = destination_frame_index;
	}

	$scope.playback = function(){
//		$scope.current_frame_index = 0;
		
		
		var goToNext = function(){
			$scope.goToFrame($scope.current_frame_index+1)
			if ( $scope.current_frame_index < $scope.frames.length-1 ) {
				$timeout( function(){goToNext()}, 1500 )
			}
		}
		if ( $scope.current_frame_index != 0 ){
			$scope.goToFrame(0);
			$timeout( function(){ goToNext() },2300)
		} else {
			goToNext()
		}
	}

	$scope.toggleSelected = function(target_player){
		console.log('clicked on player jersey: ' + target_player.jersey_number);
		if ($scope.selected_player === target_player){
			$scope.selected_player = null;
		} else { $scope.selected_player = target_player }
	}
	$scope.updateSelectedPlayer = function(){
		console.log('Updating selected player : ' + $scope.selected_player);
		$scope.selected_player.current_style.left = ( $scope.selected_player.frames[$scope.current_frame_index].posX * 40 ) + "px";	
		$scope.selected_player.current_style.top = ( $scope.selected_player.frames[$scope.current_frame_index].posY * 40 ) + "px";	
		$scope.selected_player.current_style.border = ( $scope.selected_player.frames[$scope.current_frame_index].highlighted == true ? '1px solid #38cc24' : "1 px solid transparent" )
		$scope.selected_player.current_style['box-shadow'] = ( $scope.selected_player.frames[$scope.current_frame_index].highlighted == true ? "0px 0px 20px 6px " + $scope.selected_player.default_color : "none" )
	}

	$scope.moveSelectedPlayer = function(grid_square_object){
		if ( $scope.selected_player != null ) {
			console.log('move selected function triggered');
			$scope.selected_player.frames[$scope.current_frame_index].posX = grid_square_object.posX;
			$scope.selected_player.frames[$scope.current_frame_index].posY = grid_square_object.posY;
			$scope.updateSelectedPlayer();
		}
	}
	
	$scope.toggleHighlighted = function(){
		//$scope.selected_player.frames[current_frame_index].highlighted = ( $scope.selected_player.frames[current_frame_index] == true ? false : true )
		$scope.updateSelectedPlayer();
	}
}])

