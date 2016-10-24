'use strict';

describe('Service: EQSearch', function () {

  // load the service's module
  beforeEach(module('everyquickApp'));

  // instantiate service
  var EQSearch;
  beforeEach(inject(function (_EQSearch_) {
    EQSearch = _EQSearch_;
  }));

  it('should do something', function () {
    expect(!!EQSearch).toBe(true);
  });

});
