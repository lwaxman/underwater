var critters = [];
var width = window.innerWidth; 
var height = window.innerHeight; 
var bgColour; 

var setup = function(){
	canvas.width = width; 
	canvas.height = height; 

	bgColour = gradient(width/2,0,width/2,height*0.3,"#2b7984", "#004f73");

	for(var i=0; i<100; i++){
		var tempCrit = new Blob(random(0,width), random(height*0.25,height), random(100,150), 60);
		critters.push(tempCrit);
	}

	window.requestAnimationFrame(draw);
}

var draw = function(){
	//bg should be an image drawn on an alt canvas? maybe?

	background();
	fill(bgColour);
	fRect(0,0,width,height);

	fill("#004f73");
	fRect(0,height*0.25,width,height);

	critters.sort(function(obj1, obj2){
      return obj1.y - obj2.y;
    });

	critters.forEach( function(critter) {
      critter.update();
      critter.draw();
    });

    window.requestAnimationFrame(draw);
}

window.onresize = function(){
	width = window.innerWidth; 
	height = window.innerHeigh; 
	setup();
}

setup();