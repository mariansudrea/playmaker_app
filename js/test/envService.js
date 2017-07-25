app.factory('envService',['$rootScope','$timeout','$location','$anchorScroll', function($rootScope,$timeout,$location,$anchorScroll){
	$rootScope.anchorScroll = $anchorScroll;
	var frame_styles= [];
	for ( var i = 0 ; i < 10 ; i++){
		frame_styles.push({'background-color':'none'});
	}
	var field_styles_3d = [
		{transform: 'none'},
		{transform: 'perspective( 450px ) rotateX(55deg) rotateZ(90deg) translateX(-200px)'},
//		{transform: 'perspective( 450px ) rotateX(55deg) rotateZ(0deg) translateX(0px)'},
		{transform: 'perspective( 500px) rotateX(50deg) rotateZ(0deg) translateY(-100px) scaleX(0.9)'},
		{transform: 'perspective( 450px ) rotateX(55deg) rotateZ(-90deg) translateX(200px)'},
		{transform: 'perspective( 500px) rotateX(50deg) rotateZ(180deg) translateY(100px) scaleX(0.9)'},
	]
	var ball_style = {
		'background-color': "none",
		'background': "url('/images/ball.png')",
		'background-position': "-4px -4px",
		'background-size': "47px 47px",
	}
	var sample_plays = [
		["147009_757575757575757575_2y2y2y2y2y2y2y2y2y_3b3b3b3b3b3b3b3b3b_3f3f3f3f3f3f3f3f3f_8q8q8q8q8q8q8q8q8q_tDtDt9t9sot9t9t9tb_p9p9qnpDp9p9p9p9p9_t3t3t3skt3t3t3t3t3_pgpgpgpgpIqrpIpIq0_rarar8rBrDrararara_r9qjqkqlqlqlqlqlr9","basketball","Free Throw"],
		["082007_5f5f5f5f_5q5q5q5q_72727272_0n0n1717_89898989_2m3B3B3B_8H8e8e8e_r1r1r1qg_qHqHqepu_sbsbsbsb_p4pypypy_rrrrrrqI_sIsIsIsI_totototo_rnrnnwsf","arenasoccer","Free Kick"],
		["082007_5f5f5f5f_5q5q5q5q_6i6i6i6i_1y1y1y1y_89898989_2m2m2m2m_8H8H8H8H_r1r1r1r1_qHqHqHqH_sbsbsbsb_p4p4p4p4_rrrrrrrr_sfsfsfsf_sGsGsGsG_rnrnrnrn","arenasoccer","Free Throw"],
		["082007_5f5f5f5f_5q5q5q5q_6i6i6i6i_1y1y1y1y_89898989_2m2m2m2m_8H8H8H8H_r1r1r1r1_qHqHqHqH_sbsbsbsb_p4p4p4p4_rrrrrrrr_sfsfsfsf_sGsGsGsG_rnrnrnrn","arenasoccer","Free Throw"]
	];
	var field_styles = {
		'associationfootball': {//'background-color': "rgba(44, 140, 25, 0.5)",
						'border-radius':	"0px",
						'background': 		"url('/images/turf4.jpg')",
						'background-size': 	"50px 50px"	},
		'icehockey': {//'background-color': "rgba(44, 140, 25, 0.5)",
						'border-radius':	"100px",
						'background': 		"url('/images/ice.png')",
						'background-size': 	"200px 50px"	,
						'margin-top': 	"28px"	,
						'margin-bottom': 	"28px"	,
						'height':			"420px"},
		'arenasoccer': {//'background-color': "rgba(44, 140, 25, 0.5)",
						'border-radius':	"130px",
						'background': 		"url('/images/turf4.jpg')",
						'background-size': 	"50px 50px"	},
		'basketball': {	//'background-color': "rgb(237, 218, 125)",
						'border-radius':	"0px",
						'background': 		"url('/images/hardwood2.jpg')",
						'background-size': 	"20% 20%"	},
	};
	var hoop_net_divs = [];
	for  ( var i = 0 ; i < 25 ; i++ ){
		hoop_net_divs.push(i);
	}
	var env = {
		anchorScroll:			$anchorScroll,
		ball_style:				ball_style,	
		ball_rotation:			[0,-1,0,1,2],
		conversion_array: 	[ "0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t",
								"u","v","w","x","y","z","A","B","C","D","E","F","G","H","I" ],	
		current_frame_index:	0,
		current_3d_index:		0,
		current_sport:			"basketball",
		field_style:			field_styles['basketball'],
		field_styles:			field_styles,
		field_styles_3d:		field_styles_3d,
		frames:					[0],
		frame_styles: 			frame_styles,
		frames_input:		 	1,
		frames_input_validated: 1,
		grid_size:				[],
		grid_size_length:		493,
		hoop_net_divs:			hoop_net_divs,
		load_menu_visible:		false,
		mode:					"edit",
		modal_visible:			false,
		play_data_model:		"",
		sample_plays:			sample_plays,
		selected_player:		null,
		team1_input:			5,
		team2_input:			5,
		team1_temp_color:		"aquamarine",
		team2_temp_color:		"lime",
		team1_preview:			[],
		team2_preview:			[],
		team1_temp_style:		{},
		team2_temp_style:		{},
		team1_temp_color_index:	"003",
		team2_temp_color_index:	"082",
		test:					function(){console.log('testing')},
		default_positions1:	 	[ [2,8],[12,8],[10,8],[9,3],[9,13],[13,1],[13,15],[13,6],[13,14],[13,15],[13,1] ],
		default_positions2:	 	[ [26,8],[16,8],[18,8],[19,3],[19,13],[15,1],[15,15],[16,2],[16,4],[17,4],[17,7] ]
	}
	
	env.randomize = function(team_number,colors){
		var target = "team"+team_number+"_temp_color";
		var random_index = Math.floor(Math.random() * 148);
		this[target] = colors[random_index];
//		console.log('team ' + team_number + ' temp color: ' + this[target] );
	}
	env.addZeroPadding = function(index){
		if ( index.toString().length != 3){
			return ( index.toString().length == 2 ? "0"+index : "00"+index );
		} else return index;
	}
	env.toggleSelected = function(target_player){
//		console.log('toggling');
		if (this.selected_player === target_player){
			this.selected_player = null;
		} else { this.selected_player = target_player }
	}
	env.updateSelectedPlayer = function(player){
		var frm = this.selected_player.frames[this.current_frame_index];
//		console.log('updated player jersey: ' + env.selected_player.jersey_number);
		if ( env.selected_player.jersey_number == "ball" ){
			var ball_type = env.current_sport;
		} else var ball_type = undefined;
		env.selected_player.current_style = new player.GeneratedStyle(frm.posX,frm.posY,this.selected_player.default_color,frm.highlighted,ball_type);
		if ( this.mode == "create" ) { this.flashFrames() } // create mode animation	
	}
	env.flashFrames = function(){
		for ( var i = this.current_frame_index ; i < this.frames.length ; i++){
			(function(j){
				$timeout(function(){
					env.frame_styles[j] = { 'background-color':'lightgray' };	
				},30*(j-env.current_frame_index));	
				$timeout(function(){
					env.frame_styles[j] = { 'background-color':'none' };	
				},180+30*(j-env.current_frame_index));	
			})(i)
		}	
	}
	env.moveSelectedPlayer = function(grid_square_object,player){
		
		if ( env.selected_player != null ) {
//			console.log('move selected function triggered');
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
//		console.log('toggling Highlight');
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
		var t1_val = validateMinMax(env.team1_input,1,11); 
		var t2_val = validateMinMax(env.team2_input,1,11); 
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
		$location.search({	'play': env.play_data_model,
							's': env.current_sport
					});		
	}
	env.load = function(play){
		console.log('loading');
		$location.search({	'play': play[0],
							's': play[1]
					});		
		env.load_menu_visible = false;
	}

	env.changeSport = function(sport,players_array){
//		console.log('players_array passed' + players_array);
//		console.log('changing sport to ' + sport);
		env.current_sport = sport;
		env.field_style = env.field_styles[sport];
		players_array[players_array.length-1].current_style['background-image'] = "url('./images/" + sport + ".png')"

	}
	env.toggleLoadMenu = function(){
		env.load_menu_visible = ( env.load_menu_visible == true ? false : true )
	}
	env.toggle3d = function(players){
		console.log('toggle 3d triggered');
		console.log('stage / old index: ' + env.current_3d_index);
		env.current_3d_index = ( env.current_3d_index != env.field_styles_3d.length-1 ? env.current_3d_index + 1 : 0 );
        for ( var i = 0 ; i < players.length ; i++ ){
            players[i].transitionTo(env.current_frame_index);
        }
	
	}

	for (var i = 0; i < env.grid_size_length ; i++ ){
		env.grid_size[i] = { 	posX: i % 29,
								posY: Math.floor(i/29),
			}; 
	}

	return env;
}]);
