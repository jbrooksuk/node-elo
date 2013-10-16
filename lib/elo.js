function Rating() {
	this.KFACTOR = 16;

	this._newRatingA;
	this._newRatingB;
}

Rating.prototype.rank = function(ratingA, ratingB, scoreA, scoreB, callback) {
	this.setNewSettings(ratingA, ratingB, scoreA, scoreB, function(scores) {
		callback(scores);
	}.apply(this));
};

Rating.prototype.setNewSettings = function(ratingA, ratingB, scoreA, scoreB, callback) {
	this.getExpectedScores(ratingA, ratingB, function(expectedScores) {
		console.log(expectedScores)
		var newRatings = this.getNewRatings(ratingA, ratingB, expectedScores['a'], expectedScores['b'], scoreA, scoreB);

		this._newRatingA = newRatings['a'];
		this._newRatingB = newRatings['b'];

		callback();
	}.apply(this));
};

Rating.prototype.getNewRatings = function(callback) {
	callback({
		a: this._newRatingA,
		b: this._newRatingB,
	});
};

Rating.prototype.getExpectedScores = function(ratingA, ratingB, callback) {
	var expectedScoreA = 1 / (1 + (Math.pow(10, (ratingB - ratingA) / 400)));
	var expectedScoreB = 1 / (1 + (Math.pow(10, (ratingA - ratingB) / 400)));

	callback({
		a: expectedScoreA,
		b: expectedScoreB
	});
};

Rating.prototype.getNewRatings = function(ratingA, ratingB, expectedA, expectedB, scoreA, scoreB, callback) {
	var newRatingA = ratingA + (this.KFACTOR * (scoreA - expectedA));
	var newRatingB = ratingB + (this.KFACTOR * (scoreB - expectedB));

	callback({
		a: newRatingA,
		b: newRatingB
	});
};

module.exports = exports = new Rating();