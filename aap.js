app=angular.module("soccer_playmaker",["ui.router"]),app.config(["$stateProvider","$urlRouterProvider",function(r,e){r.state("app",{url:"/app",templateUrl:"/js/test/_test.html",controller:"appController"}),e.otherwise("app")}]);