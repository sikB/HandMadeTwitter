var tweetApp = angular.module('tweetApp', ['ngRoute']);
tweetApp.directive('tweetData', function(){
	return {
		restrict: "EA",
		template: '{{tweet.text}} -- {{tweet.user.name}} -- {{tweet.sinceTweeted}} seconds ago <img ng-src="{{tweet.user.profile_banner_url}}"/>',
		link: function($scope, element, attrs){}
	}
});

tweetApp.factory('myFactory', function($http, $q){
	var service = {};
	var baseUrl = 'http://digitalcrafts.com/students/twitter/hashtag.php';
	var _hash = '';
	var finalUrl = '';

	var buildUrl = function(){
		queryStringStart = '?hash=';
		finalUrl = baseUrl + queryStringStart + _hash;
		return finalUrl;
	}

	service.setHash = function(hash, secondHash){
		_hash = {
			hash: hash,
			secondHash: secondHash
		}
	}
	service.getHash = function(){
		return _hash;
	}
	service.callTwitter = function(){
		buildUrl();
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: finalUrl
		}).success(function(data){
			deferred.resolve(data);
		}).error(function(){
			deferred.reject("There is an error");
		});
		return deferred.promise;
	}
	return service;
});
tweetApp.controller('mainController', function($scope, $http, $routeParams, $interval, myFactory){
	$scope.data = {};
	$scope.updateHash = function(userHash){
		myFactory.setHash(userHash);
	};
	function submitHash(){
		myFactory.callTwitter().then(function(data){
			$scope.data = data.statuses;
		}, function(data){
			alert(data);
		});
	}
	myFactory.setHash('trump')
	submitHash();
	myFactory.getHash();
});







