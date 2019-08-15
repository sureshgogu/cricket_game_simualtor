var overs, players, wicketsList, match;
var totalOvers = 4, ballsPerOver = 6;

var eleCommentarySection, eleButtonStart, eleButtonNext;

document.addEventListener('DOMContentLoaded', function () {
    eleCommentarySection = document.getElementsByClassName("commentary-section")[0];
    eleButtonStart = document.getElementsByClassName("button-start")[0];
    eleButtonNext = document.getElementsByClassName("button-next")[0];

    eleButtonStart.addEventListener("click", startMatch);
    eleButtonNext.addEventListener("click", bowlNextbBall);
});

function startMatch() {
    hideElement(eleButtonStart);
    showElement(eleButtonNext);

    eleCommentarySection.innerHTML = "";

    resetStatistics();
    updateOverStartCommentory();
}

function resetStatistics() {
    overs = [], players = [], wicketsList = [];

    //Adding players details
    players.push(new Batsman("Kirat Boli", [
        new ScoreProbablity(0, 5),
        new ScoreProbablity(1, 30),
        new ScoreProbablity(2, 25),
        new ScoreProbablity(3, 10),
        new ScoreProbablity(4, 15),
        new ScoreProbablity(5, 1),
        new ScoreProbablity(6, 9),
        new ScoreProbablity(OUT, 5)
    ]));
    players.push(new Batsman("NS Nodhi", [
        new ScoreProbablity(0, 10),
        new ScoreProbablity(1, 40),
        new ScoreProbablity(2, 20),
        new ScoreProbablity(3, 5),
        new ScoreProbablity(4, 10),
        new ScoreProbablity(5, 1),
        new ScoreProbablity(6, 4),
        new ScoreProbablity(OUT, 10)
    ]));
    players.push(new Batsman("R Rumrah", [
        new ScoreProbablity(0, 20),
        new ScoreProbablity(1, 30),
        new ScoreProbablity(2, 15),
        new ScoreProbablity(3, 5),
        new ScoreProbablity(4, 5),
        new ScoreProbablity(5, 1),
        new ScoreProbablity(6, 4),
        new ScoreProbablity(OUT, 20)
    ]));
    players.push(new Batsman("Shashi Henra", [
        new ScoreProbablity(0, 30),
        new ScoreProbablity(1, 25),
        new ScoreProbablity(2, 5),
        new ScoreProbablity(3, 0),
        new ScoreProbablity(4, 5),
        new ScoreProbablity(5, 1),
        new ScoreProbablity(6, 4),
        new ScoreProbablity(OUT, 30)
    ]));

    var striker = getNextBatsman(0);
    var nonStriker = getNextBatsman(1);

    match = new Match(40, striker, nonStriker);
}


function bowlNextbBall() {
    if (match.getStatus()) {
        //If match already completed and trying continue again
        updateMatchStatusCommentory(match.getStatus());
        return;
    }

    var currentOver = getCurrentOver();
    var ballsBowled = currentOver.length;
    if (!ballsBowled) {
        //new over
        overs.push(currentOver);
    }

    var overNo = getOversBowled() - 1;
    var ballNo = ballsBowled + 1;

    var batsman = match.getBatsman();
    var runs = getWeightedRandomNumber(batsman.getProbability());

    batsman.setBalls(batsman.getBalls() + 1);
    currentOver.push(new Ball(ballNo, runs, batsman));

    var ballCommentory, ball = overNo + "." + ballNo;
    if (runs == OUT) {
        //If batsman out, changing current batsman status, updating wickets and updating next batsman
        ballCommentory = ball + " " + batsman.getName() + " <b>OUT<b>";

        setBatsmanOut(batsman);
        wicketsList.push(new Wicket(ball, batsman));

        let nextBatsman = getNextBatsman(wicketsList.length + 1);
        match.setBatsman(nextBatsman);
    } else {
        batsman.setScore(batsman.getScore() + runs);
        match.setScore(match.getScore() + runs);
        ballCommentory = ball + " " + batsman.getName() + " scores " + runs;
    }
    updateCommentory(ballCommentory);

    if (runs % 2 != 0 && runs != OUT) {
        //change batsman strike if scores odd runs
        changeBatsmanStrike();
    }

    if (isOverCompleted(currentOver)) {
        //change batsman strike on over end
        changeBatsmanStrike();
    }

    var matchStatus = getMatchStatus();
    if (matchStatus) {
        match.setStatus(matchStatus);
        updateMatchStatusCommentory(matchStatus);
        printScoreCard();
        showStartAgainOption();
    } else {
        if (isOverCompleted(currentOver)) {
            //Match not completed and over completed
            updateOverStartCommentory();
        }
    }
}

function showStartAgainOption() {
    eleButtonStart.innerHTML = "Restart Again ?";
    showElement(eleButtonStart);
}

function updateOverStartCommentory() {
    updateCommentory("<br><b>" + getOversLeft() + " overs left. " + getTargetLeft() + " runs to win");
}

function updateMatchStatusCommentory(matchStatus) {
    updateCommentory("<br><br><b>" + matchStatus + "<b><br><br>");

    hideElement(eleButtonNext);
}

function updateCommentory(commentory) {
    var ballCommentary = document.createElement("div");
    ballCommentary.innerHTML = commentory;
    appentElement(eleCommentarySection, ballCommentary);
}

function printScoreCard() {
    let scoreCard = "";
    players.forEach(batsman => {
        if (batsman.getStatus() != BattingStatus.NOTBATTED) {
            //To only iterate through batted batsman list
            scoreCard += batsman.getName() + " - " + batsman.getScore();
            if (batsman.getStatus() == BattingStatus.PLAYING) {
                //to add * to notout batsman
                scoreCard += "*"
            }
            scoreCard += " (" + batsman.getBalls() + " balls)<br>";
        }
    });

    if (scoreCard) {
        updateCommentory(scoreCard);
    }
}




/**
 * Helper functions
 */
function getMatchStatus() {
    var matchStatus = "";
    if (getTargetLeft() <= 0) {
        matchStatus += "Bengaluru won by " + getWicketsLeft() + " wickets";

        var ballsRemaining = getBallsLeft();
        //if won on last ball should not shown as 0 balls remaining
        if (ballsRemaining != 0) {
            matchStatus += " " + getBallsRemainingMessage(ballsRemaining);
        }
    } else if (getWicketsLeft() <= 1 || getBallsLeft() <= 0) {
        matchStatus += "Chennai won the match by " + (getTargetLeft() - 1) + " runs";
    } else if (getOversLeft() == 0 && getTargetLeft() <= 0) {
        matchStatus += "Hurray!! Match Tie";
    }
    return matchStatus
}

function changeBatsmanStrike() {
    //swapping players
    var batsman = match.getBatsman();

    match.setBatsman(match.getNonStriker());
    match.setNonStriker(batsman);
}



function getTargetLeft() {
    return match.getTarget() - match.getScore();
}

function getWicketsLeft() {
    return players.length - wicketsList.length;
}



function getOversLeft() {
    return totalOvers - getOversBowled();
}

function getOversBowled() {
    return overs.length;
}

function getCurrentOver() {
    var length = getOversBowled();
    if (length == 0 || isOverCompleted(overs[length - 1])) {
        return [];
    }
    return overs[length - 1];
}

function getOver(no) {
    return overs[no];
}

function isOverCompleted(over) {
    return over.length == ballsPerOver;
}

function getBallsLeft() {
    var balls;

    var oversLength = getOversBowled();
    var oversLeft = totalOvers - oversLength;
    balls = getBallsLeftInLastOver();
    balls += oversLeft * ballsPerOver;
    return balls;
}

function getBallsRemainingMessage(remaining) {
    var message;
    if (remaining <= ballsPerOver) {
        message = remaining + " ball(s)"
    } else {
        message = Math.floor(remaining / ballsPerOver) + "." + (remaining % ballsPerOver) + " overs";
    }
    return " and " + message + " remaining";
}

function getBallsLeftInLastOver() {
    var lastOver = getOver(getOversBowled() - 1);
    return ballsPerOver - lastOver.length;
}

function getNextBatsman(batsmanPosition) {
    let batsman = getBatsman(batsmanPosition);
    if (batsman) {
        batsman.setStatus(BattingStatus.PLAYING);
    }
    return batsman;
}

function getBatsman(batsmanPosition) {
    let batsman = null;
    if (batsmanPosition < players.length) {
        batsman = players[batsmanPosition];
    }
    return batsman;
}

function setBatsmanOut(batsman) {
    batsman.setStatus(BattingStatus.OUT);
}