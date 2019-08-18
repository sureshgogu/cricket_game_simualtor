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