'use strict';

/**
 * @ngdoc function
 * @name gameoflifeChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gameoflifeChallengeApp
 */
angular.module('gameoflifeChallengeApp')
  .controller('MainCtrl', function ($scope, $filter, $interval) {
    
/*  	Given the Game of Life web page (as described above)
When I set a seed pattern and click the start button
Then the grid will progressively step forward in time with the grid showing the changing pattern at each tick (based on the rules above).*/

	//the controller controls:
	//(the number of the rows and columns) - no, we're just using numbers for the row and column coordinates
	//listening for the button press
	var stepper;
	$scope.buttonPressed = function(){
		
		stepper = $interval($scope.triggerBroadcast(), 1000);

	};
	//validating the fact that at least one tick has been created
	//this can also be used to check that the population has finished and stop the recursion.
	$scope.population = [];
	

	$scope.changePop = function(item, addOrRemove) {

		if(addOrRemove == true){
			$scope.population.push(item);
		}
		else {
			var index = $scope.population.indexOf(item);
		    if (index != -1) {
		        $scope.population.splice(index, 1);
		    }
		}
	}

	$scope.triggerBroadcast = function(){
		if($scope.population.length > 0){
		var newPopulation = [];
		var frozenPopulation = angular.copy($scope.population);
		angular.forEach($scope.rows, function(r){

			angular.forEach($scope.columns, function(c){

				var neighbours = [];
				var current = {}
				var isCurrentAlive = false;

				for (var i = r - 1; i >= r + 1; i++) {
	  				for (var j = c - 1; j >= c + 1; j++) {
	      				 if(i != r && j != c){
	      				 	neighbours.push({
		      				 	'row': i,
		      				 	'column': j
		      				 });
	      				 }
	      				 else {
	      				 	current = {
	      				 		'row': i,
		      				 	'column': j
	      				 	}
	      				 }

	      				 
	      			};
	  			};
	  			//var myEl = angular.element( document.querySelector( '#' + r + c ) );
	  			var idStr = r.toString() + c.toString();
	  			//console.log(idStr);
	  			var myEl = document.getElementById(idStr);
	  			
	  			if(angular.element(myEl).hasClass('alive')){
	  				isCurrentAlive = true;
	  			}

	  			var intersect = _.intersection(neighbours, frozenPopulation);
	  			
	  			console.log('intersect',intersect );
	  			//intersect not working for objects


	  			//Any live cell with fewer than two live neighbours dies, as if caused by under-population.
				//Any live cell with two or three live neighbours lives on to the next generation.
				//Any live cell with more than three live neighbours dies, as if by over-population.
				//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

	  			if(intersect.length > 0){

					if((intersect.length < 2 || intersect.length > 3) && isCurrentAlive){
						myEl.click();
					}
					else if(intersect.length == 2 || intersect.length == 3){
						//click myEl
						myEl.click()
					}
					else if(intersect.length == 3 && !isCurrentAlive) {
						//click myEl
						myEl.click();	
					}
				}


			});

		});

		//$scope.population = newPopulation;

	}
		
		else {
			$interval.cancel();
		}
	}

	//the timer and stepping through the process
	//recursive method?

		//broadcasting the trigger for starting the examination of surrounding cells
		//$scope.$broadcast('checkSurroundingCells');

	//there will be a directive for each cell which handles the .on() from the broadcast
	$scope.columns = [];
	$scope.rows = [];
	var i = 0;
	while (i < 100) {
        $scope.columns.push(i);
		$scope.rows.push(i);
		i++;
    };


  });
