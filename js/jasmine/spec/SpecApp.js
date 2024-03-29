describe("Match status", function() {

  beforeEach(function() {
    setPlayersDetails();
    resetStatistics();
  });

  it("It should show status as Match Inprogress", function() {
    expect(getMatchStatus()).toEqual(INPROGRESS);
  });

  it("It should show status as Match Won by Banglore", function() {
    match.setScore(40);
    expect(getMatchStatus()).toContain("Bengaluru won by");
  });

  it("It should show status as Match Won by Chennai (No Wickets Left)", function() {
    setBatsmanOut(match.getBatsman(), "0.1", wicketsList);
    setNextBatsmanInMatch(players, wicketsList);


    setBatsmanOut(match.getBatsman(), "0.1", wicketsList);
    setNextBatsmanInMatch(players, wicketsList);setNextBatsmanInMatch(players, wicketsList);


    setBatsmanOut(match.getBatsman(), "0.1", wicketsList);
    setNextBatsmanInMatch(players, wicketsList);

    expect(getMatchStatus()).toContain("Chennai won the match by");
  });

  it("It should show status as Match Won by Chennai (Scored less runs)", function() {
    finishOvers();

    expect(getMatchStatus()).toContain("Chennai won the match by");
  });


  it("It should show status as Hurray!! Match Tie", function() {  
    finishOvers();
    match.setScore(39);

    expect(getMatchStatus()).toEqual("Hurray!! Match Tie");
  });

  function finishOvers() {
    for(let i=0; i<TOTAL_OVERS; i++) {
      let over = [];
      let batsman = match.getBatsman();
      for(let j=0; j<BALLS_PER_OVER; j++) {
        over.push(new Ball(0, 1, batsman))
      }
      overs.push(over);
    }
  }
});


describe("Match Reset", function() {
  beforeEach(function() {
    setPlayersDetails();
    resetStatistics();
  });;

  it("It should reset overs, players, match data to initial", function() {
    expect(overs.length).toEqual(1);
    expect(players.length).toEqual(4);
    expect(match.getScore()).toEqual(0);
  });
});

describe("Start Match", function() {
  beforeEach(function() {
    startMatch();
  });;

  it("It should reset overs, players, match data to initial", function() {
    expect(overs.length).toEqual(1);
    expect(players.length).toEqual(4);
    expect(match.getScore()).toEqual(0);
  });
});


describe("Bowl Next ball", function() {
  beforeEach(function() {
    setPlayersDetails();
    resetStatistics();
  });;

  it("It should decrease balls count by 1 if match is in progress", function() {
    var ballsLeft = getBallsLeft(overs);
    bowlNextBall();

    if(isMatchInProgress()) {
      expect(ballsLeft - 1).toEqual(getBallsLeft(overs));
    } else {
      expect(ballsLeft).toEqual(getBallsLeft(overs));
    }
  });
});