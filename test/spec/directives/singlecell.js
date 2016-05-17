'use strict';

describe('Directive: singlecell', function () {

  // load the directive's module
  beforeEach(module('gameoflifeChallengeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<singlecell></singlecell>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the singlecell directive');
  }));
});
