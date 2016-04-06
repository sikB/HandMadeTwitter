var tweetApp = angular.module('tweetApp', ['ngRoute']);
tweetApp.controller('mainController', function($scope, $http, $routeParams, $interval){

	var url = 'http://www.digitalcrafts.com/students/twitter/hashtag.php?hash=ReasonsHumansWillGoExtinct'
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
					var currentTimeInSec = currentDate.getTime()/1000;
					$scope.data[i].sinceTweeted = Math.floor(currentTimeInSec - $scope.data[i].tweetSeconds);
					// this should be a function
					var timeInSec = $scope.data[i].sinceTweeted;
					if(timeInSec < 0){
						timeInSec = 0;
					}if(timeInSec  < 60){
						timeInSec + 's ago';
					}else if(timeInSec < 10 * 60){
						var m = Math.floor(timeInSec / 60),
						s = timeInSec - m * 60;
						 m + 'm' + (s === 0 ? '' : ' ' + s + 's') + 'ago';
					}else if (timeInSec < 60 * 60){
						 (Math.floor(timeInSec/60)) + 'm ago';
					}else if(timeInSec < 60 * 60 * 24){
						(Math>floor(timeInSec/60/60)) + 'h ago';
					} (Math.floor(timeInSec/60/60/24)) + 'd ago';
				}   
				// console.log(timeInSec);
			},1000);
		}
	})
});