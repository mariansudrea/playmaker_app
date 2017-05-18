app = angular.module('soccer_playmaker', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

      $stateProvider
      .state('test', {
          	url: '/test',
			templateUrl: '/js/test/_test.html',
//			template: 'hello',
			controller: 'testController'
		});
		$urlRouterProvider.otherwise('test');
}])




