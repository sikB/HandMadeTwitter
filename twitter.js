var tweetApp = angular.module('tweetApp', ['ngRoute']);
tweetApp.controller('mainController', function($scope, $http, $routeParams, $interval){

	var url = 'http://www.digitalcrafts.com/students/twitter/hashtag.php?hash=';
	// var topic = $scope.hashtag;
	// &secondHash=

	$http.get(url + 'JustinBieber').success(function(data){
		$scope.data = data.statuses;
		for(i=0; i<$scope.data.length; i++){
			var tweetTime = $scope.data[i].created_at; //regular format 
			var tweetTimeInMilliSec = +new Date(tweetTime); //in millisec
			// $interval(function(){ //interval loop for live time update
				// for(i=0; i<$scope.data.length; i++){
					var rightNow = +new Date(); //current time in ms
					var sinceTweeted = rightNow - tweetTimeInMilliSec; //current time in ms minus tweeted at in ms
					$scope.data[i].sinceTweeted = sinceTweeted;
					// console.log(sinceTweeted);
				// }   
			// },1000);
		}
	});
	$scope.enterHash = function(){
		$scope.hashtag = $scope.userInputHash;
		$http.get(url + $scope.hashtag).success(function(data){
		$scope.data = data.statuses;
		for(i=0; i<$scope.data.length; i++){
			var tweetTime = $scope.data[i].created_at; //regular format 
			var tweetTimeInMilliSec = +new Date(tweetTime); //in millisec
			$interval(function(){ //interval loop for live time update
				for(i=0; i<$scope.data.length; i++){
					var rightNow = +new Date(); //current time in ms
					var sinceTweeted = rightNow - tweetTimeInMilliSec; //current time in ms minus tweeted at in ms
					$scope.data[i].sinceTweeted = sinceTweeted;
					// console.log(sinceTweeted);
				}   
			},1000);
		}
	})
	}
});