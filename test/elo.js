var elo    = require('..'),
	assert = require('should');

var playerA = 0, playerB = 0;

describe('rating', function() {
	it('should increase playerA', function(done) {
		elo.rank(playerA, playerB, 1, 0, function(results) {
			console.log(results);
			results.should.be.a('object');
			done();
		});
	});
});