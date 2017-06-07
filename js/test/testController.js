app.controller('testController', ['playerService','envService','frameService','colors','$scope','$timeout','$location', function(player,env, frameService,colors,$scope,$timeout,$location){


//	Player Prototypes / Mocks


	$scope.generateNewPlay = function(){
///		$scope.compressPlay();
//		$location.search('play', $scope.play_data_model);
	//	for ( i = 
	}
	$scope.compressFrame = function(frame,default_color){
		console.log('**************** in compress function');
		console.log('posY: ' + frame.posY);
		console.log('posX: ' + frame.posX);
		console.log('highlighted: ' + frame.highlighted);
		console.log('default color: ' + default_color);
		console.log('starting compression...');	
		
		//generate position number 
		var calculated_position_number = frame.posY * 20 + parseInt(frame.posX);
		console.log('calculated position: ' + calculated_position_number);
		var offset = 0;
		if ( frame.highlighted == true && default_color == 1 ) { offset = 200 } else 
		if ( frame.highlighted == false && default_color == 2 ) { offset = 400 } else 
		if ( frame.highlighted == true && default_color == 2 ) { offset = 600 }  
		calculated_position_number += offset;
		console.log('calculated position offset: ' + calculated_position_number);
		
		console.log('conversion array length: ' + $scope.env.conversion_array.length);
		compressed_frame1 = $scope.env.conversion_array[(Math.floor(calculated_position_number / 30))];
		compressed_frame2 = $scope.env.conversion_array[(calculated_position_number % 30)];
		compressed_frame = compressed_frame1 + compressed_frame2;
		console.log('compressed frame: ' + compressed_frame); 
		return compressed_frame;
		
	}
	$scope.compressPlay = function(){
		

		$scope.play_data_model = "";
		var output = "";
		output += $scope.env.team1_temp_color_index;
		output += $scope.env.team2_temp_color_index;
		for ( var i = 0 ; i < $scope.players.length ; i++) {
			output += "_";
			if ( $scope.players[i].default_color == $scope.env.team1_temp_color ){
				console.log('this player is on team 1, color: ' + $scope.env.team1_temp_color);
				var team = 1;
			} else if ( $scope.players[i].default_color == $scope.env.team2_temp_color ){
				console.log('this player is on team 2');
				var team = 2;
			} else { console.log('player color at decompression:' +  $scope.players[i].default_color) } 
			for ( j = 0 ; j < $scope.players[i].frames.length ; j++){
				output += $scope.compressFrame($scope.players[i].frames[j],team);
			}
		}

		$scope.play_data_model = output;	
		console.log('compressed whole play: ' + output);
		
	}
	$scope.decompressPlay = function(){
		console.log('loading play from input: ' + $scope.input_play);
		
		var first6_end_index = $scope.input_play.indexOf("_");
		var first6 = $scope.input_play.substring(0,first6_end_index)
		console.log('first 6 characters: ' + first6);
		var colors = [ 	$scope.css_colors[parseInt(first6.substring(0,3))],
						$scope.css_colors[parseInt(first6.substring(3))	]
			]

		$scope.input_play = $scope.input_play.substring(first6_end_index+1);
		
		var compressed_loaded_players = [];
		while( $scope.input_play.length > 0 ){
			console.log('while loop iteration');
			var player_end = ( $scope.input_play.indexOf("_") > 0 ? $scope.input_play.indexOf("_") : $scope.input_play.length ) ;
			compressed_loaded_players.push($scope.input_play.substring(0,player_end));
			$scope.input_play = ( $scope.input_play.indexOf('_') != -1 ? $scope.input_play.substring(player_end+1):"" ) ;
		}
		console.log('loaded compressed frames: ' + compressed_loaded_players);	
		$scope.decompressed_loaded_players = [];
		
		for ( var i = 0 ; i < compressed_loaded_players.length ; i++ ){
			$scope.decompressed_loaded_players.push($scope.decompressPlayer(compressed_loaded_players[i],i, colors));	
		}
		$scope.players = $scope.decompressed_loaded_players;
		$scope.env.frames = [];
		for ( var i = 0 ; i < $scope.decompressed_loaded_players[0].frames.length ; i++ ) {
			$scope.env.frames.push(i);
		}
		$scope.players[$scope.players.length-1].default_color = "white";
		$scope.players[$scope.players.length-1].jersey_number = "";
		$scope.players[$scope.players.length-1].current_style['background-color'] = "none";
		$scope.players[$scope.players.length-1].current_style['background'] = "url('./images/ball.png')";
		$scope.players[$scope.players.length-1].current_style['background-position'] = "-4px -4px";
		$scope.players[$scope.players.length-1].current_style['background-size'] = "47px 47px";
		$scope.goToFrame(0);
	}
	$scope.decompressPlayer = function(player,jersey,colors){
		var compressed_frames_array = []
		var decompressed_frames_array = [];
		var team = 0;
		while ( player.length > 0 ) {
			var temp = player.substring(0,2);
			compressed_frames_array.push(temp);
			player = ( player.substring(2) || "" );
			console.log('parsing 2 characters');
		}
		
		for ( var i = 0 ; i < compressed_frames_array.length ; i++ ){
			var dec_frame_number = ($scope.env.conversion_array.indexOf(compressed_frames_array[i][0])) * 30 + $scope.env.conversion_array.indexOf(compressed_frames_array[i][1]);
			console.log('Decimal Decompressed: ' + dec_frame_number);

			var highlighted = false;
			if ( dec_frame_number > 599 ){
				dec_frame_number = dec_frame_number - 600;
				team = 1;
				highlighted = true;
			} else if ( dec_frame_number > 399 ) {
				dec_frame_number = dec_frame_number - 400;
				team = 1;
			} else if ( dec_frame_number > 199 ) {
				dec_frame_number = dec_frame_number - 200;
				highlighted = true;	
			}
			var posY = Math.floor(dec_frame_number / 20);
			var posX = dec_frame_number % 20;
			decompressed_frames_array.push({
				posX: 			posX,
				posY: 			posY,
				highlighted: 	highlighted
			});
		}
		player_color = colors[team];
		var new_current_style = {
						top: ( decompressed_frames_array[0].posY * 40 ) + "px",
						left: ( decompressed_frames_array[0].posX * 40 ) + "px",
						'background-color': player_color,
						'box-shadow': ( decompressed_frames_array[0].highlighted == true ? "0px 0px 20px 6px " + player_color : 'none'),
						//add more dialects
						'border': "1 px solid transparent" 
			
		};
		var decompressed_player = {
			default_color: 		player_color,
			jersey_number: 		jersey,
			default_shadow: 	'none',
			current_style: 		new_current_style,
			frames: 			decompressed_frames_array,
			transitionTo:	function(index){
				if ( this.frames[index].highlighted == true ){
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
						'border': "1 px solid transparent" 
					}
			}
			
		}
		return decompressed_player
	}


	
//  ************END PLAYER PROTOTYPE

//	GENERAL FUNCTIONS

	$scope.goToFrame = function(destination_frame_index){
		console.log('destination frame: ' + destination_frame_index);
		console.log('current frame: ' + $scope.current_frame_index);
		for ( var i = 0 ; i < $scope.players.length ; i++ ){
			if ( destination_frame_index > $scope.current_frame_index ){
				$scope.players[i].transitionTo(destination_frame_index);
			} else if ( destination_frame_index < $scope.current_frame_index ){
				$scope.players[i].transitionTo(destination_frame_index);
			}
		}
		$scope.current_frame_index = destination_frame_index;
		$scope.compressPlay();
	}

	$scope.playback = function(){
		var goToNext = function(){
			$scope.goToFrame($scope.current_frame_index+1)
			if ( $scope.current_frame_index < $scope.env.frames.length-1 ) {
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
		if ($scope.selected_player === target_player){
			$scope.selected_player = null;
		} else { $scope.selected_player = target_player }
	}
	$scope.updateSelectedPlayer = function(){
		$scope.selected_player.current_style.left = ( $scope.selected_player.frames[$scope.current_frame_index].posX * 40 ) + "px";	
		$scope.selected_player.current_style.top = ( $scope.selected_player.frames[$scope.current_frame_index].posY * 40 ) + "px";	
		$scope.selected_player.current_style['box-shadow'] = ( $scope.selected_player.frames[$scope.current_frame_index].highlighted == true ? "0px 0px 20px 6px " + $scope.selected_player.default_color : "none" )
	// Animation Function for "edit" vs "create" visualisation	
		if ( $scope.env.mode == "create" ) {	
			for ( var i = $scope.current_frame_index ; i < $scope.env.frames.length ; i++){
				(function(j){
					$timeout(function(){
						console.log(j);
						$scope.env.frame_styles[j] = { 'background-color':'lightgray' };	
					},30*(j-$scope.current_frame_index));	
					$timeout(function(){
						console.log(j);
						$scope.env.frame_styles[j] = { 'background-color':'none' };	
					},180+30*(j-$scope.current_frame_index));	
				})(i)
			}	
		}

	}

	$scope.moveSelectedPlayer = function(grid_square_object){
		if ( $scope.selected_player != null ) {
			console.log('move selected function triggered');
			if ( $scope.env.mode == "edit" ){
				$scope.selected_player.frames[$scope.current_frame_index].posX = grid_square_object.posX;
				$scope.selected_player.frames[$scope.current_frame_index].posY = grid_square_object.posY;
			} else {
				for ( var i = $scope.current_frame_index ; i < $scope.env.frames.length ; i++ ){
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
		frameService.removeFrame($scope.env.frames, $scope.players, $scope.current_frame_index);
		( $scope.current_frame_index == $scope.env.frames.length ? $scope.goToFrame($scope.env.frames.length-1) : "" ) ;
	};
	$scope.toggleHighlighted = function(player,frame_number){
		console.log('toggling Highlight');
		player.frames[frame_number].highlighted = ( player.frames[frame_number].highlighted ? false : true )
		$scope.updateSelectedPlayer();
	}
	$scope.save = function(){
		$scope.compressPlay();
		$location.search('play',$scope.play_data_model);		
	}
// 	*** "INIT " FUNCTIONS, maybe to put on load
	$scope.$on('$locationChangeSuccess', function(){
		console.log('URL CHANGE DETECTED');
		$scope.input_play = $location.search().play;
		$scope.decompressPlay();
	});

	$scope.current_frame_index = 0;
	$scope.env = env;
	$scope.player = player;
	$scope.css_colors = colors;
	$scope.players = [];
	if ( $location.search().play != undefined ) {
		console.log('play string received: ' + $location.search().play);
		$scope.input_play = $location.search().play;
		$scope.decompressPlay();
	}
	$scope.selected_player = null;
	$scope.newPlay = function(){
		$scope.selected_player=null;
		$scope.players=[];
		$scope.env.frames=[];
		$scope.player.newPlay($scope.env,$scope.css_colors,$scope.selected_player,$scope.players)	
	}
}])

