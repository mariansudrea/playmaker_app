app.controller('testController', ['$scope','$timeout', function($scope,$timeout){
	$scope.test = 23;
	$scope.testFunction = function(){
		return "it works."
	}
//	General purpose variables
//
	$scope.new_play_model = {};
	$scope.team1_input = 1;
	$scope.team2_input = 1;
	$scope.team1_temp_color = "red";
	$scope.team2_temp_color = "blue";
	$scope.frames_input = 1;
	$scope.frames_input_validated = 1;

	$scope.team1_temp_style = {}; 	
	$scope.team2_temp_style = {}; 	


	$scope.players = [];
	$scope.grid_size = [];
	$scope.grid_size.length = 200;	
	$scope.selected_player = null;
	$scope.mode = "edit";
	$scope.modal_visible = false;
	$scope.team1_preview = [ "" ];
	$scope.team2_preview = [ "" ];
	$scope.new_play_model.team1 = $scope.team1_preview;
	$scope.new_play_model.team2 = $scope.team2_preview;
// Grid init with X/Y coordinates for each.

	for (var i = 0; i < $scope.grid_size.length ; i++ ){
		$scope.grid_size[i] = { posX: i % 20,
								posY: Math.floor(i/20),
								occupied: false						
			}; 
	}
	$scope.default_positions1 = [ [3,1],[3,4],[3,7],[6,3],[6,8],[8,9],[0,4] ];
	$scope.default_positions2 = [ [10,1],[10,4],[10,8],[12,2],[12,5],[12,8],[17,4] ];

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
		team: 	1,
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
	$scope.addPlayer = function(color,default_position,number){
		var new_current_frames = [];

		for ( var i = 0 ; i < $scope.frames_input_validated ; i++) {
			new_current_frames.push({
				posX: default_position[0],
				posY: default_position[1],
				highlighted: false
			});
		}
		var new_current_style = {  
						'background-color': color,
						'box-shadow': this.calculated_shadow,
						//add more dialects
						'border': "1 px solid transparent", 
						top: ( default_position[1] * 40 ) + "px",
						left: ( default_position[0] * 40 ) + "px",
			}

		$scope.players.push({
			default_color: 		color,
			jersey_number: 		number,
			default_shadow: 	'none',
			current_style: 		new_current_style,
			frames: 			new_current_frames,
			transitionTo:	function(index){
				if ( this.frames[index].highlighted == true ){
					console.log('%c true value found for highlighted', 'color:red');
					console.log('this.highlighted = ' + this.frames[index].highlighted);
//					this.calculated_shadow = "0px 0px 20px 6px rgba(255, 0, 0, 1)"
					this.calculated_shadow = "0px 0px 20px 6px "+ this.default_color;
				} else {
					this.calculated_shadow = this.default_shadow;
				}
				this.current_style= {
						top: ( this.frames[index].posY * 40 ) + "px",
						left: ( this.frames[index].posX * 40 ) + "px",
						'background-color': this.default_color,
						'box-shadow': this.calculated_shadow,
						//add more dialects
						'border': ( this.frames[index].highlighted == true ? '1px solid #38cc24' : "1 px solid transparent" )
					}
			}
			 
		})
	}

	$scope.generateNewPlay = function(){
		console.log('generating new play');
		$scope.modal_visible = false;
		$scope.frames = [];
		for ( var i = 0 ; i < $scope.frames_input_validated ; i++ ) {
			$scope.frames.push(i);
		}
		$scope.players = [];
		for ( i = 0 ; i < $scope.team1_preview.length; i++ ) {
			$scope.addPlayer( $scope.team1_temp_color, $scope.default_positions1[i], i )
		}
		for ( i = 0 ; i < $scope.team2_preview.length ; i++ ) {
			$scope.addPlayer( $scope.team2_temp_color, $scope.default_positions2[i], i )
		}
		$scope.addPlayer( "aqua", [9,5], 22 )

	//	for ( i = 
	}


	
//  ************END PLAYER PROTOTYPE
//
//	$scope.player1.position = "p4";

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
		$scope.play_data_model = JSON.stringify($scope.players);
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
			if ( $scope.mode == "edit" ){
				$scope.selected_player.frames[$scope.current_frame_index].posX = grid_square_object.posX;
				$scope.selected_player.frames[$scope.current_frame_index].posY = grid_square_object.posY;
			} else {
				for ( var i = $scope.current_frame_index ; i < $scope.frames.length ; i++ ){
					$scope.selected_player.frames[i].posX = grid_square_object.posX;
					$scope.selected_player.frames[i].posY = grid_square_object.posY;
				}
			}
			$scope.updateSelectedPlayer();
		}
	}
	

	$scope.toggleMode = function(){
		$scope.mode = ( $scope.mode == "edit" ? "create" : "edit" );
	}

	$scope.updatePreviewTeams = function(){
		var team1_input_validated = parseInt($scope.team1_input);
		if ( isNaN(team1_input_validated) ) {
			team1_input_validated = 1;
		} else if ( team1_input_validated > 7 ) {
			team1_input_validated = 7;
		} else if (team1_input_validated < 1 ) {
			team1_input_validated = 1;
		} 
		var team2_input_validated = parseInt($scope.team2_input);
		if ( isNaN(team2_input_validated) ) {
			team2_input_validated = 1;
		} else if ( team2_input_validated > 7 ) {
			team2_input_validated = 7;
		} else if (team2_input_validated < 1 ) {
			team2_input_validated = 1;
		} 
		var frames_input_validated = parseInt($scope.frames_input);
		if ( isNaN(frames_input_validated) ) {
			frames_input_validated = 1;
		} else if ( frames_input_validated > 15 ) {
			frames_input_validated = 15;
		} else if (frames_input_validated < 1 ) {
			frames_input_validated = 1;
		} 
		console.log('working');	
		console.log('Validated Inputs:' + team1_input_validated + " " + team2_input_validated + " " + frames_input_validated + " " + $scope.team1_temp_color + " " + $scope.team2_temp_color);	
		$scope.team1_preview = [];
		$scope.team2_preview = [];
		for ( var i = 0 ; i < team1_input_validated ; i++ ) {
			$scope.team1_preview.push("");	
		}
		for ( var i = 0 ; i < team2_input_validated ; i++ ) {
			$scope.team2_preview.push("");	
		}
		$scope.team1_temp_style['background-color'] = $scope.team1_temp_color; 	
		$scope.team2_temp_style['background-color'] = $scope.team2_temp_color; 	

		$scope.frames_input_validated = frames_input_validated;
//		$scope.team1_temp_position !!!!!!!!!  = 	
	}

}])

