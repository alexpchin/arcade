var elevenBallAppModule = angular.module('elevenBallApp', []);

elevenBallAppModule.controller('elevenBallController', ['$scope', function($scope) {
  var ballsOnScreen = [];
  var colors = ['red', 'yellow', 'blue', 'green', 'pink', 'black', 'orange', 'brown', 'lightblue', 'purple'];
  var hand = {total: 0, balls: []};

  $scope.createBall = function() {
    var randomNumber = Math.floor(Math.random()*10+1)-1;
    var ball = {
      color: colors[randomNumber],
      number: randomNumber
    }
    return ball; 
  }

  $scope.nextBall = function(){
    console.log("Next ball");
    var ball = $scope.createBall();

    // Push balls into 
    ballsOnScreen.push(ball);
    $scope.lastBall = ball;
  }

  $scope.generateBalls = function() {
    var upper = 10;
    var lower = 0; 
    for (i = upper; i >= lower; i--) {
      ballsOnScreen.push($scope.createBall());
    }
    return ballsOnScreen;
  }

  $scope.calculateBallTotal = function(number, $event){
    // console.log("clicked");
    var newCount = hand.total + number;
    var $ball = event.currentTarget;
    if (newCount < 11) {
      hand.total += number;
      hand.balls.push($ball);
      console.log(hand.balls);

      $scope.totalBallCount = newCount;
    } else if (newCount === 11) {
      $(hand.balls).each(function(index, ball){
        $(ball).remove();
      });
      hand.balls = [];
      hand.total = 0
      $scope.totalBallCount = hand.total;
      console.log(hand.balls);
    }
  }

  $scope.balls = $scope.generateBalls();

}]);
