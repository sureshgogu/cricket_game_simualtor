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