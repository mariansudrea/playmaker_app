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
		console.log('URL CHANGE DETECTED');
		$scope.env.input_play = $location.search().play;
		$scope.players = [];
		$scope.player.decompressPlay($scope.env,$scope.css_colors,$scope.players,$scope.frameService);
	});

	if ( $location.search().play != undefined ) {
		console.log('play string received: ' + $location.search().play);
		$scope.env.input_play = $location.search().play;
		$scope.players = [];	
		$scope.player.decompressPlay($scope.env,$scope.css_colors,$scope.players,$scope.frameService);
	}
	$scope.player.updateAnimationStyle($scope.players,$scope.env)

}])

