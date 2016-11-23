'use strict';

describe('Controller: FrequentroutesCtrl', function () {

  // load the controller's module
  beforeEach(module('everyquickApp'));

  var FrequentroutesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FrequentroutesCtrl = $controller('FrequentroutesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FrequentroutesCtrl.awesomeThings.length).toBe(3);
  });
});
