function getOversLeft(overs) {
    return TOTAL_OVERS - getOversBowled(overs);
}

function getOversBowled(overs) {
    return overs.length;
}

function getCurrentOver(overs) {
    var length = getOversBowled(overs);
    if (length == 0 || isOverCompleted(overs[length - 1])) {
        return [];
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