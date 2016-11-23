'use strict';

describe('Controller: FrequentRouteCtrl', function () {

  // load the controller's module
  beforeEach(module('everyquickApp'));

  var FrequentRouteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FrequentRouteCtrl = $controller('FrequentRouteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FrequentRouteCtrl.awesomeThings.length).toBe(3);
  });
});
