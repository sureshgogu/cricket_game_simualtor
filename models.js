const statusOUT = "out";
const statusNOTOUT = "notout";
const statusNOTBATTED = "notbatted";

function Batsman(name, probability) {
    this.name = name;
    this.score = 0;
    this.balls = 0;
    this.probability = probability;
    this.status = statusNOTBATTED;

    this.getName = function() {
        return this.name;
    }

    this.setName = function(name) {
        this.name = name;
    }

    this.getScore = function() {
        return this.score;
    }

    this.setScore = function(score) {
        this.score = score;
    }

    this.getBalls = function() {
        return this.balls;
    }

    this.setBalls = function(balls) {
        this.balls = balls;
    }

    this.getProbability = function() {
        return this.probability;
    }

    this.setProbability = function(probability) {
        this.probability = probability;
    }

    this.getStatus = function() {
        return this.status;
    }

    this.setStatus = function(status) {
        this.status = status;
    }
}

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

function Match(target, status, batsman, nonStriker) {
    this.target = target;
    this.score = 0;
    this.status = status;
    this.batsman = batsman;
    this.nonStriker = nonStriker;

    this.getTarget = function() {
        return this.target;
    }

    this.getScore = function() {
        return this.score;
    }

    this.setScore = function(score) {
        this.score = score;
    }

    this.getStatus = function() {
        return this.status;
    }

    this.setStatus = function(status) {
        this.status = status;
    }

    this.getBatsman = function() {
        return this.batsman;
    }

    this.setBatsman = function(batsman) {
        this.batsman = batsman;
    }

    this.getNonStriker = function() {
        return this.nonStriker;
    }

    this.setNonStriker = function(nonStriker) {
        this.nonStriker = nonStriker;
    }
}