$(document).ready(function(){

// variables 
alert("Hello! I am an alert box!!");

var characters = {
 "starLord": {
    name: "StarLord",
    health: 500,
    Attack: 25,
    counterAttack: 5,
    imageUrl: "assets/images/starlord.png"
},
    "gamora": {
    name: "Gamora",
    health: 750,
    Attack: 50,
    counterAttack: 20,
    imageUrl: "assets/images/gamora.png"

},

    "nebula" : {
    name: "Nebula",
    health: 900,
    Attack: 50,
    counterAttack: 20,
    imageUrl: "assets/images/nebula.png"

},

    "rocket" : {
    name: "Rocket",
    health: 400,
    Attack: 20,
    counterAttack: 10,
    imageUrl: "assets/images/rocket.png"
} 
};


var yourChar = {
    
}

var yourEnemy = {
    
}
var enemyArray = [];

var turnCounter;
var killCount;

//functions 

var renderOne = function (character, renderArea, charStatus) {
    var charDiv = $("<div class='character' data.name=' " + character.name + " ' >");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImg = $("<img alt='image' class='character.image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-health'>").text(character.health);
    charDiv.append(charName).append(charImg).append(charHealth);
    $(renderArea).append(charDiv);

    if (charStatus === "enemy") { // adding this class helps us move enemies to the array
        $(charDiv).addClass("enemy");
    }

    else if (charStatus === "activeE"){
        yourEnemy = character;
        $(charDiv).addClass("yourEnemypick");
    }
}

var renderMessages = function (message) {
    var gameMessage = $("#game-message").text(message);
    gameMessage.append(newMessage);

    if (message === "clearMessage") {
        gameMessage.text(" ");
    }
};
var renderCharacters = function (charobj, areaRender) {
    if (areaRender === "#playerWrapper") {
        $(areaRender).empty();
        for (var key in charobj) {
            if (charobj.hasOwnProperty(key)){
                renderOne(charobj[key], areaRender, " ");
            }
        }
    }
}

// render chosen character in game area
if (areaRender === "#yourChar"){
    renderOne(charobj, areaRender, " ");
}

//render enemy array
if (areaRender === "#available-to-attack") {
    for (var i = 0; i< charobj.length; i++){
        render(charobj[i], areaRender);
    }
    
}
 
//render chosen enemy to game area
if (areaRender === "#activeE") {
    $(areaRender).empty();
    for (var i = 0; i< enemyArray.length; i++){
        if (enemyArray[i].name === charobj){
            renderOne(enemyArray[i], areaRender, "activeE");
        }
    }
}

//updates health status w/o creating new div
if (areaRender === "playerDamage") {
    $("#activeE").empty();
    renderOne(charobj, "#activeE", " ");
}
//updats your health without creating new div
if (areaRender === "enemyDamage") {
    $("#yourChar").empty();
    renderOne(charobj, "#yourChar", " ");
}
if (areaRender === " enemyDefeated") {
    $("activeE").empty();
}

// on click event to pick enemy to fight 
$(document).on("click", ".enemy", function (){
    var name = ($(this).attr("data-name"));

    if ($("#activeE").children().length === 0){
        renderCharacters(name, "#activeE"); //attaches enemy to fight section
        $(this).hide(); // hides enemy from enemyArray
        renderMessages("clearMessage");
    }

})

//function calls 
// render characters to player wrapper 
renderCharacters(characters, "#playerWrapper");

// pushes your chosen character to #yourchar div
$(document).on("click", ".character", function (){
    var name = ($(this).attr("data-name"));
    console.log(name);
    if(!yourChar) {
        yourChar = characters[name];
        for (var key in characters) {
            if(key !==name ) {
                enemyArray.push(characters[key]);
                console.log (enemyArray);

            }
        }
    }

    $("#playerWrapper").hide(); //hides player div
    renderCharacters(yourChar, "#yourChar"); // attaches your character to the main area/fight area
    renderCharacters(enemyArray, "#available-to-attack"); //pushes enemies to enemy array
})
// attack button 
$("#attack-button").on(click, function() {
    if ($("#activeE").children().length!==0) {
        yourEnemy.health -= (yourChar.Attack = turnCounter); //attacks enemy health
    
        if (yourEnemy.health > 0 ){
            renderCharacters(yourEnemy, "playerDamage");
            var attackMessage = "You attacked" + yourEnemy.name + "with" + yourChar.Attack + "shots!"
            renderMessage(attackMessage); //shows attack and updates counts

            yourChar.health -= yourEnemy.counterAttack; // your health and counterAttacks
            renderCharacters(yourChar, "enemyDamage");
            
            var counterAttackMessage = yourEnemy.name + "attacked you with" + yourEnemy.counterAttack + "shots!"
            renderMessage(counterAttackMessage);
            renderMessage("clearMessage");

        }
     If (yourChar.health <= 0 ) {
        renderMessage ("clearMessage");
        restartGame ("You have been defeated");
        $("#attack-button").unbind("click");
    }

    else { //renders  when you win
        renderCharacters(yourEnemy, "enemyDefeated");
        killCount++;
        var gameStateMessage = "You beat " + charobj.name + "!";
        renderMessage(gameStateMessage);

        if( killCount >= 3){
            renderMessages("clearMessage");
            restarGame("You won!");

        }
    }

    turnCounter++;
})

var restarGame = function (inputEndGame) {
    var restart = $("<button> Restart</button>").click(function (){
        location.reload();
    });
        var gameState = $("<div>").text(inputEndGame);
    
$("body").append(gameState);
$("body").append(restart);
}
});




