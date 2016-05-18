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
      template: '<div ng-class="statusClass" ng-click="changeStatus()" id="{{idString}}">&nbsp;</div>',
      restrict: 'E',
      /*link: function postLink(scope, element, attrs) {
        element.text('this is the singlecell directive');
      }*/
      scope: {
      	population: "=",
      	row: "=",
      	column: "=",
      	changeFunc: "&",
      },
      controller: function($scope, $filter){
      	
		var neighbours = [];
		var thisCell = { 'row': $scope.row, 'column': $scope.column };
		/*$scope.idString = function(){
			return $scope.row.toString() + $scope.column.toString();
		}*/
		$scope.idString = $scope.row.toString() + $scope.column.toString();
		$scope.statusClass = "dead";


		//console.log('35', $scope.changefunc);

      	$scope.$on('checkSurroundingCells', function(){
      		//check population list
      		//does this cell have the requisite number of neighbouring cells to populate

      		

			//var intersect = neighbours.filter(function(n) {
			//                   return $scope.population.indexOf(n) != -1
			//	               });
      		var localPop = angular.copy($scope.population);
	      	
	      		//populate with the neighbours
	      		//row +-1, column +-1
	      		
	  			for (var i = $scope.row - 1; i >= $scope.row + 1; i++) {
	  				for (var j = $scope.column - 1; j >= $scope.column + 1; j++) {
	      				 neighbours.push({
	      				 	'row': i,
	      				 	'column': j
	      				 });
	      			};
	  			};
	      		
	      	

	      	console.log('neighbours', neighbours);
	      	console.log('localPop', localPop);
      		var intersect = _.intersection(neighbours, localPop);
      		console.log(intersect);
			if(intersect.length > 0){

				if((intersect.length < 2 || intersect.length > 3) && $scope.statusClass == "alive"){
					$scope.setDead();
				}
				else if(intersect.length == 3 && $scope.statusClass == "dead") {
					$scope.setAlive();
				}
			}
			

      		
      		
      	});
      	$scope.changeStatus = function(){
      		if($scope.statusClass == "dead") {
      			$scope.setAlive();
      		}
      		else if($scope.statusClass == "alive") {
      			$scope.setDead();
      		}
      	}

      	/*$scope.amIAlive = function(){
      		
      		//do the checks above - array intersect of population and neighbours
      		//add to population if not there and alive
      		//remove if there and dead
      		//return the appropriate css class

      		return 'dead';
      	}*/

      	$scope.setAlive = function(){
      		//if this is from the initial form setup, set as alive form class
      		$scope.statusClass = "alive";
      		//add to population
      		$scope.changeFunc({'item': thisCell, 'addOrRemove':true});
      		
      	}
      	$scope.setDead = function(){
      		//if this is from the initial form setup, set as alive form class
      		$scope.statusClass = "dead";
      		//remove from population using angular filter
      		$scope.changeFunc({'item': thisCell, 'addOrRemove':false});
      		
      	}

      	


      }
    };
  });
