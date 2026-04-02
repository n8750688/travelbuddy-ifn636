const assert = require('assert');

describe('Travel Buddy API', function() {
  it('should confirm server module exports', function() {
    const app = require('../server');
    assert(app, 'App should be exported');
  });
});