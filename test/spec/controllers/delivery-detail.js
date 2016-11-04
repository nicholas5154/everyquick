'use strict';

describe('Controller: DeliveryDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('everyquickApp'));

  var DeliveryDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeliveryDetailCtrl = $controller('DeliveryDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DeliveryDetailCtrl.awesomeThings.length).toBe(3);
  });
});
