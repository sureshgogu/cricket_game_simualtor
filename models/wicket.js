function Wicket(ball, batsman) {
    this.ball = ball;
    this.batsman = batsman;

    this.getBall = function () {
        return this.ball;
    }

    this.getBatsman = function () {
        return this.batsman;
    }
}