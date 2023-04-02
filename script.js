let currLevel=0;
let currStr="";
let userStr="";

$(document).one("keypress", function(){
    console.log("start game");
    gameStart();
});

function generateRandom(){
    var num=Math.floor(Math.random()*4)+1;
    return num.toString();
}

function gameStart(){
    currStr="";
    userStr="";
    currLevel=0;

    var firstNum=generateRandom();
    currStr+=firstNum.toString();
    //starting the first level
    $("p").text("Level " + currLevel);

    //showing the hint
    var $box = $(".box-" + firstNum);
    $box.addClass("hint-button");

    setTimeout(function() {
        $box.removeClass("hint-button");
    }, 300);

}
// Add click event handlers for each box element
$(".box-1").click(function() { makeSound("green");console.log(1);handleInput(1); });
$(".box-2").click(function() { makeSound("red");console.log(2);handleInput(2);});
$(".box-3").click(function() { makeSound("yellow");console.log(3);handleInput(3); });
$(".box-4").click(function() { makeSound("blue");console.log(4);handleInput(4); });



//function to handle inputs
function handleInput(num){
    //visual feedback
    $(".box-" + num).addClass("pressed-button");
    setTimeout(function() {
        $(".box-" + num).removeClass("pressed-button");
    }, 100);

    //adding the number to userStr
    userStr+=num.toString();
    console.log("currStr = "+currStr);
    console.log("userStr = "+userStr);
    //check if does not match
    if (userStr.length>currStr.length || currStr.substring(0, userStr.length) != userStr) {
        console.log("this happened");
        gameOver();
    }

    //if user has entered the full currStr then transcend him to next level

    if(userStr==currStr){
        userStr="";
        currLevel++;

        //adding next number to currStr
        var currNum=generateRandom();
        currStr+=currNum;
        //display next level
        $("p").text("Level " + currLevel);
        
        //show hint for the next pattern
        var $box = $(".box-" + currNum);
        $box.addClass("hint-button");

        setTimeout(function() {
            $box.removeClass("hint-button");
        }, 500);
    }
}

function gameOver(){
    //visual feedback 
    $("body").addClass("redBG");
    setTimeout(function() {
        $("body").removeClass("redBG");
    }, 300);

    $("p").text("Game Over.Press any key to restart !");
    $(document).one("keypress", function(){
        console.log("start game");
        gameStart();
    });
    makeSound("wrong");

} 

function makeSound(key){
    var audio=new Audio("sounds/" + key + ".mp3");
    audio.play();
}
