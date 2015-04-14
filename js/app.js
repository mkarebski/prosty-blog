var app = angular.module("myApp", ['ngRoute']);
var posts = null;

app.controller('PostsController', ['$scope', '$http', function PostsController($scope, $http) {
	$http.get('data.json').success(function(data, status) {
    	$scope.posts = posts = data;
    });
}]);

app.controller('PostController', ['$scope', '$http', '$routeParams', function PostController($scope, $http, $routeParams) {
		for(var i = 0; i < posts.length; i++) 
			if(posts[i].title == $routeParams.title) 
				$scope.post = posts[i];	
}]);

app.controller('AuthorPostController', ['$scope', '$http', '$routeParams', function AuthorPostController($scope, $http, $routeParams) {
		var authorsPosts = [];
		for(var i = 0; i < posts.length; i++) 
			if(posts[i].author == $routeParams.author) 
				authorsPosts.push(posts[i]);
		$scope.posts = authorsPosts;
}]);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'pages/posts.html',
		controller  : 'PostsController'
	})
	.when('/post/:title', {
		templateUrl : 'pages/post.html',
		controller  : 'PostController'
	})
	.when('/author/:author', {
		templateUrl : 'pages/posts.html',
		controller  : 'AuthorPostController'
	}).
	when('/about', {
		templateUrl : 'pages/about.html',
	}).
	when('/login', {
		templateUrl : 'pages/login.html',
	})
	.otherwise({
        redirectTo : '/'
    });
});