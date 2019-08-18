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