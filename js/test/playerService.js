app.factory('playerService', function(){
	var serviceObj = {}

	serviceObj.newPlay = function(env,css_colors,selected_player,players_array){
		// necessary variables: 
		// 		env,css_colors,selected_player,modal visible( to be moved to env),
		// 		$scope.frames
		var a = env.team1_temp_color.toLowerCase();
		var b = env.team2_temp_color.toLowerCase();
		if ( css_colors.indexOf(a) != -1 ) {
			env.team1_temp_color_index = env.addZeroPadding(css_colors.indexOf(a));
//			console.log('found real color: ' + $scope.env.team1_temp_color + " " + $scope.env.team1_temp_color_index)
		} else { 
			env.randomize(1,css_colors);			
			env.team1_temp_color_index = css_colors.indexOf(env.team1_temp_color);
		 } 
		if ( css_colors.indexOf(b) != -1 ) {
			env.team2_temp_color_index = env.addZeroPadding(css_colors.indexOf(b));
//			console.log('found real color: ' + $scope.env.team2_temp_color + " " + $scope.env.team2_temp_color_index)
		} else { 
			env.randomize(2,css_colors);			
			env.team2_temp_color_index = css_colors.indexOf(env.team2_temp_color);
		} 

//		selected_player = {};
		env.modal_visible = false;
		//frames = [];
		for ( var i = 0 ; i < env.frames_input_validated ; i++ ) {
			console.log('pushing frame');
			console.log('frames input validated: ' + env.frames_input_validated);
			console.log('frames length: ' + env.frames.length);
			env.frames.push(i);
		}
//		players_array = [];
		for ( i = 0 ; i < env.team1_preview.length; i++ ) {
			this.add( env,env.team1_temp_color, env.default_positions1[i], i ,players_array)
			console.log('working');
		}
		for ( i = 0 ; i < env.team2_preview.length ; i++ ) {
			console.log('players array : ' + players_array);
			this.add( env,env.team2_temp_color, env.default_positions2[i], i+env.team1_preview.length,players_array )
		}
		this.add( env,"aqua", [9,5], "ball",players_array )
		env.mode = "create";

	}


	serviceObj.add = function(env,color,default_position,number,players_array){
		var new_current_frames = [];
		for ( var i = 0 ; i < env.frames_input_validated ; i++) {
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
		players_array.push({
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

	return serviceObj
})
