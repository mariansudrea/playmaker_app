app.controller('testController', ['$scope','$timeout','$location', function($scope,$timeout,$location){
	$scope.test = 23;
	$scope.testFunction = function(){
		return "it works."
	}
//	General purpose variables
//
	$scope.frame_styles=[ 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
						 	{ 'background-color':'none'},
					 ];
	$scope.conversion_array = [ "0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t" ];
	$scope.css_colors = [

"aliceblue",
"antiquewhite",
"aqua",
"aquamarine",
"azure",
"beige",
"bisque",
"black",
"blanchedalmond",
"blue",
"blueviolet",
"brown",
"burlywood",
"cadetblue",
"chartreuse",
"chocolate",
"coral",
"cornflowerblue",
"cornsilk",
"crimson",
"cyan",
"darkblue",
"darkcyan",
"darkgoldenrod",
"darkgray",
"darkgrey",
"darkgreen",
"darkkhaki",
"darkmagenta",
"darkolivegreen",
"darkorange",
"darkorchid",
"darkred",
"darksalmon",
"darkseagreen",
"darkslateblue",
"darkslategray",
"darkslategrey",
"darkturquoise",
"darkviolet",
"deeppink",
"deepskyblue",
"dimgray",
"dimgrey",
"dodgerblue",
"firebrick",
"floralwhite",
"forestgreen",
"fuchsia",
"gainsboro",
"ghostwhite",
"gold",
"goldenrod",
"gray",
"grey",
"green",
"greenyellow",
"honeydew",
"hotpink",
"indianred",
"indigo",
"ivory",
"khaki",
"lavender",
"lavenderblush",
"lawngreen",
"lemonchiffon",
"lightblue",
"lightcoral",
"lightcyan",
"lightgoldenrodyellow",
"lightgray",
"lightgrey",
"lightgreen",
"lightpink",
"lightsalmon",
"lightseagreen",
"lightskyblue",
"lightslategray",
"lightslategrey",
"lightsteelblue",
"lightyellow",
"lime",
"limegreen",
"linen",
"magenta",
"maroon",
"mediumaquamarine",
"mediumblue",
"mediumorchid",
"mediumpurple",
"mediumseagreen",
"mediumslateblue",
"mediumspringgreen",
"mediumturquoise",
"mediumvioletred",
"midnightblue",
"mintcream",
"mistyrose",
"moccasin",
"navajowhite",
"navy",
"oldlace",
"olive",
"olivedrab",
"orange",
"orangered",
"orchid",
"palegoldenrod",
"palegreen",
"paleturquoise",
"palevioletred",
"papayawhip",
"peachpuff",
"peru",
"pink",
"plum",
"powderblue",
"purple",
"rebeccapurple",
"red",
"rosybrown",
"royalblue",
"saddlebrown",
"salmon",
"sandybrown",
"seagreen",
"seashell",
"sienna",
"silver",
"skyblue",
"slateblue",
"slategray",
"slategrey",
"snow",
"springgreen",
"steelblue",
"tan",
"teal",
"thistle",
"tomato",
"turquoise",
"violet",
"wheat",
"white",
"whitesmoke",
"yellow",
"yellowgreen",
];
  
	

	$scope.new_play_model = {};
	$scope.team1_input = 1;
	$scope.team2_input = 1;
	$scope.team1_temp_color = "red";
	$scope.team1_temp_color_index = $scope.css_colors.indexOf("red");
	$scope.team2_temp_color = "blue";
	$scope.team2_temp_color_index = "00"+$scope.css_colors.indexOf("blue");
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

/*	$scope.player1 = {
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
		
	}*/
	$scope.player2 = {
		default_color: 'red',
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
						//'border': ( this.frames[index].highlighted == true ? '1px solid #38cc24' : "1 px solid transparent" )
						'border': "1 px solid transparent", 
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
						'border': "1 px solid transparent" 
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
			$scope.addPlayer( $scope.team2_temp_color, $scope.default_positions2[i], i+$scope.team1_preview.length )
		}
		$scope.addPlayer( "aqua", [9,5], "ball" )
		$scope.mode = "create";
		$scope.compressPlay();
		$location.search('play', $scope.play_data_model);
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
		
		console.log('conversion array length: ' + $scope.conversion_array.length);
		compressed_frame1 = $scope.conversion_array[(Math.floor(calculated_position_number / 30))];
		compressed_frame2 = $scope.conversion_array[(calculated_position_number % 30)];
		compressed_frame = compressed_frame1 + compressed_frame2;
		console.log('compressed frame: ' + compressed_frame); 
		return compressed_frame;
		
	}
	$scope.compressPlay = function(){
		

		$scope.play_data_model = "";
		var output = "";
		output += $scope.team1_temp_color_index;
		output += $scope.team2_temp_color_index;
		for ( var i = 0 ; i < $scope.players.length ; i++) {
			output += "_";
			if ( $scope.players[i].default_color == $scope.team1_temp_color ){
				console.log('this player is on team 1');
				var team = 1;
			} else if ( $scope.players[i].default_color == $scope.team2_temp_color ){
				console.log('this player is on team 2');
				var team = 2;
			}
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
		$scope.frames = [];
		for ( var i = 0 ; i < $scope.decompressed_loaded_players[0].frames.length ; i++ ) {
			$scope.frames.push(i);
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
			var dec_frame_number = ($scope.conversion_array.indexOf(compressed_frames_array[i][0])) * 30 + $scope.conversion_array.indexOf(compressed_frames_array[i][1]);
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
//
//	$scope.player1.position = "p4";

//	$scope.players.push($scope.player1);
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
		$scope.compressPlay();
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
//		$scope.selected_player.current_style.border = ( $scope.selected_player.frames[$scope.current_frame_index].highlighted == true ? '1px solid #38cc24' : "1 px solid transparent" )
		$scope.selected_player.current_style['box-shadow'] = ( $scope.selected_player.frames[$scope.current_frame_index].highlighted == true ? "0px 0px 20px 6px " + $scope.selected_player.default_color : "none" )
	// Animation Function for "edit" vs "create" visualisation	
		if ( $scope.mode == "create" ) {	
			for ( var i = $scope.current_frame_index ; i < $scope.frames.length ; i++){
				(function(j){
					$timeout(function(){
						console.log(j);
						$scope.frame_styles[j] = { 'background-color':'lightgray' };	
					},30*(j-$scope.current_frame_index));	
					$timeout(function(){
						console.log(j);
						$scope.frame_styles[j] = { 'background-color':'none' };	
					},180+30*(j-$scope.current_frame_index));	
				})(i)
			}	
		}

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
		var a = $scope.team1_temp_color.toLowerCase();
		var b = $scope.team2_temp_color.toLowerCase();
		if ( $scope.css_colors.indexOf(a) != -1 ) {
			$scope.team1_temp_color_index = $scope.css_colors.indexOf(a);
			var zero_padding = (3-$scope.team1_temp_color_index.toString().length);
			for ( x = zero_padding ; zero_padding > 0 ; zero_padding-- ) {
				$scope.team1_temp_color_index = "0" + $scope.team1_temp_color_index;
			}
			console.log('found real color: ' + $scope.team1_temp_color + " " + $scope.team1_temp_color_index)
		} 
		if ( $scope.css_colors.indexOf(b) != -1 ) {
			
			$scope.team2_temp_color_index = $scope.css_colors.indexOf(b);
			var zero_padding = (3-$scope.team2_temp_color_index.toString().length);
			for ( x = zero_padding ; zero_padding > 0 ; zero_padding-- ) {
				$scope.team2_temp_color_index = "0" + $scope.team2_temp_color_index;
			}
			console.log('found real color: ' + $scope.team2_temp_color + " " + $scope.team2_temp_color_index)
		} 

		//console.log('working');	
		//console.log('Validated Inputs:' + team1_input_validated + " " + team2_input_validated + " " + frames_input_validated + " " + $scope.team1_temp_color + " " + $scope.team2_temp_color);	
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
	$scope.addFrame = function(){
		if ( $scope.frames.length < 10 ) {
			$scope.frames.push($scope.frames.length);
			for ( var i = 0; i < $scope.players.length; i++) {
				console.log('add frame iteration...');
				$scope.players[i].frames.push(JSON.parse(JSON.stringify($scope.players[i].frames[$scope.players[i].frames.length-1])));
			}
		}
		
	}
	$scope.removeFrame = function(){
		if ( $scope.frames.length > 1 ){
			$scope.frames.pop();
			for (var i = 0 ; i < $scope.players.length; i++){
				console.log('removing frame iteration...');
				$scope.players[i].frames.pop();
			}
		}
		if ( $scope.current_frame_index == $scope.frames.length ){
			$scope.goToFrame($scope.frames.length-1);
		}	
	}
	$scope.toggleHighlighted = function(){
		console.log('toggling Highlight');
		$scope.selected_player.frames[$scope.current_frame_index].highlighted = ( $scope.selected_player.frames[$scope.current_frame_index].highlighted ? false : true )
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
	if ( $location.search().play != undefined ) {
		console.log('play string received: ' + $location.search().play);
		$scope.input_play = $location.search().play;
		$scope.decompressPlay();
	}
	

}])

