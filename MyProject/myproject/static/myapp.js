var app = angular.module('myApp', ['ngRoute']);
	
	app.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider){
			$locationProvider.html5Mode(true);
			$routeProvider.
				when("/", {
					templateUrl: "/static/partials/homepage.html"
				}).
				when("/register", {
					templateUrl: "/static/partials/register.html",
					controller: "loginCtrl"
				}).
				when("/login", {
					templateUrl: "/static/partials/login.html",
					controller: "loginCtrl"
				}).
				when("/loggedin", {
					templateUrl: "/static/partials/home.html",
					controller: "loginCtrl"
				}).otherwise({
					redirectTo: "/"
				});
		}]);

	app.controller('loginCtrl', function($scope, $location, $http) {
	    var log=this;
	    log.loggedName = '';
		log.login = function(){
			$http.get("/login").success(function(response){
				users = response.users;				
				log.user_exist = false;
				for (i = 0; i < users.length; i++) { 
					if((users[i].name === log.user.username) && (users[i].password === log.user.password) ) {
				      log.user_exist = true;
				      log.loggedName = log.user.username;
				    }
				};
				if (log.user_exist){
					$location.path("/loggedin")
				}else
				{
					if (!users.length){
						alert('Please Register First');
					}else{
							alert('Please Enter Correct details');
						}
				};
			})			
		}
		log.register = function($scope){
			log.addform = {'name': log.user.username, 'password': log.user.password};
			$http.post("/register", {details: log.addform}).success(function(data,status){
				log.loggedName = log.addform.name;
				$location.path("/loggedin")
			})
		}
	});


 