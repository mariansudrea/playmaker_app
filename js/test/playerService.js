app.factory('playerService', function(){
	var serviceObj = {}
	var GeneratedStyle = function(posX,posY,color,highlighted){
		this.top = ( posY * 40 ) + "px";
		this.left = ( posX * 40 ) + "px";
		this['background-color'] = color;
		this['box-shadow'] = ( highlighted ? "0px 0px 20px 6px " + color : "none" );
	}	
	serviceObj.GeneratedStyle = GeneratedStyle;
	var transition = function(index){
		this.current_style = new GeneratedStyle(this.frames[index].posX,this.frames[index].posY,this.default_color,this.frames[index].highlighted)
	}
	var Player = function(color,jersey,new_current_style,new_current_frames){
		this.default_color=color;
		this.jersey_number=jersey;
		this.default_shadow='none';
		this.current_style=new_current_style;
		this.frames=new_current_frames;
		this.transitionTo=transition
	}


//****************************** PLAY COMPRESSION / DECOMPRESSION
	serviceObj.decompressPlay = function(env,css_colors,players,frameService){
		var first6_end_index = env.input_play.indexOf("_");
		var first6 = env.input_play.substring(0,first6_end_index)
		console.log('first6: ' + first6);
		env.team1_temp_color_index = first6.substring(0,3);
		env.team2_temp_color_index = first6.substring(3);
		console.log('team 1 color index' + env.team1_temp_color_index);
		var colors = [ 	css_colors[parseInt(first6.substring(0,3))],
						css_colors[parseInt(first6.substring(3))	]
			]
		env.team1_temp_color = colors[0];
		env.team2_temp_color = colors[1];
		console.log('colors: ' + colors);
		env.input_play = env.input_play.substring(first6_end_index+1);
		
		var compressed_loaded_players = [];
		while( env.input_play.length > 0 ){
			var player_end = ( env.input_play.indexOf("_") > 0 ? env.input_play.indexOf("_") : env.input_play.length ) ;
			compressed_loaded_players.push(env.input_play.substring(0,player_end));
			env.input_play = ( env.input_play.indexOf('_') != -1 ? env.input_play.substring(player_end+1):"" ) ;
		}
		
		for ( var i = 0 ; i < compressed_loaded_players.length ; i++ ){
			players.push(this.decompressPlayer(compressed_loaded_players[i],i, colors,env));	
		}
		env.frames = [];
		for ( var i = 0 ; i < players[0].frames.length ; i++ ) {
			env.frames.push(i);
		}
		ball_style = players[players.length-1].current_style; 
		players[players.length-1].jersey_number = "ball";
		players[players.length-1].default_color = "aqua";
		env.toggleSelected(players[players.length-1]);
		env.updateSelectedPlayer(serviceObj);
		env.toggleSelected(players[players.length-1]);
		
		for ( i in env.ball_style ){
			ball_style[i] = env.ball_style[i];
		}
		frameService.goToFrame(0,this,players,env);
	}
	serviceObj.decompressPlayer = function(player,jersey,colors,env){
		var compressed_frames_array = []
		var decompressed_frames_array = [];
		var team = 0;
		while ( player.length > 0 ) {
			var temp = player.substring(0,2);
			compressed_frames_array.push(temp);
			player = ( player.substring(2) || "" );
		}
		for ( var i = 0 ; i < compressed_frames_array.length ; i++ ){
			var dec_frame_number = (env.conversion_array.indexOf(compressed_frames_array[i][0])) * 30 + env.conversion_array.indexOf(compressed_frames_array[i][1]);
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
		var new_current_style = new GeneratedStyle(decompressed_frames_array[0].posX,decompressed_frames_array[0].posY,player_color,decompressed_frames_array[0].highlighted)
		decompressed_player = new Player(player_color,jersey,new_current_style,decompressed_frames_array);
		return decompressed_player
	}
	serviceObj.compressPlay = function(env, players){
		var output = "" + env.team1_temp_color_index + env.team2_temp_color_index;
		for ( var i = 0 ; i < players.length ; i++) {
			output += "_";
			var team = ( players[i].default_color == env.team1_temp_color ? 1 : 2 );
			for ( j = 0 ; j < players[i].frames.length ; j++){
				output += this.compressFrame(env.conversion_array,players[i].frames[j],team)
			}
		}
		env.play_data_model = output;	
		console.log('compressed whole play: ' + output);
	}

	serviceObj.compressFrame = function(conversion_arr, frame, color){
		var calculated_position_number = frame.posY * 20 + parseInt(frame.posX);
		var offset = 0;
		if ( frame.highlighted == true && color == 1 ) { offset = 200 } else 
		if ( frame.highlighted == false && color == 2 ) { offset = 400 } else 
		if ( frame.highlighted == true && color == 2 ) { offset = 600 }  
		calculated_position_number += offset;
		compressed_frame1 = conversion_arr[(Math.floor(calculated_position_number / 30))];
		compressed_frame2 = conversion_arr[(calculated_position_number % 30)];
		compressed_frame = compressed_frame1 + compressed_frame2;
		return compressed_frame;
	
	}

//******************************
	serviceObj.newPlay = function(env,css_colors,players_array){
		console.log('new play , players array : ' + players_array);
		players_array.length = 0;
		env.selected_player = null;
		env.frames.length = 0;
		var a = env.team1_temp_color.toLowerCase();
		var b = env.team2_temp_color.toLowerCase();
		if ( css_colors.indexOf(a) != -1 ) {
			env.team1_temp_color_index = env.addZeroPadding(css_colors.indexOf(a));
		} else { 
			env.randomize(1,css_colors);			
			env.team1_temp_color_index = env.addZeroPadding(css_colors.indexOf(env.team1_temp_color));
		 } 
		if ( css_colors.indexOf(b) != -1 ) {
			env.team2_temp_color_index = env.addZeroPadding(css_colors.indexOf(b));
		} else { 
			env.randomize(2,css_colors);			
			env.team2_temp_color_index = env.addZeroPadding(css_colors.indexOf(env.team2_temp_color));
		} 
		env.modal_visible = false;
		for ( var i = 0 ; i < env.frames_input_validated ; i++ ) {
			env.frames.push(i);
		}
		for ( i = 0 ; i < env.team1_preview.length; i++ ) {
			this.add( env,env.team1_temp_color, env.default_positions1[i], i ,players_array)
		}
		for ( i = 0 ; i < env.team2_preview.length ; i++ ) {
			this.add( env,env.team2_temp_color, env.default_positions2[i], i+env.team1_preview.length,players_array )
		}
		this.add( env,"aqua", [9,5], "ball", players_array )
		env.mode = "create";
	}


	serviceObj.add = function(env,color,default_position,jersey,players_array){
		var new_current_frames = [];
		for ( var i = 0 ; i < env.frames_input_validated ; i++) {
			new_current_frames.push({
				posX: default_position[0],
				posY: default_position[1],
				highlighted: false
			});
		}
		var new_current_style = new GeneratedStyle(default_position[0],default_position[1],color,false)
		players_array.push(new Player(color,jersey,new_current_style,new_current_frames));
	}

	return serviceObj
})
