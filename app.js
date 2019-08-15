var overs = [];
var players = [];
var match;
var wicketsList = [];
var totalOvers = 4, ballsPerOver = 6;

var eleCommentarySection;
var eleButtonStart;
var eleButtonNext;

document.addEventListener('DOMContentLoaded', function () {
    eleCommentarySection = document.getElementsByClassName("commentary-section")[0];
    eleButtonStart = document.getElementsByClassName("button-start")[0];
    eleButtonNext = document.getElementsByClassName("button-next")[0];

    eleButtonStart.addEventListener("click", startMatch);
    eleButtonNext.addEventListener("click", bowlNextbBall);

    init();
});

function init() {
    players.push(new Batsman("Kirat Boli", 0));
    players.push(new Batsman("NS Nodhi", 0));
    players.push(new Batsman("R Rumrah", 0));
    players.push(new Batsman("Shashi Henra", 0));

    match = new Match(40, "", getBatsman(0), getBatsman(1));
};

function startMatch() {
    eleButtonStart.style = "display : none";
    eleButtonNext.style = "display : block";
    
    updateOverStartCommentory();
}


function bowlNextbBall() {
    var currentOver = getCurrentOver();
    if(!currentOver.length) {
        //new over
        overs.push(currentOver);
    }

    var overNo = overs.length - 1;
    var ballNo = currentOver.length + 1;
    var runs = generateRandomScore();
    var batsman = match.getBatsman();

    var ballCommentory = overNo + "." + ballNo + " " + batsman.getName() + " scores " + runs + "<br>";
    updateCommentory(ballCommentory);

    batsman.setScore(batsman.getScore() + runs);
    batsman.setBalls(batsman.getBalls() + 1);
    match.setScore(match.getScore() + runs);

    currentOver.push(new Ball(ballNo, runs, batsman));
    
    if(runs == 0) {
        setBatsmanOut(batsman);

        var ball = overNo + "." + ballNo;
        wicketsList.push(new Wicket(ball, batsman));
        
        let nextBatsman = getBatsman(wicketsList.length + 1);
        match.setBatsman(nextBatsman);
    } 

    if(runs % 2 != 0) {
        changeBatsmanStrike();
    }

    if(isOverCompleted(currentOver)) {
        changeBatsmanStrike();
    }

    var matchStatus = getMatchStatus();
    if(matchStatus) {
        eleButtonNext.style = "display : none";

        match.setStatus(matchStatus);
        updateCommentory("<br><br><b>" + matchStatus + "<b><br><br>");
        printScoreCard();
    } else {
        if(isOverCompleted(currentOver)) {
            //Match not completed and over completed
            updateOverStartCommentory();
        }
    }
}


function getMatchStatus() {
    var matchStatus = "";
    if(getTargetLeft() <= 0) {
        //TODO 0 balls case
        matchStatus += "Bengaluru won by " + getWicketsLeft() + " wickets";

        var ballsRemaining = getBallsLeft();
        if(ballsRemaining != 0) {
            //if won on last ball should not to as 0 balls remaining
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
    return totalOvers - overs.length;
}

function getCurrentOver() {
    var length = overs.length;
    if(length == 0 || isOverCompleted(overs[length-1])) {
        return [];
    }
    return overs[overs.length - 1];
}

function getOver(no) {
    return overs[no];
}

function isOverCompleted(over) {
    return over.length == ballsPerOver;
}

function getBallsLeft() {
    var balls;

    var oversLength = overs.length;
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
    var lastOver = getOver(overs.length - 1);
    return  ballsPerOver - lastOver.length;
}


function getBatsman(batsmanPosition) {
    let batsman = null;
    if(batsmanPosition < players.length) {
        batsman = players[batsmanPosition];
        batsman.setStatus(statusNOTOUT);
    }
    return batsman;
}

function setBatsmanOut(batsman) {
    batsman.setStatus(statusOUT);
}



function generateRandomScore() {
    return Math.floor(Math.random() * (6 - 0)) + 0;
}

function updateOverStartCommentory() {
    updateCommentory("<br><b>" + getOversLeft() + " overs left. " + getTargetLeft() + " runs to win <br>");
}

function updateCommentory(commentory) {
    var html = eleCommentarySection.innerHTML;
    html += commentory;
    eleCommentarySection.innerHTML = html;
}

function printScoreCard() {
    let scoreCard = "";
    players.forEach(batsman => {
        if(batsman.getStatus() != statusNOTBATTED) {
            //To only iterate through batted batsman list
            scoreCard += batsman.getName() + " - " + batsman.getScore();
            if(batsman.getStatus() == statusNOTOUT) {
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
