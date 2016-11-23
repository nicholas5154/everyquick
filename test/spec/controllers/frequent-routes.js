'use strict';

describe('Controller: FrequentRoutesCtrl', function () {

  // load the controller's module
  beforeEach(module('everyquickApp'));

  var FrequentRoutesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FrequentRoutesCtrl = $controller('FrequentRoutesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FrequentRoutesCtrl.awesomeThings.length).toBe(3);
  });
});
