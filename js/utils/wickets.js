function getWicketsLeft(players, wicketsList) {
    return players.length - getCountOfWicketsFell(wicketsList);
}

function insertWicketIntoList(wicketsList, wicket) {
    wicketsList.push(wicket);
}

function getCountOfWicketsFell(wicketsList) {
    return wicketsList.length;
}