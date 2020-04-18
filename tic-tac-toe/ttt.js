var ttt = {
  board : [], // array to hold the current game
  reset : function () {
  // ttt.reset() : reset the game

    // Reset board array & get HTML container
    ttt.board = [];
    var container = document.getElementById("ttt-game");
    container.innerHTML = "";

    // Redraw squares
    for (let i=0; i<9; i++) {
      ttt.board.push(null);
      var square = document.createElement("div");
      square.innerHTML = "&nbsp;";
      square.dataset.idx = i;
      square.id = "ttt-" + i;
      square.addEventListener("click", ttt.play);
      container.appendChild(square);
    }
  },

  play : function () {
  // ttt.play() : when the player selects a square

    // (A) Player's move - Mark with "O"
    var move = this.dataset.idx;
    ttt.board[move] = 0;
    this.innerHTML = "O"
    this.classList.add("player");
    this.removeEventListener("click", ttt.play);

    // (B) No more moves available - no winner
    if (ttt.board.indexOf(null) == -1) {
      alert("No winner");
      ttt.reset();
    }

    // (C) Computer's move - Mark with "X"
    // @TODO - Change to use not bad AI if you want
    else {
      move = ttt.dumbAI();
      //move = ttt.notBadAI(); 
      ttt.board[move] = 1;
      var square = document.getElementById("ttt-" + move);
      square.innerHTML = "X"
      square.classList.add("computer");
      square.removeEventListener("click", ttt.play);
    }

    // (D) Who won?
    win = null;
    // Horizontal row checks
    for (let i=0; i<9; i+=3) {
      if (ttt.board[i]!=null && ttt.board[i+1]!=null && ttt.board[i+2]!=null) {
        if ((ttt.board[i] == ttt.board[i+1]) && (ttt.board[i+1] == ttt.board[i+2])) { win = ttt.board[i]; }
      }
      if (win !== null) { break; }
    }
    // Vertical row checks
    if (win === null) {
      for (let i=0; i<3; i++) {
        if (ttt.board[i]!=null && ttt.board[i+3]!=null && ttt.board[i+6]!=null) {
          if ((ttt.board[i] == ttt.board[i+3]) && (ttt.board[i+3] == ttt.board[i+6])) { win = ttt.board[i]; }
          if (win !== null) { break; }
        }
      }
    }
    // Diagonal row checks
    if (win === null) {
      if (ttt.board[0]!=null && ttt.board[4]!=null && ttt.board[8]!=null) {
        if ((ttt.board[0] == ttt.board[4]) && (ttt.board[4] == ttt.board[8])) { win = ttt.board[4]; }
      }
    }
    if (win === null) {
      if (ttt.board[2]!=null && ttt.board[4]!=null && ttt.board[6]!=null) {
        if ((ttt.board[2] == ttt.board[4]) && (ttt.board[4] == ttt.board[6])) { win = ttt.board[4]; }
      }
    }

    // We have a winner
    if (win !== null) {
      alert("WINNER - " + (win==0 ? "Player" : "Computer"));
      ttt.reset();
    }
  },

  dumbAI : function () {
  // ttt.dumbAI() : dumb computer AI, randomly chooses an empty slot

    // Extract out all open slots
    var open = [];
    for (let i=0; i<9; i++) {
      if (ttt.board[i] === null) { open.push(i); }
    }

    // Randomly choose open slot
    var random = Math.floor(Math.random() * (open.length-1));
    return open[random];
  },

  notBadAI : function () {
  // ttt.notBadAI() : AI with a little more intelligence

    // (A) Init
    var move = null;
    var check = function(first, direction, pc) {
    // checkH() : helper function, check possible winning row
    // PARAM square : first square number
    //       direction : "R"ow, "C"ol, "D"iagonal
    //       pc : 0 for player, 1 for computer

      var second = 0, third = 0;
      if (direction=="R") {
        second = first + 1;
        third = first + 2;
      } else if (direction=="C") {
        second = first + 3;
        third = first + 6;
      } else {
        second = 4;
        third = first==0 ? 8 : 6;
      }

      if (ttt.board[first]==null && ttt.board[second]==pc && ttt.board[third]==pc) {
        return first;
      } else if (ttt.board[first]==pc && ttt.board[second]==null && ttt.board[third]==pc) {
        return second;
      } else if (ttt.board[first]==pc && ttt.board[second]==pc && ttt.board[third]==null) {
        return third;
      }
      return null;
    };

    // (B) Priority #1 - Go for the win
    // (B1) Check horizontal rows
    for (let i=0; i<9; i+=3) {
      move = check(i, "R", 1);
      if (move!==null) { break; }
    }
    // (B2) Check vertical columns
    if (move===null) {
      for (let i=0; i<3; i++) {
        move = check(i, "C", 1);
        if (move!==null) { break; }
      }
    }
    // (B3) Check diagonal
    if (move===null) { move = check(0, "D", 1); }
    if (move===null) { move = check(2, "D", 1); }

    // (C) Priority #2 - Block player from winning
    // (C1) Check horizontal rows
    for (let i=0; i<9; i+=3) {
      move = check(i, "R", 0);
      if (move!==null) { break; }
    }
    // (C2) Check vertical columns
    if (move===null) {
      for (let i=0; i<3; i++) {
        move = check(i, "C", 0);
        if (move!==null) { break; }
      }
    }
    // (C3) Check diagonal
    if (move===null) { move = check(0, "D", 0); }
    if (move===null) { move = check(2, "D", 0); }

    // (D) Random move if nothing
    if (move===null) { move = ttt.dumbAI(); }
    return move;
  }
};
window.addEventListener("load", ttt.reset);