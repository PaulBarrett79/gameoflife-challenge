'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('gameoflifeChallengeApp'));

  var MainCtrl,
    scope;

  //Given the Game of Life web page (as described above)
  //When I set a seed pattern and click the start button
  //Then the grid will progressively step forward in time with the grid showing the changing pattern at each tick (based on the rules above).

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
