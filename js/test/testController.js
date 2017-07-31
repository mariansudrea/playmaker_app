app.controller('testController', ['playerService','envService','frameService','colors','$scope','$timeout','$location', function(player,env, frameService,colors,$scope,$timeout,$location){

//		Load Services
//
	$scope.env = env;
	$scope.frameService = frameService;
	$scope.player = player;
	$scope.css_colors = colors;
	$scope.players = [];

// 		Init Functions

	$scope.$on('$locationChangeSuccess', function(){
//		console.log('URL CHANGE DETECTED');
		$scope.env.input_play = $location.search().play;
		$scope.players = [];
		$scope.player.decompressPlay($scope.env,$scope.css_colors,$scope.players,$scope.frameService);
		$scope.env.changeSport($location.search().s || "arenasoccer",$scope.players);
		$scope.env.current_frame_index = 0;
	});
	var input_play_validation = /^[0-9]{6}_[a-zA-Z0-9_]+$/
	if ( input_play_validation.test($location.search().play) == false ) {
		console.log("Input play donesn't look right..")
	}
	if ( typeof $location.search().play != undefined && input_play_validation.test($location.search().play)) {
//		console.log('location.search.play: ' + $location.search().play);
		$scope.env.input_play = $location.search().play;
		$scope.players = [];	
		$scope.player.decompressPlay($scope.env,$scope.css_colors,$scope.players,$scope.frameService);
		$scope.env.changeSport(($location.search().s || "arenasoccer"),$scope.players );
	}
	$scope.player.updateAnimationStyle($scope.players,$scope.env)

}])

