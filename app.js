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

    resetStatistics();
    
    updateOverStartCommentory();
}

function resetStatistics() {
    overs = [], players = [], wicketsList = [];

    //Adding players details
    players.push(new Batsman("Kirat Boli", 0));
    players.push(new Batsman("NS Nodhi", 0));
    players.push(new Batsman("R Rumrah", 0));
    players.push(new Batsman("Shashi Henra", 0));

    var striker = getNextBatsman(0);
    var nonStriker = getNextBatsman(1);

    match = new Match(40, striker, nonStriker);
}


function bowlNextbBall() {
    if(match.getStatus()) {
        //If match already completed and trying continue again
        updateMatchStatusCommentory(match.getStatus());
        return;
    }

    var currentOver = getCurrentOver();
    var ballsBowled = currentOver.length;
    if(!ballsBowled) {
        //new over
        overs.push(currentOver);
    }

    var overNo = getOversBowled() - 1;
    var ballNo = ballsBowled + 1;
    var runs = generateRandomScore();
    
    var batsman = match.getBatsman();
    batsman.setScore(batsman.getScore() + runs);
    batsman.setBalls(batsman.getBalls() + 1);
    match.setScore(match.getScore() + runs);
    currentOver.push(new Ball(ballNo, runs, batsman));

    var ballCommentory = overNo + "." + ballNo + " " + batsman.getName() + " scores " + runs;
    updateCommentory(ballCommentory);

    if(runs == 0) {
        setBatsmanOut(batsman);

        var ball = overNo + "." + ballNo;
        wicketsList.push(new Wicket(ball, batsman));
        
        let nextBatsman = getNextBatsman(wicketsList.length + 1);
        match.setBatsman(nextBatsman);
    } 

    if(runs % 2 != 0) {
        //change batsman strike if scores odd runs
        changeBatsmanStrike();
    }

    if(isOverCompleted(currentOver)) {
        //change batsman strike on over end
        changeBatsmanStrike();
    }

    var matchStatus = getMatchStatus();
    if(matchStatus) {
        match.setStatus(matchStatus);
        updateMatchStatusCommentory(matchStatus);
        printScoreCard();
    } else {
        if(isOverCompleted(currentOver)) {
            //Match not completed and over completed
            updateOverStartCommentory();
        }
    }
}

function generateRandomScore() {
    return Math.floor(Math.random() * (6 - 0)) + 0;
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
        if(batsman.getStatus() != BattingStatus.NOTBATTED) {
            //To only iterate through batted batsman list
            scoreCard += batsman.getName() + " - " + batsman.getScore();
            if(batsman.getStatus() == BattingStatus.PLAYING) {
                //to add * to notout batsman
                scoreCard += "*"
            }
            scoreCard += " (" + batsman.getBalls() + " balls)<br>"; 
        }
    });

    if(scoreCard) {
        updateCommentory(scoreCard);
    }
}




/**
 * Helper functions
 */
function getMatchStatus() {
    var matchStatus = "";
    if(getTargetLeft() <= 0) {
        matchStatus += "Bengaluru won by " + getWicketsLeft() + " wickets";

        var ballsRemaining = getBallsLeft();
        //if won on last ball should not shown as 0 balls remaining
        if(ballsRemaining != 0) {
            matchStatus += " " + getBallsRemainingMessage(ballsRemaining);
        }
    } else if(getWicketsLeft() <= 1) {
        matchStatus += "Chennai won the match by " + (getTargetLeft() - 1) + " runs";
    } else if(getOversLeft() == 0 && getTargetLeft() <= 0) {
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
    if(length == 0 || isOverCompleted(overs[length-1])) {
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
    if(remaining == 1) {
        message = remaining + " ball"
    } else if(remaining < ballsPerOver) {
        message = remaining + " balls"
    } else {
        message =  Math.floor(remaining / ballsPerOver) + "." + (remaining % ballsPerOver) + " overs";
    }
    return " and "  + message + " remaining";
}

function getBallsLeftInLastOver() {
    var lastOver = getOver(getOversBowled() - 1);
    return  ballsPerOver - lastOver.length;
}

function getNextBatsman(batsmanPosition) {
    let batsman = getBatsman(batsmanPosition);
    batsman.setStatus(BattingStatus.PLAYING);
    return batsman;
}

function getBatsman(batsmanPosition) {
    let batsman = null;
    if(batsmanPosition < players.length) {
        batsman = players[batsmanPosition];
    }
    return batsman;
}

function setBatsmanOut(batsman) {
    batsman.setStatus(BattingStatus.OUT);
}