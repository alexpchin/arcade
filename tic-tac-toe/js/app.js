var TicTacToe = (function(){
  "use strict";

  function TicTacToe(width){
    this.width = width;
    this.size  = 100;

    this.createBoard();
    this.possible      = this.generatePossibleMoves();
    // this.winConditions = this.generateWinConditions();
    this.clear(); 
    this.start();

    // AI
    this.ai   = true;
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

  // TicTacToe.prototype.generateWinConditions = function(){
  //   var horizontal = this.generateHorizontalWins(this.possible);
  //   var vertical   = this.generateVerticalWins(horizontal);
  //   var diagonal   = this.generateDiagonalWins(horizontal);

  //   return horizontal.concat(vertical).concat(diagonal);
  // }

  TicTacToe.prototype.generateBoardWinRows = function(board){
    var board = board || this.board;
    var horizontal = this.generateHorizontalWins(board);
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
    
    console.log(this.gameOver(this.board, this.player))
    if (this.gameOver(this.board, this.player)) {
      this.clear();
    } else {
      this.moveCounter++;
      if (this.ai) {
        var computer = this.player === "x" ? "o" : "x";
        this.minimax(this.board, computer, 0);
debugger
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
    var board = this.generateBoardWinRows(board);

    var i = 0;
    for (i; i < board.length; i++) {
      if (board[i].reduce(function(a, b){return (a === b) ? a : false ; }) === player) return true;
    }
    return false;
  }

  TicTacToe.prototype.allAreEqual = function(array){
    if (!array.length) return true;
    return 
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
    // this.board        = new Array(this.width*this.width);
    this.board        = this.createArrayWithNulls(this.width*this.width, null);
    this.player       = "x";
    this.moves        = this.xMoves;

    var i = 0;
    for (i; i < this.squares.length; i++) {
      this.squares[i].innerHTML = "";
    };
  }

  TicTacToe.prototype.createArrayWithNulls = function(len, itm) {
    var arr1 = [itm],
    arr2 = [];
    while (len > 0) {
      if (len & 1) arr2 = arr2.concat(arr1);
      arr1 = arr1.concat(arr1);
      len >>>= 1;
    }
    return arr2;
  }

  // AI
  TicTacToe.prototype.availableMoves = function(board){
    var board = board || this.board;
    return this.possible.filter(function(move) { 
      if (board[move] === null) return move;
    });
  }

  TicTacToe.prototype.newGameState = function(move, player, board){
    var board = board || this.possible;
    var clone = JSON.parse(JSON.stringify(board));
    clone[move] = player; 
    return clone;
  }

  TicTacToe.prototype.undoMove = function(move, board){
    var board = board || this.possible;
    board[board.indexOf[move]] = undefined;
    return board;
  }

  TicTacToe.prototype.score = function(tempBoard, player, depth){
    
  }

  TicTacToe.prototype.minimax = function(tempBoard, player, depth){
    if (this.gameOver(tempBoard)) return this.score(tempBoard, player, depth);
    console.log("Now ",  this.gameOver(tempBoard))
    
    depth+=1;

    var scores = [],
        moves  = [],
        availableMoves = this.availableMoves(tempBoard),
        move, 
        newState;

    for(var i=0; i < availableMoves.length; i++) {
      move = availableMoves[i];
      newState = this.newGameState(move, player, tempBoard);
      console.log(newState);

      // change player
      player = (player === "x") ? "o" : "x";
      scores.push(this.minimax(newState, player, depth));
      
      moves.push(move); // Tried moves
      tempBoard = this.undoMove(move, tempBoard);
    }
    
    var max_score, 
        max_score_index, 
        min_score,
        min_score_index,
        choice;
    
    if (player === "o") {
      max_score = Math.max.apply(Math, scores);
      max_score_index = scores.indexOf(max_score);
      choice = moves[max_score_index];
console.log("o: " +choice);
      return scores[max_score_index];
    } else {
      min_score = Math.min.apply(Math, scores);
      min_score_index = scores.indexOf(min_score);
      choice = moves[min_score_index];
console.log("x: " +choice);
      return scores[min_score_index];
    }
  }

  return function(){ new TicTacToe(3) };
})();

window.onload = TicTacToe;