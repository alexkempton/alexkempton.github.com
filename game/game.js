var canvas;
var stage;
var rect;
var numbers;
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



var bounds = {};


// KEYBOARD
var KEYCODE_SPACE = 32;		
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var shootHeld = false;
var lfHeld = false;
var rtHeld = false;




function init() {
	canvas = document.getElementById("gameCanvas");
	stage = new Stage(canvas);
	bounds.xl = 10;
	bounds.xr = canvas.width-70;
	bounds.yd = canvas.height-60;
	
	
	
	spaceshipImg.src = "../game/spaceship.png";
	bulletImg.src = "../game/bullet.png";
	badGuyImg.src = "../game/badguy.png";
	
	// Events
	document.onkeydown = keyDownEventHandler;
	document.onkeyup = keyUpEventHandler;
	
	
	handleImages();
}

function handleImages(){
	spaceship = new Bitmap(spaceshipImg);
	spaceship.x = canvas.width/2;
	spaceship.y = canvas.height-60;
	spaceship.middle = 35;
	
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
			if((bullets[i].x > badGuys[j].x && bullets[i].x < badGuys[j].x+20) && (bullets[i].y > badGuys[j].y && bullets[i].y < badGuys[j].y+20)){
				stage.removeChild(badGuys[j]);
				badGuys[j].active=false;
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
		//badGuys[i].rotation+=1;
		if((badGuys[i].x > spaceship.x && badGuys[i].x < spaceship.x+70) && (badGuys[i].y > spaceship.y && badGuys[i].y < spaceship.y+70)){
			console.log("die");
		}
	
		
		if(badGuys[i].y>canvas.height+5){
			badGuys[i].active=false;
		}
		
		}
	}
	
	checkForBadGuys();
	stage.update();
}


function checkForBadGuys(){
	ticksSinceBadLastBadGuy++;
	if(ticksSinceBadLastBadGuy>120){
		goBadGuy();
		ticksSinceBadLastBadGuy=0;
	}
}

function goBadGuy(){
	badGuys[badGuysIndex]=badGuy.clone();
	badGuys[badGuysIndex].x = spaceship.x + 32;
	badGuys[badGuysIndex].y = 0;
	badGuys[badGuysIndex].active=true;
	stage.addChild(badGuys[badGuysIndex]);
	badGuysIndex++;
} 

function fireBullet(){
	bullets[bulletsIndex]=bullet.clone();
	bullets[bulletsIndex].x = spaceship.x + 32;
	bullets[bulletsIndex].y = bounds.yd;
	bullets[bulletsIndex].active=true;
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