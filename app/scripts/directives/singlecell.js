'use strict';

/**
 * @ngdoc directive
 * @name gameoflifeChallengeApp.directive:singlecell
 * @description
 * # singlecell
 */
angular.module('gameoflifeChallengeApp')
  .directive('singlecell', function () {
    return {
      template: '<div ng-class="statusClass" ng-click="changeStatus()">&nbsp;</div>',
      restrict: 'E',
      /*link: function postLink(scope, element, attrs) {
        element.text('this is the singlecell directive');
      }*/
      scope: {
      	population: "=",
      	row: "=",
      	column: "=",
      	changefunc: "&",
      },
      transclude: true,
      controller: function($scope, $filter){
      	
      	//Any live cell with fewer than two live neighbours dies, as if caused by under-population.
		//Any live cell with two or three live neighbours lives on to the next generation.
		//Any live cell with more than three live neighbours dies, as if by over-population.
		//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
		var neighbours = [];
		var thisCell = { 'row': $scope.row, 'column': $scope.column };
		$scope.statusClass = "dead";

      	$scope.$on('checkSurroundingCells', function(){
      		//check population list
      		//does this cell have the requisite number of neighbouring cells to populate
      		
      		//
      		$scope.amIAlive();
      	});
      	$scope.changeStatus = function(){
      		if($scope.statusClass == "dead") {
      			$scope.statusClass = "alive";
      		}
      		else if($scope.statusClass == "alive") {
      			$scope.statusClass = "dead";
      		}
      	}

      	$scope.amIAlive = function(){
      		
      		//do the checks above - array intersect of population and neighbours
      		//add to population if not there and alive
      		//remove if there and dead
      		//return the appropriate css class

      		return 'dead';
      	}

      	$scope.setAlive = function(){
      		//if this is from the initial form setup, set as alive form class
      		$scope.statusClass = "alive";
      		//add to population using angular filter
      		//
      		$scope.changefunc(thisCell, true);
      	}
      	$scope.setDead = function(){
      		//if this is from the initial form setup, set as alive form class
      		$scope.statusClass = "dead";
      		//remove from population using angular filter
      		//var filtered = $filter("filter")($scope.population, thisCell, true);
      		$scope.changefunc(thisCell, false);
      	}

      	if (neighbours === []){
      		//populate with the neighbours
      		//row +-1, column +-1
      		
  			for (var i = row - 1; i >= row + 1; i++) {
  				for (var j = column - 1; j >= column + 1; j++) {
      				 neighbours.push({
      				 	'row': i,
      				 	'column': j
      				 });
      			};
  			};
      		
      	}


      }
    };
  });
