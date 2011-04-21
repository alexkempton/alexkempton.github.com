// Stage
var canvas;
var stage;
var rect;
var numbers;
var bounds = {};
var score;
var actualScore = 0;


// Sprites
var spaceshipImg = new Image();
var bullet;
var bulletImg = new Image();
var bullets = new Array();
var bulletsIndex = 0;
var spaceship;
var badGuy;
var badGuys = new Array();
var badGuysIndex = 0;
var badGuyImg = new Image();
var ticksSinceBadLastBadGuy = 0;
var logo = new Image();
var logoBmp;
var gameoverimg = new Image();
var gameoverBmp;






// KEYBOARD
var KEYCODE_SPACE = 32;		
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var shootHeld = false;
var lfHeld = false;
var rtHeld = false;

// Audio
var shootSound;
var backgroundmusic;



function init() {
	canvas = document.getElementById("gameCanvas");
	stage = new Stage(canvas);
	bounds.xl = 10;
	bounds.xr = canvas.width-70;
	bounds.yd = canvas.height-60;
	
	// Audio bindings
	shootSound = document.createElement('audio');
	shootSound.setAttribute('src', '../game/shootsound.wav');
	backgroundmusic = document.createElement('audio');
	backgroundmusic.setAttribute('src', '../game/backgroundmusic.mp3');
	
	// Image bindings
	spaceshipImg.src = "../game/spaceship.png";
	bulletImg.src = "../game/bullet.png";
	badGuyImg.src = "../game/badguy.png";
	
	// Get ready for game over
	gameoverimg.src = "../game/gameover.png";
	gameoverBmp = new Bitmap(gameoverimg);
	gameoverBmp.regX = 257;
	gameoverBmp.regY = 79;
	gameoverBmp.x = canvas.width / 2;
	gameoverBmp.y = canvas.height / 2;
	
	// Score text
	score = new Text("0","20px VT323","white");
	score.x = canvas.width - 40;
	score.y = 20;
	stage.addChild(score);
	
	
	
	// Events
	document.onkeydown = keyDownEventHandler;
	document.onkeyup = keyUpEventHandler;
	
	// Start the intro screen
	logo.onload = startIntroScreen;
	logo.src = "../game/logo.png";
	

	
	
}

function startIntroScreen(){

	logoBmp = new Bitmap(logo);
	logoBmp.regX = 147;
	logoBmp.regY = 35;
	logoBmp.x = canvas.width / 2;
	logoBmp.y = canvas.height / 2;
	stage.addChild(logoBmp);
	stage.update();
	backgroundmusic.play();
	

	canvas.onclick = firstClick;
}

function firstClick(){
	stage.removeChild(logoBmp);
	canvas.onclick=null;
	startGame();
}

function startGame(){
	spaceship = new Bitmap(spaceshipImg);
	spaceship.x = canvas.width/2;
	spaceship.y = canvas.height-35;
	spaceship.middle = 28;
	
	bullet = new Bitmap(bulletImg);

	
	badGuy = new Bitmap(badGuyImg);
	stage.addChild(spaceship);
	stage.update();
	
	Ticker.setFPS(60);
	Ticker.addListener(window);
}


function tick(){
	if(lfHeld === true){
		if(spaceship.x>bounds.xl)
		spaceship.x -= 5;
	}
	
	if(rtHeld == true){
		if(spaceship.x<bounds.xr)
		spaceship.x += 5;
	}
	

	
	
	for(var i=0;i<bullets.length;i++){
		if(bullets[i].active==true){
			bullets[i].y -= 5;
			for(var j=0;j<badGuys.length;j++){
				if((bullets[i].x > badGuys[j].x-8 && bullets[i].x < badGuys[j].x+24) && (bullets[i].y > badGuys[j].y && bullets[i].y < badGuys[j].y+24)){
					stage.removeChild(badGuys[j]);
					badGuys[j].active=false;
					actualScore += 1;
					score.text = actualScore;
					break;
				}
			}
		
		
		if(bullets[i].y<-30){
			bullets[i].active=false;
		}
		
		}
	}
	
	
	for(var i=0;i<badGuys.length;i++){
		if(badGuys[i].active==true){
		badGuys[i].y += 3;
	//	badGuys[i].rotation+=2;
		if((badGuys[i].x > spaceship.x && badGuys[i].x < spaceship.x+56) && (badGuys[i].y > spaceship.y && badGuys[i].y < spaceship.y+56)){
			gameOver();
		}
	
		
		if(badGuys[i].y>canvas.height+5){
			badGuys[i].active=false;
		}
		
		}
	}
	
	checkForBadGuys();
	stage.update();
}

function gameOver(){
	Ticker.setPaused(true);
	stage.clear();
	stage.addChild(gameoverBmp);
	stage.update();
}

function checkForBadGuys(){
	ticksSinceBadLastBadGuy++;
	if(ticksSinceBadLastBadGuy>Math.floor(Math.random()*120)){
		goBadGuy();
		ticksSinceBadLastBadGuy=0;
	}
}

function goBadGuy(){
	badGuys[badGuysIndex]=badGuy.clone();
	badGuys[badGuysIndex].x = Math.floor(Math.random()*canvas.width);
	badGuys[badGuysIndex].y = 0;
	badGuys[badGuysIndex].active=true;
	stage.addChild(badGuys[badGuysIndex]);
	badGuysIndex++;
} 

function fireBullet(){
	bullets[bulletsIndex]=bullet.clone();
	bullets[bulletsIndex].x = spaceship.x + spaceship.middle;
	bullets[bulletsIndex].y = bounds.yd;
	bullets[bulletsIndex].active=true;
	shootSound.play();
	stage.addChild(bullets[bulletsIndex]);
	bulletsIndex++;
}

// Event handlers copied from easeljs example
function keyDownEventHandler(e){

	if(!e){ var e = window.event; }
		switch(e.keyCode) {
			case KEYCODE_SPACE:	shootHeld = true; break;
			case KEYCODE_LEFT:	lfHeld = true; break;
			case KEYCODE_RIGHT: rtHeld = true; break;

		}
}

// Event handlers copied from easeljs example
function keyUpEventHandler(e){
	if(!e){ var e = window.event; }
		switch(e.keyCode) {
			case KEYCODE_SPACE:	shootHeld = fireBullet(); break;
			case KEYCODE_LEFT:	lfHeld = false; break;
			case KEYCODE_RIGHT: rtHeld = false; break;

		}
}