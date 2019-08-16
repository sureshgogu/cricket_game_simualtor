function Ball(ballNo, score, batsman) {
    this.ballNo = ballNo;
    this.score = score;
    this.batsman = batsman;

    this.getBallNo = function () {
        return this.ballNo;
    }

    this.setBallNo = function (ballNo) {
        this.ballNo = ballNo;
    }

    this.getScore = function () {
        return this.score;
    }

    this.setScore = function (score) {
        this.score = score;
    }

    this.getBatsman = function () {
        return this.batsman;
    }

    this.setBatsMan = function (batsman) {
        this.batsman = batsman;
    }
}