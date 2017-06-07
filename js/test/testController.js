app.controller('testController', ['playerService','envService','frameService','colors','$scope','$timeout','$location', function(player,env, frameService,colors,$scope,$timeout,$location){


//	GENERAL FUNCTIONS

	$scope.playback = function(){
		var goToNext = function(){
			$scope.env.goToFrame($scope.env.current_frame_index+1,$scope.player,$scope.players)
			if ( $scope.env.current_frame_index < $scope.env.frames.length-1 ) {
				$timeout( function(){goToNext()}, 1500 )
			}
		}
		if ( $scope.env.current_frame_index != 0 ){
			$scope.env.goToFrame(0,$scope.player,$scope.players);
			$timeout( function(){ goToNext() },2300)
		} else {
			goToNext()
		}
	}

	$scope.toggleSelected = function(target_player){
		if ($scope.selected_player === target_player){
			$scope.selected_player = null;
		} else { $scope.selected_player = target_player }
	}
	$scope.updateSelectedPlayer = function(){
		$scope.selected_player.current_style.left = ( $scope.selected_player.frames[$scope.env.current_frame_index].posX * 40 ) + "px";	
		$scope.selected_player.current_style.top = ( $scope.selected_player.frames[$scope.env.current_frame_index].posY * 40 ) + "px";	
		$scope.selected_player.current_style['box-shadow'] = ( $scope.selected_player.frames[$scope.env.current_frame_index].highlighted == true ? "0px 0px 20px 6px " + $scope.selected_player.default_color : "none" )
	// Animation Function for "edit" vs "create" visualisation	
		if ( $scope.env.mode == "create" ) {	
			for ( var i = $scope.env.current_frame_index ; i < $scope.env.frames.length ; i++){
				(function(j){
					$timeout(function(){
						console.log(j);
						$scope.env.frame_styles[j] = { 'background-color':'lightgray' };	
					},30*(j-$scope.env.current_frame_index));	
					$timeout(function(){
						console.log(j);
						$scope.env.frame_styles[j] = { 'background-color':'none' };	
					},180+30*(j-$scope.env.current_frame_index));	
				})(i)
			}	
		}

	}

	$scope.moveSelectedPlayer = function(grid_square_object){
		if ( $scope.selected_player != null ) {
			console.log('move selected function triggered');
			if ( $scope.env.mode == "edit" ){
				$scope.selected_player.frames[$scope.env.current_frame_index].posX = grid_square_object.posX;
				$scope.selected_player.frames[$scope.env.current_frame_index].posY = grid_square_object.posY;
			} else {
				for ( var i = $scope.env.current_frame_index ; i < $scope.env.frames.length ; i++ ){
					$scope.selected_player.frames[i].posX = grid_square_object.posX;
					$scope.selected_player.frames[i].posY = grid_square_object.posY;
				}
			}
			$scope.updateSelectedPlayer();
		}
	}
	

	$scope.toggleMode = function(){
		$scope.env.mode = ( $scope.env.mode == "edit" ? "create" : "edit" );
	}

	$scope.updatePreviewTeams = function(){
		var team1_input_validated = parseInt($scope.env.team1_input);
		if ( isNaN(team1_input_validated) ) {
			team1_input_validated = 1;
		} else if ( team1_input_validated > 7 ) {
			team1_input_validated = 7;
		} else if (team1_input_validated < 1 ) {
			team1_input_validated = 1;
		} 
		var team2_input_validated = parseInt($scope.env.team2_input);
		if ( isNaN(team2_input_validated) ) {
			team2_input_validated = 1;
		} else if ( team2_input_validated > 7 ) {
			team2_input_validated = 7;
		} else if (team2_input_validated < 1 ) {
			team2_input_validated = 1;
		} 
		var frames_input_validated = parseInt($scope.env.frames_input);
		if ( isNaN(frames_input_validated) ) {
			frames_input_validated = 1;
		} else if ( frames_input_validated > 15 ) {
			frames_input_validated = 15;
		} else if (frames_input_validated < 1 ) {
			frames_input_validated = 1;
		} 
		$scope.env.team1_preview = [];
		$scope.env.team2_preview = [];
		for ( var i = 0 ; i < team1_input_validated ; i++ ) {
			$scope.env.team1_preview.push("");	
		}
		for ( var i = 0 ; i < team2_input_validated ; i++ ) {
			$scope.env.team2_preview.push("");	
		}
		$scope.env.team1_temp_style['background-color'] = $scope.env.team1_temp_color; 	
		$scope.env.team2_temp_style['background-color'] = $scope.env.team2_temp_color; 	

		$scope.env.frames_input_validated = frames_input_validated;
//		$scope.team1_temp_position !!!!!!!!!  = 	
	}
	$scope.addFrame = function(){
		if ( $scope.env.frames.length < 10 ) {
			$scope.env.frames.push($scope.env.frames.length);
			for ( var i = 0; i < $scope.players.length; i++) {
				console.log('add frame iteration...');
				$scope.players[i].frames.push(JSON.parse(JSON.stringify($scope.players[i].frames[$scope.players[i].frames.length-1])));
			}
		}
		
	}
	$scope.removeFrame = function(){
		frameService.removeFrame($scope.env.frames, $scope.players, $scope.env.current_frame_index);
		( $scope.env.current_frame_index == $scope.env.frames.length ? $scope.env.goToFrame($scope.env.frames.length-1,$scope.player,$scope.players) : "" ) ;
	};
	$scope.toggleHighlighted = function(player,frame_number){
		console.log('toggling Highlight');
		player.frames[frame_number].highlighted = ( player.frames[frame_number].highlighted ? false : true )
		$scope.updateSelectedPlayer();
	}
	$scope.save = function(){
		$scope.player.compressPlay($scope.env,$scope.players);
		$location.search('play',$scope.env.play_data_model);		
	}
// 	*** "INIT " FUNCTIONS, maybe to put on load
	$scope.$on('$locationChangeSuccess', function(){
		console.log('URL CHANGE DETECTED');
		$scope.env.input_play = $location.search().play;
		$scope.players = [];
		$scope.player.decompressPlay($scope.env,$scope.css_colors,$scope.players);
	});

	$scope.env = env;
	$scope.env.current_frame_index = 0;
	$scope.player = player;
	$scope.css_colors = colors;
	$scope.players = [];
	if ( $location.search().play != undefined ) {
		console.log('play string received: ' + $location.search().play);
		$scope.env.input_play = $location.search().play;
		$scope.players = [];	
		$scope.player.decompressPlay($scope.env,$scope.css_colors,$scope.players);
	}
	$scope.selected_player = null;
	$scope.newPlay = function(){
		$scope.selected_player=null;
		$scope.players=[];
		$scope.env.frames=[];
		$scope.player.newPlay($scope.env,$scope.css_colors,$scope.selected_player,$scope.players)	
	}
}])

