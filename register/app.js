var app = angular.module('app', ['ngRoute', 'firebase']);

app.run(['$rootScope', '$location', function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(event, next, previous, error){
		if(error == 'AUTH_REQUIRED') {
			$rootScope.message = "sorry you must log in";
			$location.path('/');
		}
	});
}]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		})
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'
		})
		.when('/checkins/:uId/:mId', {
			templateUrl: 'views/checkins.html',
			controller: 'CheckInsController'
		})
		.when('/checkins/:uId/:mId/checkinsList', {
			templateUrl: 'views/checkinslist.html',
			controller: 'CheckInsController'
		})
		.when('/meetings', {
			templateUrl: 'views/meetings.html',
			controller: 'MeetingsController',
			resolve: {
				currentAuth: function(Authentication) {
					return Authentication.requireAuth();
				}
			}
		})

		.otherwise({
			redirectTo: '/'
		});
}]);

