angular.module("tttApp").controller("BoardController",BoardController);

function BoardController(){
  var x = "\u00D7";
  var o = "\u25CB";
  var winConditions = [7,56,73,84,146,273,292,448];
  var countX = 0;
  var countO = 0;

  this.initialize = initialize;
  this.mark = mark;
  this.checkWinner = checkWinner;
  this.nextPlayer = function(){ this.isPlayer1 = !this.isPlayer1}

  this.initialize();

  function mark(index){ 
    this.boxes[index] = this.isPlayer1 ? x : o;
    this.isPlayer1 ? countX+=Math.pow(2,index) : countO+=Math.pow(2,index);
    if(this.checkWinner()){
      this.winner = this.isPlayer1 ? "Player 1" : "Player 2";
    }
    this.nextPlayer();
  }

  function checkWinner(){
    if(countX+countO === 511){ this.isTie = true}
    var count = this.isPlayer1 ? countX : countO;
    for(var i=0; i<winConditions.length; i++){
      if((count & winConditions[i]) === winConditions[i]){
        return true;
      }
    }
  }

  function initialize(){
    this.boxes = new Array(9);
    this.isPlayer1 = true;
    this.winner = null;
    this.isTie = false;
    countX = 0;
    countO = 0;
  }

}