var tweetApp = angular.module('tweetApp', ['ngRoute']);
tweetApp.controller('mainController', function($scope, $http, $routeParams, $interval){

	var url = 'http://www.digitalcrafts.com/students/twitter/hashtag.php?hash=Trump2016'
	// &secondHash=

	$http.get(url).success(function(data){
		$scope.data = data.statuses;
		console.log(data);
		for(i=0; i<$scope.data.length; i++){
			var time = $scope.data[i].created_at;
			var tweetTime = new Date(time);
			$scope.data[i].tweetSeconds = tweetTime.getTime()/1000;
			$interval(function(){
				for(i=0; i<$scope.data.length; i++){
					var currentDate = new Date();
					var currentTimeInMilliSec = currentDate.getTime()/1;
					$scope.data[i].sinceTweeted = Math.floor(currentTimeInMilliSec - $scope.data[i].tweetSeconds);
					// this should be a function
					var timeInSec = $scope.data[i].sinceTweeted;
					console.log(timeInSec);
					var rightNow = +new Date();
					var sinceTweeted = rightNow - timeInSec;
					$scope.dateValue = new Date(sinceTweeted);
					// console.log(sinceTweeted);
				}   
			},1000);
		}
	})
});