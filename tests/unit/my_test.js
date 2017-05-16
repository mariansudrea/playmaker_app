describe('sorting the list of users', function() {
	it('sorts in descending order by default', function() {
		expect(1).toEqual(1);
	});
});
describe('TestController', function() {
        it('should initialize test to "it works. "', function(){
            module('soccer_playmaker');

            var scope = {};
            var ctrl;

            inject(function($controller){
                ctrl = $controller('testController', {$scope:scope});
            });

			expect(scope.testFunction()).toEqual('it works.');
        });
});
