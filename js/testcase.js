/**
 * This is file is combination of all js files to support test cases
 */

const TOTAL_OVERS = 4;
const BALLS_PER_OVER = 6;

const BATTING_STATUS = {
    OUT: "out",
    PLAYING: "playing",
    NOTBATTED: "notbatted"
}

const OUT = "OUT";
const INPROGRESS = "Inprogress";

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

function Match(target, status, batsman, nonStriker) {
    this.target = target;
    this.score = 0;
    this.status = status;
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


function setBatsManInfo(name, scoreProbability) {
    var probability = getProbability(scoreProbability);
    return new Batsman(name, probability);
}

function getProbability(scoreProbability) {
    if(!Array.isArray(scoreProbability)) {
        return null
    }
    var probability = [];
    for (var i = 0, iLen = scoreProbability.length; i < iLen; i++) {
        var ele = scoreProbability[i];
        probability.push(new ScoreProbablity(ele.score, ele.probability));
    }
    return probability;
}

function getNextBatsman(players, batsmanPosition) {
    let batsman = getBatsman(players, batsmanPosition);
    if (batsman) {
        setBatsmanStatus(batsman, BATTING_STATUS.PLAYING);
    }
    return batsman;
}

function getBatsman(players, batsmanPosition) {
    let batsman = null;
    if (batsmanPosition < players.length) {
        batsman = players[batsmanPosition];
    }
    return batsman;
}

function setBatsmanStatus(batsman, status) {
    batsman.setStatus(status);
}

function setBatsmanOut(batsman, ball, wicketsList) {
    setBatsmanStatus(batsman, BATTING_STATUS.OUT);
    insertWicketIntoList(wicketsList, new Wicket(ball, batsman));
}

function setNextBatsmanInMatch(players, wicketsList) {
    let nextBatsman = getNextBatsman(players, getCountOfWicketsFell(wicketsList) + 1);
    match.setBatsman(nextBatsman);
}

function hideElement(element) {
    if(!element) {
        return;
    }
    element.classList.add("hide");
}

function showElement(element) {
    if(!element) {
        return;
    }
    element.classList.remove("hide");
}

function setInnerHTML(element, html) {
    if(!element) {
        return;
    }
    element.innerHTML = html;
}

function appentElement(parentElement, childElement) {
    if(!parentElement) {
        return;
    }
    parentElement.appendChild(childElement);
}

function getWeightedRandomNumber(weightedProbability) {
    if(!Array.isArray(weightedProbability)) {
        return null
    }

    var random = Math.floor(Math.random() * 100);

    let sum = 0;
    for (i = 0, iLen = weightedProbability.length; i < iLen; i++) {
        let scoreProbability = weightedProbability[i];
        sum += scoreProbability.getProbability();
        if (random <= sum) {
            return scoreProbability.getScore();
        }
    }
    return null;
}

function changeBatsmanStrike(match) {
    //swapping players
    var batsman = match.getBatsman();

    match.setBatsman(match.getNonStriker());
    match.setNonStriker(batsman);
}

function getTargetLeft(match) {
    return match.getTarget() - match.getScore();
}

function isMatchInProgress() {
    return match.getStatus() && match.getStatus() == INPROGRESS;
}

function getOversLeft(overs) {
    var oversLeft = TOTAL_OVERS - getOversBowled(overs);
    if(getBallsLeftInLastOver(overs) == BALLS_PER_OVER) {
        oversLeft++;
    }
    return oversLeft;
}

function getOversBowled(overs) {
    return overs.length;
}

function getCurrentOver(overs) {
    var length = getOversBowled(overs);
    if (isOverCompleted(overs[length - 1])) {
        overs.push([]);
        length = getOversBowled(overs);
    }
    return overs[length - 1];
}

function getBallsBowledInOver(over) {
    return over.length;
}

function getOver(overs, no) {
    return overs[no];
}

function isOverCompleted(over) {
    return getBallsBowledInOver(over) == BALLS_PER_OVER;
}

function getBallsLeft(overs) {
    var balls;

    var oversLength = getOversBowled(overs);
    var oversLeft = TOTAL_OVERS - oversLength;
    balls = getBallsLeftInLastOver(overs);
    balls += oversLeft * BALLS_PER_OVER;
    return balls;
}

function getBallsRemainingMessage(remaining) {
    var message;
    if (remaining <= BALLS_PER_OVER) {
        message = remaining + " ball(s)"
    } else {
        message = Math.floor(remaining / BALLS_PER_OVER) + "." + (remaining % BALLS_PER_OVER) + " overs";
    }
    return " and " + message + " remaining";
}

function getBallsLeftInLastOver(overs) {
    var lastOver = getOver(overs, getOversBowled(overs) - 1);
    return BALLS_PER_OVER - getBallsBowledInOver(lastOver);
}

function insertBallIntoOver(over, ball) {
    over.push(ball);
}

function getWicketsLeft(players, wicketsList) {
    return players.length - getCountOfWicketsFell(wicketsList);
}

function insertWicketIntoList(wicketsList, wicket) {
    wicketsList.push(wicket);
}

function getCountOfWicketsFell(wicketsList) {
    return wicketsList.length;
}


var playersInfo, overs, players, wicketsList, match;
var eleCommentarySection, eleButtonStart, eleButtonNext;

document.addEventListener('DOMContentLoaded', function () {
    eleCommentarySection = document.getElementsByClassName("commentary-section")[0];
    eleButtonStart = document.getElementsByClassName("button-start")[0];
    eleButtonNext = document.getElementsByClassName("button-next")[0];

    if(eleButtonStart) {
        eleButtonStart.addEventListener("click", startMatch);
    }
    if(eleButtonNext) {
        eleButtonNext.addEventListener("click", bowlNextBall);
    }

    setPlayersDetails();
});

function setPlayersDetails() {
    playersInfo = [{
        name: "Kirat Boli",
        scoreProbability: [{ score: 0, probability: 5 }, { score: 1, probability: 30 }, { score: 2, probability: 25 }, { score: 3, probability: 10 }, { score: 4, probability: 15 }, { score: 5, probability: 1 }, { score: 6, probability: 9 }, { score: OUT, probability: 5 }]
    }, {
        name: "NS Nodhi",
        scoreProbability: [{ score: 0, probability: 10 }, { score: 1, probability: 40 }, { score: 2, probability: 20 }, { score: 3, probability: 5 }, { score: 4, probability: 10 }, { score: 5, probability: 1 }, { score: 6, probability: 4 }, { score: OUT, probability: 10 }]
    }, {
        name: "R Rumrah",
        scoreProbability: [{ score: 0, probability: 20 }, { score: 1, probability: 30 }, { score: 2, probability: 15 }, { score: 3, probability: 5 }, { score: 4, probability: 5 }, { score: 5, probability: 1 }, { score: 6, probability: 4 }, { score: OUT, probability: 20 }]
    }, {
        name: "Shashi Henra",
        scoreProbability: [{ score: 0, probability: 30 }, { score: 1, probability: 25 }, { score: 2, probability: 5 }, { score: 3, probability: 0 }, { score: 4, probability: 5 }, { score: 5, probability: 1 }, { score: 6, probability: 4 }, { score: OUT, probability: 30 }]
    }]
}

function startMatch() {
    hideElement(eleButtonStart);
    showElement(eleButtonNext);

    setInnerHTML(eleCommentarySection, "");

    resetStatistics();
    displayOverStartingCommentory();
}

function resetStatistics() {
    overs = [], players = [], wicketsList = [];
    overs.push([]);

    //Adding players details
    for (var i = 0, iLen = playersInfo.length; i < iLen; i++) {
        var player = playersInfo[i];
        players.push(setBatsManInfo(player.name, player.scoreProbability));
    }

    var striker = getNextBatsman(players, 0);
    var nonStriker = getNextBatsman(players, 1);

    match = new Match(40, INPROGRESS, striker, nonStriker);
}

function bowlNextBall() {
    if (!isMatchInProgress()) {
        //If match already completed and trying continue again
        displayMatchStatusCommentory(match.getStatus());
        return;
    }

    var currentOver = getCurrentOver(overs);
    var ballsBowled = getBallsBowledInOver(currentOver);

    var overNo = getOversBowled(overs) - 1;
    var ballNo = ballsBowled + 1;

    var batsman = match.getBatsman();
    var runs = getWeightedRandomNumber(batsman.getProbability());
    if(!runs && runs != 0) {
        return;
    }

    batsman.setBalls(batsman.getBalls() + 1);
    insertBallIntoOver(currentOver, new Ball(ballNo, runs, batsman));

    var ballCommentory, ball = overNo + "." + ballNo;
    if (runs == OUT) {
        //If batsman out, changing current batsman status, updating wickets and updating next batsman
        ballCommentory = ball + " " + batsman.getName() + " <b>OUT<b>";

        setBatsmanOut(batsman, ball, wicketsList);
        setNextBatsmanInMatch(players, wicketsList);
    } else {
        batsman.setScore(batsman.getScore() + runs);
        match.setScore(match.getScore() + runs);
        ballCommentory = ball + " " + batsman.getName() + " scores " + runs;
    }
    updateDisplayedCommentory(ballCommentory);

    if (runs % 2 != 0 && runs != OUT) {
        changeBatsmanStrike(match);
    }

    if (isOverCompleted(currentOver)) {
        changeBatsmanStrike(match);
    }

    var matchStatus = getMatchStatus();
    if (matchStatus != INPROGRESS) {
        match.setStatus(matchStatus);
        displayMatchStatusCommentory(matchStatus);
        printScoreCard();
        showStartAgainOption();
    } else {
        if (isOverCompleted(currentOver)) {
            //Match not completed and over completed
            displayOverStartingCommentory();
        }
    }
}

function showStartAgainOption() {
    setInnerHTML(eleButtonStart, "Restart Again ?");
    showElement(eleButtonStart);
}

function displayOverStartingCommentory() {
    updateDisplayedCommentory("<br><b>" + getOversLeft(overs) + " overs left. " + getTargetLeft(match) + " runs to win");
}

function displayMatchStatusCommentory(matchStatus) {
    updateDisplayedCommentory("<br><br><b>" + matchStatus + "<b><br><br>");

    hideElement(eleButtonNext);
}

function updateDisplayedCommentory(commentory) {
    var ballCommentary = document.createElement("div");
    setInnerHTML(ballCommentary, commentory);
    appentElement(eleCommentarySection, ballCommentary);
}

function printScoreCard() {
    let scoreCard = "";
    players.forEach(batsman => {
        if (batsman.getStatus() != BATTING_STATUS.NOTBATTED) {
            //To only iterate through batted batsman list
            scoreCard += batsman.getName() + " - " + batsman.getScore();
            if (batsman.getStatus() == BATTING_STATUS.PLAYING) {
                //to add * to notout batsman
                scoreCard += "*"
            }
            scoreCard += " (" + batsman.getBalls() + " balls)<br>";
        }
    });

    if (scoreCard) {
        updateDisplayedCommentory(scoreCard);
    }
}

function getMatchStatus() {
    var matchStatus = match.getStatus();
    if (getTargetLeft(match) <= 0) {
        matchStatus = "Bengaluru won by " + getWicketsLeft(players, wicketsList) + " wickets";

        var ballsRemaining = getBallsLeft(overs);
        //if won on last ball should not shown as 0 balls remaining
        if (ballsRemaining != 0) {
            matchStatus += " " + getBallsRemainingMessage(ballsRemaining);
        }
    } else if (getBallsLeft(overs) <= 0 && getTargetLeft(match) == 1) {
        matchStatus = "Hurray!! Match Tie";
    } else if (getWicketsLeft(players, wicketsList) <= 1 || getBallsLeft(overs) <= 0) {
        matchStatus = "Chennai won the match by " + (getTargetLeft(match) - 1) + " runs";
    }
    return matchStatus;
}