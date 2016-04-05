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

				}
			},1000);

		}

	})

});