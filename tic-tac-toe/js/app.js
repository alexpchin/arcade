var TicTacToe = (function(){
  "use strict";

  function TicTacToe(width){
    this.width = width;
    this.size  = 100;

    this.createBoard();
    this.possible      = this.generatePossibleMoves();
    this.winConditions = this.generateWinConditions();
    this.clear(); 
    this.start();

    // AI
    // this.ai   = false;
    // this.intelligence = 6;
  }

  TicTacToe.prototype.createBoard = function(){
    var body,
        title,
        ul,
        i = 0;

    body = document.querySelector('body');

    title = document.createElement('h1');
    title.innerHTML = "TicTacToe";
    body.appendChild(title);

    this.message = document.createElement('h2');
    this.message.innerHTML = "Start Game!";
    body.appendChild(this.message);

    ul = document.createElement('ul');
    ul.style.width  = this.size*this.width + 'px';
    ul.style.height = this.size*this.width + 'px';
    body.appendChild(ul);

    for (i; i < this.width * this.width; i++) {
      ul.appendChild(document.createElement('li'));
    }
    this.squares = document.getElementsByTagName("li");
  }

  TicTacToe.prototype.generateWinConditions = function(){
    var horizontal = this.generateHorizontalWins(this.possible);
    var vertical   = this.generateVerticalWins(horizontal);
    var diagonal   = this.generateDiagonalWins(horizontal);

    return horizontal.concat(vertical).concat(diagonal);
  }

  TicTacToe.prototype.generatePossibleMoves = function(){
    var numberOfSquares = this.width*this.width;
    return Array.apply(null, {length: numberOfSquares}).map(Number.call, Number);    
  }

  TicTacToe.prototype.generateHorizontalWins = function(array) {
    var groups = [], i;
    for (i = 0; i < array.length; i += this.width) {
      groups.push(array.slice(i, i + this.width));
    }
    return groups;
  }

  TicTacToe.prototype.generateVerticalWins = function(array){
    return array[0].map(function(col, i) { 
      return array.map(function(row) { 
        return row[i] 
      })
    });
  }

  TicTacToe.prototype.generateDiagonalWins = function(array) {
    var forward  = [],
        backward = [], 
        i;

    for (i = 0; i < this.width; i++) {
      forward.push(array[i][i]);
      backward.push(array[(this.width-1)-i][i]);
    }
    return [forward, backward];
  }

  TicTacToe.prototype.start = function(){
    var i = 0;
    for (i; i < this.squares.length; i++) {
      this.squares[i].addEventListener("click", this.chooseSquare.bind(this));
    }
  }

  TicTacToe.prototype.alreadyTaken = function(square){
    if (square.innerHTML !== "") return true;
  }

  TicTacToe.prototype.chooseSquare = function(){
    var square = event.currentTarget;

    if (this.alreadyTaken(square)){
      this.message.innerHTML = "Please choose a different square!"
      return false;
    };

    var squaresArray  = Array.prototype.slice.call(this.squares);

    var index = squaresArray.indexOf(square);
    this.board[index] = this.player;

    square.innerHTML = this.player;
    this.message.innerHTML = this.player + " to play";
    
    if (this.gameOver(this.board, this.player)) {
      this.clear();
    } else {
      this.moveCounter++;
      if (this.ai) {
        this.minimax(this.possible, 0);
        // AI to go here?
        // Choose best square
        // square.innerHTML = "o";
        // oMoves.push(squaresArray.indexOf(square));
        // this.message.innerHTML = "x" + " to play";
      } else {
        this.player = this.player === "x" ? "o" : "x";
      }
    }
  }

  TicTacToe.prototype.gameOver = function(board, player){
    return this.checkForWin(board, player) || this.checkForDraw();
  }

  TicTacToe.prototype.checkForWin = function(board, player){
    var i = 0;
    for (i; i < this.winConditions.length; i++) {
      var counter = 0;
      var w = 0;
      for (w; w < this.winConditions[i].length; w++) {
        var winConditionIndex = this.winConditions[i][w];
        
        if (board[winConditionIndex] === player) {
          counter++;
          if (counter === this.width) {
            this.message.innerHTML = this.player + " Wins";
            return true;
          }
        }
      }
    }
    return false;
  }

  TicTacToe.prototype.checkForDraw = function(){
    if (this.moveCounter === this.width*this.width) {
      this.message.innerHTML = "It's a draw!";
      return true;
    } 
    return false;
  }
    
  TicTacToe.prototype.clear = function(){
    this.moveCounter  = 0;
    this.board        = new Array(this.width*this.width);
    this.player       = "x";
    this.moves        = this.xMoves;

    var i = 0;
    for (i; i < this.squares.length; i++) {
      this.squares[i].innerHTML = "";
    };
  }

  // AI
  TicTacToe.prototype.availableMoves = function(board){
    var board = board || this.possible;
    return this.possible.filter(function(move) { 
      if (typeof board[move] !== "undefined") return move;
    });
  }

  TicTacToe.prototype.newGameState = function(move, board){
    var board = board || this.possible;
    return board.push(move);
  }

  TicTacToe.prototype.undoMove = function(move, board){
    var board = board || this.possible;
    board[board.indexOf[move]] = undefined;
    return board;
  }

  TicTacToe.prototype.minimax = function(tempBoard, depth){
    if (this.gameOver(tempBoard)) return score(tempBoard, depth);
    
    depth+=1;

    var scores = [];
    var moves  = [];
    var availableMoves = this.availableMoves(tempBoard);
    var move, 
        newState;

    for(var i=0; i < availableMoves.length; i++) {
      move = availableMoves[i];
      newState = this.newGameState(move, tempBoard);
      scores.push(minimax(newState, depth));
      moves.push(move); // Tried moves
      tempBoard = this.undoMove(move, tempBoard);
      // change player
      // player = (player === "x") ? "o" : "x";
    }
    
    var max_score, 
        max_score_index, 
        min_score,
        min_score_index;
    
    if (active_turn === "COMPUTER") {
      max_score = Math.max.apply(Math, scores);
      max_score_index = scores.indexOf(max_score);
      choice = moves[max_score_index];
      return scores[max_score_index];
    } else {
      min_score = Math.min.apply(Math, scores);
      min_score_index = scores.indexOf(min_score);
      choice = moves[min_score_index];
      return scores[min_score_index];
    }
  }

  return function(){ new TicTacToe(3) };
})();

window.onload = TicTacToe;