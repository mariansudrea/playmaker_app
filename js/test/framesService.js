app.factory('frameService',['$timeout', function($timeout){
	var serviceInstance = {
		'doSomething': function(){ console.log('doing something from service: ')},
		'doSomethingScope': function(a){ console.log(a.length)}
	}

	serviceInstance.goToFrame = function(destination_frame_index,player,players,env){
		for ( var i = 0 ; i < players.length ; i++ ){
			if ( destination_frame_index != env.current_frame_index ){
				players[i].transitionTo(destination_frame_index);
			}
		}
		env.current_frame_index = destination_frame_index;
		player.compressPlay(env,players);
	}
	serviceInstance.playback = function(env,player,players){
		env.playing = true;
		env.selected_player = null;
		var goToNext = function(){
			serviceInstance.goToFrame(env.current_frame_index+1,player,players,env)
			if ( env.current_frame_index < env.frames.length-1 ) {
				env.playback_timeout = $timeout( function(){goToNext()}, player.speeds[player.speeds_index] * 1000 )
			} else { env.playing = false;}
		}
		if ( env.current_frame_index != 0 ){
			serviceInstance.goToFrame(0,player,players,env);
			env.playback_timeout = $timeout( function(){ goToNext() },(player.speeds[player.speeds_index] * 1000)+400)
		} else {
			goToNext()
		}

	}
	serviceInstance.stopPlayback = function(env){
		console.log('stopping playback function----');
		$timeout.cancel(env.playback_timeout);
		env.playing = false;
	}
	serviceInstance.removeFrame = function(env,players,player){
		if ( env.frames.length > 1 ){
			env.frames.pop();
			for (var i = 0 ; i < players.length; i++){
				console.log('removing frame iteration...');
				players[i].frames.pop();
			}
		}
		( env.current_frame_index == env.frames.length ? serviceInstance.goToFrame(env.frames.length-1,player,players,env) : "" ) ;
	}
	serviceInstance.addFrame = function(env,players){
		if ( env.frames.length < 10 ) {
			env.frames.push(env.frames.length);
			for ( var i = 0; i < players.length; i++) {
				console.log('add frame iteration...');
				players[i].frames.push(JSON.parse(JSON.stringify(players[i].frames[players[i].frames.length-1])));
			}
		}
		
	}



	return serviceInstance;
}]);
