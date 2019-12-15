var coverLink = "https://i.imgur.com/d2hOP4Y.jpg";
var coverInsideLink = "https://i.imgur.com/AOwtxCX.jpg";
var insideLink = "https://i.imgur.com/nUq3fAQ.jpg";
var bgLink = "https://i.imgur.com/Gbkwvsr.jpg";
var scaling = 0.3;
var ctx;
var cover;
var coverInside;
var inside;
var inside;
var bg;
var x = 0;
var animating = false;
var shearX = 0;
var shearY = 0;
var scaleX = 1;
var canvasWidth = 1200;
var canvasHeight = 800;
var imageX = 0;

var loaded =false;
var imgWidth = 0;
var imgHeight = 0;
var bgWidth = 0;
var bgHeight = 0;
var animationCounter = 0;
var animationFinished = false;

var coverFlipped = false;
var shearing = false;
var scalingCover = false;
var framesMax = 60*4;


function getCenterX(){
	return canvasWidth/2;
}


function getCenterY(){
	return canvasHeight/2 - (imgHeight/2)*scaling;
}

function drawCover(){
	if(coverFlipped)
	{
		ctx.drawImage(coverInside, 0, 0,imgWidth*scaling,imgHeight*scaling);
	} else{
		ctx.drawImage(cover,0, 0,imgWidth*scaling,imgHeight*scaling);
	}
}

function resetAnim(){
	shearY = 0;
	scaleX = 1;
	shearing = true;
	scalingCover = false;
	coverFlipped = false;
	animationFinished = false;
}

window.onload = function() {
    ctx = document.getElementById('myCanvas').getContext('2d');
	document.getElementById('myCanvas').width = canvasWidth;
	document.getElementById('myCanvas').height = canvasHeight;
	bg = new Image();
	cover = new Image();
	coverInside = new Image();
	inside = new Image;
	cover.src = coverLink;
	coverInside.src = coverInsideLink;
	inside.src = insideLink;
	bg.src = bgLink;
	window.requestAnimationFrame(update);
	window.onclick = function(){
		 if(animating && !animationFinished)
			 return;
		if(animationFinished){
			resetAnim();
			return;
		}
		resetAnim();
		animating = true;
	};

	cover.onload = function(){
		imgWidth = cover.width;
		imgHeight = cover.height;
		loaded = true;
	}
	bg.onload = function(){
		bgWidth = bg.width;
		bgHeight = bg.height;
	}
}

function update(){
	if(loaded) {
		ctx.clearRect(0 , 0 , canvasWidth , canvasHeight);
		ctx.drawImage(bg,0,0,bgWidth,bgHeight);
		ctx.drawImage(inside, getCenterX(), getCenterY(),imgWidth*scaling,imgHeight*scaling);
		if(animating){
			++animationCounter;
			ctx.save();
			ctx.setTransform(scaleX, shearY, 0, 1, getCenterX(),getCenterY()); 		
			drawCover();	
			ctx.restore();	
			if(coverFlipped)
				shearY+=0.005;
			else
				shearY -=0.005;
			scaleX -= 1/framesMax * 2;
			
			if(scaleX < 0){
				coverFlipped = true;
			}
			if(animationCounter > framesMax){
				animating = false;
				animationCounter = 0;
				animationFinished = true;
			}
		} else{
			ctx.save();
			if(animationFinished)
			{
				ctx.setTransform(scaleX, shearY, 0, 1, getCenterX(),getCenterY());
			}
				else {
				ctx.translate(getCenterX(),getCenterY());
			}
			drawCover();
			ctx.restore();
		}
	}	
	window.requestAnimationFrame(update);	
}