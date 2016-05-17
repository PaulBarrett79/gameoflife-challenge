'use strict';

/**
 * @ngdoc function
 * @name gameoflifeChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gameoflifeChallengeApp
 */
angular.module('gameoflifeChallengeApp')
  .controller('MainCtrl', function ($scope) {
    
/*  	Given the Game of Life web page (as described above)
When I set a seed pattern and click the start button
Then the grid will progressively step forward in time with the grid showing the changing pattern at each tick (based on the rules above).*/

	//the controller controls:
	//(the number of the rows and columns) - no, we're just using numbers for the row and column coordinates
	//listening for the button press
	$scope.buttonPressed = function(){


	};
	//validating the fact that at least one tick has been created
	//this can also be used to check that the population has finished and stop the recursion.
	$scope.population = [];
	$scope.hasAtLeastOneTickBeenCreated = function(){
		//
	};

	$scope.changePop = function(item, addOrRemove) {
		console.log('changePop');
		if(addOrRemove == false){
			$scope.population.push(item);
		}
		else {
			$scope.population = $filter("filter")($scope.population, item, true);
		}
	}
	//the timer and stepping through the process
	//recursive method?

		//broadcasting the trigger for starting the examination of surrounding cells
		$scope.$broadcast('checkSurroundingCells');

	//there will be a directive for each cell which handles the .on() from the broadcast
	$scope.columns = [];
	$scope.rows = [];
	var i = 0;
	while (i < 100) {
        $scope.columns.push(i);
		$scope.rows.push(i);
		i++;
    }
  });
