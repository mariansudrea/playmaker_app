app.factory('playerService', ['envService','$location',function(env,$location){
	var serviceObj = {
		speeds:  				[ 3,2.5,2,1.6,1.3,1,0.8,0.6 ],
		speeds_index:			5, 
		transition_type: 		"linear",
			
	}
	serviceObj.updateAnimationStyle = function(players,env){
		var t_type = ( serviceObj.transition_type=="linear"?"linear" : "cubic-bezier(.5,0,.5,1)" )
		serviceObj.transition_style_string="top " + serviceObj.speeds[serviceObj.speeds_index] +"s "+ 
			t_type +
			",left " + serviceObj.speeds[serviceObj.speeds_index] + "s " + 
			t_type +
			",box-shadow " + serviceObj.speeds[serviceObj.speeds_index] + "s " + 
			t_type +
			",background-color " + "0.5s " +t_type +
			",transform 0.7s linear" ;

        for ( var i = 0 ; i < players.length ; i++ ){
        	players[i].transitionTo(env.current_frame_index);
        }
		
	}

	
	serviceObj.toggleTransitionType = function(players,env){
//		console.log('toggling transition type..');
		serviceObj.transition_type = ( serviceObj.transition_type == "linear" ? "cubic" : "linear" );
		serviceObj.updateAnimationStyle(players,env);
	}
	serviceObj.changeSpeed = function(players,env,direction){
		if ( direction == "up" ) {
			if ( serviceObj.speeds_index < serviceObj.speeds.length-1 ) 
				{ serviceObj.speeds_index++ }
		} else {
			if ( serviceObj.speeds_index > 0 ) 
				{ serviceObj.speeds_index-- }
		}
		serviceObj.updateAnimationStyle(players,env);
	}
//	serviceObj.transition_style_string = "top 4.5s linear,left 4.5s linear,box-shadow 0.5s cubic-bezier(.5,0,.5,1), background-color 0.5s cubic-bezier(.5,0,.5,1)";
//	serviceObj.transition_type = "all 5s linear";
//	serviceObj.transition_type = "border-radius:0";
	var GeneratedStyle = function(posX,posY,color,highlighted,ball){
		this.top = ( posY * 28 ) + "px";
		this.left = ( posX * 28 ) + "px";
		this['background-color'] = color;
//		this['box-shadow'] = ( highlighted ? "0px 0px 20px 6px " + color : "none" );
		this['box-shadow'] = ( highlighted ? "0px 0px 30px 15px " + color : "none" );
		this['transition'] = serviceObj.transition_style_string;
		if ( typeof ball != "undefined"){
			this['background-image'] = "url('./images/" + ball + ".png')"
		}
		this['transform'] = "rotateZ(" + (env.ball_rotation[env.current_3d_index]) * 90 + "deg)";
	}	
	serviceObj.GeneratedStyle = GeneratedStyle;
	var transition = function(index){
		if ( this.jersey_number == "ball" ) { var ball_type = env.current_sport }
		else var ball_type = undefined; 
		this.current_style = new GeneratedStyle(this.frames[index].posX,this.frames[index].posY,this.default_color,this.frames[index].highlighted,ball_type)
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
		//console.log('first6: ' + first6);
		env.team1_temp_color_index = first6.substring(0,3);
		env.team2_temp_color_index = first6.substring(3);
//		console.log('team 1 color index' + env.team1_temp_color_index);
		var colors = [ 	css_colors[parseInt(first6.substring(0,3))],
						css_colors[parseInt(first6.substring(3))	]
			]
		env.team1_temp_color = colors[0];
		env.team2_temp_color = colors[1];
//		console.log('colors: ' + colors);
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
		players[players.length-1].default_color = "transparent";
		env.toggleSelected(players[players.length-1]);
		env.updateSelectedPlayer(serviceObj);
		env.toggleSelected(players[players.length-1]);
		
		for ( i in env.ball_style ){
			ball_style[i] = env.ball_style[i];
		}
		serviceObj.updateAnimationStyle(players,env);
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
			var dec_frame_number = (env.conversion_array.indexOf(compressed_frames_array[i][0])) * 45 + env.conversion_array.indexOf(compressed_frames_array[i][1]);
			var highlighted = false;
			if ( dec_frame_number > 1478 ){
				dec_frame_number = dec_frame_number - 1479;
				team = 1;
				highlighted = true;
			} else if ( dec_frame_number > 985 ) {
				dec_frame_number = dec_frame_number - 986;
				team = 1;
			} else if ( dec_frame_number > 492 ) {
				dec_frame_number = dec_frame_number - 493;
				highlighted = true;	
			}
			var posY = Math.floor(dec_frame_number / 29);
			var posX = dec_frame_number % 29 ;
			decompressed_frames_array.push({
				posX: 			posX,
				posY: 			posY,
				highlighted: 	highlighted
			});
		}
		//console.log('decompressing from team ' + team);
		player_color = colors[team];
		var new_current_style = new GeneratedStyle(decompressed_frames_array[0].posX,decompressed_frames_array[0].posY,player_color,decompressed_frames_array[0].highlighted)
		decompressed_player = new Player(player_color,jersey,new_current_style,decompressed_frames_array);
		return decompressed_player
	}
	serviceObj.compressPlay = function(env, players){
//		$location.search('play',env.current_sport);
		var output = "" + env.team1_temp_color_index + env.team2_temp_color_index;
		for ( var i = 0 ; i < players.length ; i++) {
			output += "_";
			var team = ( players[i].default_color == env.team1_temp_color ? 1 : 2 );
			for ( j = 0 ; j < players[i].frames.length ; j++){
				output += this.compressFrame(env.conversion_array,players[i].frames[j],team)
			}
		}
		env.play_data_model = output;	
//		console.log('compressed whole play: ' + output);
	}

	serviceObj.compressFrame = function(conversion_arr, frame, color){
		var calculated_position_number = frame.posY * 29 + parseInt(frame.posX);
		var offset = 0;
		if ( frame.highlighted == true && color == 1 ) { offset = 493 } else 
		if ( frame.highlighted == false && color == 2 ) { offset = 986 } else 
		if ( frame.highlighted == true && color == 2 ) { offset = 1479 }  
		calculated_position_number += offset;
		compressed_frame1 = conversion_arr[(Math.floor(calculated_position_number / 45))];
		compressed_frame2 = conversion_arr[(calculated_position_number % 45)];
		compressed_frame = compressed_frame1 + compressed_frame2;
		return compressed_frame;
	
	}

//******************************
	serviceObj.newPlay = function(env,css_colors,players_array){
//		console.log('new play , players array : ' + players_array);
		players_array.length = 0;
		env.selected_player = null;
		env.frames.length = 0;
		env.current_frame_index = 0;
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
		this.add( env,"aqua", [14,8], "ball", players_array )
		
		
		env.mode = "create";
		env.save(this,players_array);
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
		if ( jersey == "ball" ) {
			new_current_style['background-color']="none";
			new_current_style['background-image'] = "url('./images/" + env.current_sport+ ".png')";
//			console.log('new_current_style.background: ' + new_current_style.background);
		}
		players_array.push(new Player(color,jersey,new_current_style,new_current_frames));
	}

	return serviceObj
}])
