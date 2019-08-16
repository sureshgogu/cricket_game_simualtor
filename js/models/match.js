function Match(target, batsman, nonStriker) {
    this.target = target;
    this.score = 0;
    this.status = "";
    this.batsman = batsman;
    this.nonStriker = nonStriker;

    this.getTarget = function () {
        return this.target;
    }

    this.getScore = function () {
        return this.score;
    }

    this.setScore = function (score) {
        this.score = score;
    }

    this.getStatus = function () {
        return this.status;
    }

    this.setStatus = function (status) {
        this.status = status;
    }

    this.getBatsman = function () {
        return this.batsman;
    }

    this.setBatsman = function (batsman) {
        this.batsman = batsman;
    }

    this.getNonStriker = function () {
        return this.nonStriker;
    }

    this.setNonStriker = function (nonStriker) {
        this.nonStriker = nonStriker;
    }
}