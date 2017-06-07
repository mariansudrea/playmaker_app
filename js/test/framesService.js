app.factory('frameService',function(){
	var serviceInstance = {
		'doSomething': function(){ console.log('doing something from service: ')},
		'doSomethingScope': function(a){ console.log(a.length)}
	}

	serviceInstance.removeFrame = function(frames, players, current_frame_index){
		if ( frames.length > 1 ){
			frames.pop();
			for (var i = 0 ; i < players.length; i++){
				console.log('removing frame iteration...');
				players[i].frames.pop();
			}
		}
	}
	return serviceInstance;
});
