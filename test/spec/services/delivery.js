'use strict';

describe('Service: Delivery', function () {

  // load the service's module
  beforeEach(module('everyquickApp'));

  // instantiate service
  var Delivery;
  beforeEach(inject(function (_Delivery_) {
    Delivery = _Delivery_;
  }));

  it('should do something', function () {
    expect(!!Delivery).toBe(true);
  });

});
