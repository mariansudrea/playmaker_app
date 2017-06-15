app.factory('envService',['$timeout','$location', function($timeout,$location){

	var frame_styles= [];
	for ( var i = 0 ; i < 10 ; i++){
		frame_styles.push({'background-color':'none'});
	}
	var ball_style = {
		'background-color': "aquamarine",
		'background': "url('./images/ball.png')",
		'background-position': "-4px -4px",
		'background-size': "47px 47px",
	}
	var env = {
		ball_style:				ball_style,	
		conversion_array: 	[ "0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t" ],	
		current_frame_index:	0,
		frames:					[0],
		frame_styles: 			frame_styles,
		frames_input:		 	1,
		frames_input_validated: 1,
		grid_size:				[],
		grid_size_length:		200,
		mode:					"edit",
		modal_visible:			false,
		play_data_model:		"",
		selected_player:		null,
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
	env.toggleSelected = function(target_player){
		console.log('toggling');
		if (this.selected_player === target_player){
			this.selected_player = null;
		} else { this.selected_player = target_player }
	}
	env.updateSelectedPlayer = function(player){
		var frm = this.selected_player.frames[this.current_frame_index];
		env.selected_player.current_style = new player.GeneratedStyle(frm.posX,frm.posY,this.selected_player.default_color,frm.highlighted);
		if ( this.mode == "create" ) { this.flashFrames() } // create mode animation	
	}
	env.flashFrames = function(){
		for ( var i = this.current_frame_index ; i < this.frames.length ; i++){
			(function(j){
				$timeout(function(){
					console.log(j);
					env.frame_styles[j] = { 'background-color':'lightgray' };	
				},30*(j-env.current_frame_index));	
				$timeout(function(){
					console.log(j);
					env.frame_styles[j] = { 'background-color':'none' };	
				},180+30*(j-env.current_frame_index));	
			})(i)
		}	
	}
	env.moveSelectedPlayer = function(grid_square_object,player){
		
		if ( env.selected_player != null ) {
			console.log('move selected function triggered');
			if ( env.mode == "edit" ){
				env.selected_player.frames[env.current_frame_index].posX = grid_square_object.posX;
				env.selected_player.frames[env.current_frame_index].posY = grid_square_object.posY;
			} else {
				for ( var i = env.current_frame_index ; i < env.frames.length ; i++ ){
					env.selected_player.frames[i].posX = grid_square_object.posX;
					env.selected_player.frames[i].posY = grid_square_object.posY;
				}
			}
			env.updateSelectedPlayer(player);
		}
	}
	env.toggleHighlighted = function(player){
		console.log('toggling Highlight');
		var new_highlight_state = ( env.selected_player.frames[env.current_frame_index].highlighted ? false : true ); 
		if ( env.mode == "edit" ){
			env.selected_player.frames[env.current_frame_index].highlighted = new_highlight_state;
		} else {
			for ( var i = env.current_frame_index ; i < env.frames.length ; i++ ){
				env.selected_player.frames[i].highlighted = new_highlight_state;
			}
		}
		
		env.updateSelectedPlayer(player);
	}
	
	env.toggleMode = function(){
		env.mode = ( env.mode == "edit" ? "create" : "edit" );
	}
	env.toggleAnimationType = function(players){
//		env.transition_type =  
	}
	env.updatePreviewTeams = function(){
		var validateMinMax = function(input,min,max){
			if ( isNaN(parseInt(input)) || input < min ) { return min } 
			else return ( input > max ? max : input )
		}
		var t1_val = validateMinMax(env.team1_input,1,7); 
		var t2_val = validateMinMax(env.team2_input,1,7); 
		var frames_val = validateMinMax(env.frames_input,1,10); 
		env.team1_preview = [];
		env.team2_preview = [];
		for ( var i = 0 ; i < t1_val ; i++ ) {
			env.team1_preview.push("");	
		}
		for ( var i = 0 ; i < t2_val ; i++ ) {
			env.team2_preview.push("");	
		}
		env.team1_temp_style['background-color'] = env.team1_temp_color; 	
		env.team2_temp_style['background-color'] = env.team2_temp_color; 	

		env.frames_input_validated = frames_val;
	}


	env.save = function(player,players){
		player.compressPlay(env,players);
		$location.search('play',env.play_data_model);		
	}


	for (var i = 0; i < env.grid_size_length ; i++ ){
		env.grid_size[i] = { posX: i % 20,
								posY: Math.floor(i/20),
			}; 
	}

	return env;
}]);
