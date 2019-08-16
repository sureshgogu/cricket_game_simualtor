function Batsman(name, probability) {
    this.name = name;
    this.score = 0;
    this.balls = 0;
    this.probability = probability;
    this.status = BATTING_STATUS.NOTBATTED;

    this.getName = function () {
        return this.name;
    }

    this.setName = function (name) {
        this.name = name;
    }

    this.getScore = function () {
        return this.score;
    }

    this.setScore = function (score) {
        this.score = score;
    }

    this.getBalls = function () {
        return this.balls;
    }

    this.setBalls = function (balls) {
        this.balls = balls;
    }

    this.getProbability = function () {
        return this.probability;
    }

    this.setProbability = function (probability) {
        this.probability = probability;
    }

    this.getStatus = function () {
        return this.status;
    }

    this.setStatus = function (status) {
        this.status = status;
    }
}