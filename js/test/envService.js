app.factory('envService',function(){

	var frame_styles= [];
	for ( var i = 0 ; i < 10 ; i++){
		frame_styles.push({'background-color':'none'});
	}
	var ball_style = {
		'background-color': "none",
		'background': "url('./images/ball.png')",
		'background-position': "-4px -4px",
		'background-size': "47px 47px",
	}
	var env = {
		ball_style:				ball_style,	
		conversion_array: 	[ "0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t" ],	
		frames:					[0],
		frame_styles: 			frame_styles,
		frames_input:		 	1,
		frames_input_validated: 1,
		grid_size:				[],
		grid_size_length:		200,
		mode:					"edit",
		modal_visible:			false,
		play_data_model:		"",
		team1_input:			4,
		team2_input:			4,
		team1_temp_color:		"aquamarine",
		team2_temp_color:		"lime",
		team1_preview:			[],
		team2_preview:			[],
		team1_temp_style:		{},
		team2_temp_style:		{},
		team1_temp_color_index:	"003",
		team2_temp_color_index:	"082",
		default_positions1:	 	[ [3,1],[3,4],[3,7],[6,3],[6,8],[8,9],[0,4] ],
		default_positions2:	 	[ [10,1],[10,4],[10,8],[12,2],[12,5],[12,8],[17,4] ]
	}
	
	env.goToFrame = function(destination_frame_index,player,players){
		for ( var i = 0 ; i < players.length ; i++ ){
			if ( destination_frame_index != this.current_frame_index ){
				players[i].transitionTo(destination_frame_index);
			}
		}
		env.current_frame_index = destination_frame_index;
		player.compressPlay(this,players);
	}
	env.randomize = function(team_number,colors){
		var target = "team"+team_number+"_temp_color";
		var random_index = Math.floor(Math.random() * 148);
		this[target] = colors[random_index];
		console.log('team ' + team_number + ' temp color: ' + this[target] );
	}
	env.addZeroPadding = function(index){
		if ( index.toString().length != 3){
			return ( index.toString().length == 2 ? "0"+index : "00"+index );
		} else return index;
	}
	for (var i = 0; i < env.grid_size_length ; i++ ){
		env.grid_size[i] = { posX: i % 20,
								posY: Math.floor(i/20),
			}; 
	}
	return env;
});
