function ScoreProbablity(score, probability) {
    this.score = score;
    this.probability = probability;

    this.getScore = function () {
        return this.score;
    }

    this.getProbability = function () {
        return this.probability;
    }
}