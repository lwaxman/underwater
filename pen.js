/*
* 
* Laurie Waxman
* 26.02.16
* 
* Felt-tip pen drawing functions for myself, for use in whatever the f*** I want. 
*
*/
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 

c.strokeStyle = "black";
c.fillStyle = "white";
c.lineCap = "round";
c.lineJoin = "round";
c.lineWidth = 1;

var width = canvas.width; 
var height = canvas.height; 
var fillShape = false;
var drawStroke = false;

var resetCanvas = function(){
	c = canvas.getContext("2d");
}

var setCanvas = function(context){
	c = context;
}

var random = function(min, max, r){
	if(r === undefined) r = true; 
	if(r){
		return rand = Math.round( Math.random()*(max-min)+min );
	}else{
		return rand = Math.random()*(max-min)+min;
	}
}

var randomColour = function(){
	return "rgba("+random(0,255)+", "+random(0,255)+", "+random(0,255)+", 1)";
}

// map from: 
// http://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
var map = function(num, minIN, maxIN, minOUT, maxOUT) {
  return (num - minIN) * (maxOUT - minOUT) / (maxIN - minIN) + minOUT;
}

var deg = function(d){
	return d * Math.PI/180;
}

var getLength = function(a, b){
	var a2 = (a[1]-a[0])*(a[1]-a[0]) ;
	var b2 = (b[1]-b[0])*(b[1]-b[0]) ;
	return Math.sqrt( a2 + b2 );
}

var background = function(){
	c.clearRect(0, 0, width, height);
}

var blendMode = function(m){
	if(m=="multiply"){
		c.globalCompositeOperation = "multiply";
	}else if(m=="normal"){
		c.globalCompositeOperation = "source-over";
	}
}

var gradient = function(x1, y1, x2, y2, c1, c2){
	var grd = c.createLinearGradient(x1, y1, x2, y2,);
	grd.addColorStop(0,c1);
	grd.addColorStop(1,c2);
	return grd; 
}

var fill = function(cl){
	fillShape = true;
	c.fillStyle = cl;
}

var noFill = function(){
	fillShape = false;
	c.fillStyle = "rgba(255,255,255,0)";
}

var stroke = function(cl){
	c.strokeStyle = cl;
}

var noStroke = function(){
	c.strokeStyle = "rgba(0,0,0,0)";
}

var strokeWidth = function(){
	c.lineWidth = random(1,2,false);
}

var pPoint = function(x, y){
	x += random(-1, 1);
	y += random(-1, 1);
	c.save();
	c.fillStyle = "black";
	c.fillRect(x, y, random(2,3,false), random(2,3,false));
	c.restore();
}

var pLine = function(x1, y1, x2, y2){
	strokeWidth();
	var offset = 2; 
	c.beginPath();
	c.moveTo(x1, y1);
	if( getLength([x1, x2],[y1,y2]) < 30){
		offset = 1;
		c.lineTo(x1+((x2-x1)*0.5)+random(-offset, offset), y1+((y2-y1)*0.5)+random(-offset, offset));
	}else{
		c.lineTo(x1+((x2-x1)*0.33)+random(-offset, offset), y1+((y2-y1)*0.33)+random(-offset, offset));
		c.lineTo(x1+(2*(x2-x1)*0.33)+random(-offset, offset), y1+(2*(y2-y1)*0.33)+random(-offset, offset));
	}
	c.lineTo(x2, y2);
	c.stroke();
	c.closePath();
}

var pEx = function(x, y, w, h){
	pLine((x-w/2), (y-h/2), (x-w/2)+w, (y-h/2)+h);
	pLine((x-w/2)+w, (y-h/2), (x-w/2), (y-h/2)+h);
}

var pRect = function(x, y, w, h){
	if( fillShape ) fRect(x, y, w, h);
	pLine(x, y, x+w, y);
	pLine(x+w, y, x+w, y+h);
	pLine(x+w, y+h, x, y+h);
	pLine(x, y+h, x, y);
}
var fRect = function(x, y, w, h){
	c.beginPath();
	c.moveTo(x, y);
	c.lineTo(x+w, y);
	c.lineTo(x+w, y+h);
	c.lineTo(x, y+h);
	c.fill();
	c.closePath();
}

var pQuad = function(p1, p2, p3, p4){
	if( fillShape )fQuad(p1, p2, p3, p4);
	pLine(p1[0], p1[1], p2[0], p2[1]);
	pLine(p2[0], p2[1], p3[0], p3[1]);
	pLine(p3[0], p3[1], p4[0], p4[1]);
}
var fQuad = function(p1, p2, p3, p4){
	c.beginPath();
	c.moveTo(p1[0], p1[1]);
	c.lineTo(p2[0], p2[1]);
	c.lineTo(p3[0], p3[1]);
	c.lineTo(p4[0], p4[1]);
	c.fill();
	c.closePath();
}

var ellipse = function(x, y, r, sA, eA){
	if(sA===undefined) sA = 0;
	if(eA===undefined) eA = 360; 
	c.beginPath();
	c.arc(x, y, r, sA, eA);
	c.fill();
	c.closePath();
}
// there is definitely a better way to do this...
var pEllipse = function(x, y, w, h, sA, eA){
	if(sA===undefined) sA = 0;
	if(eA===undefined) eA = 360; 

	if(w > h) var r = h/2; 
	else var r = w/2; 

	var lastx = x; 
	var lasty = y;
	var inc = 10; 
	var offset = 1; 
	
	c.beginPath();

	if(r>25 && r<=100){
		inc = 15;
		offset = 1;
	}else if(r<=25){
		inc = 20;
		offset = 0.6;
	}else{
		inc = 10; 
		offset = 2; 
	}

	if(eA==360) c.moveTo(x+(w/2), y);
	for(i=sA; i<eA; i+=inc){
		strokeWidth();
		if(w>h){
		//stretch width
			px = x + (r * Math.cos( deg(i) )) + random(-offset, offset);
			py = y + (r * Math.sin( deg(i) )) + random(-offset, offset);
			px = map(px, x+(r/2), x-(r/2), x+(w/4), x-(w/4)); //from circle to ellipse
			c.lineTo(px, py);	
		}else{
		//stretch height
			px = x + (r * Math.cos( deg(i) )) + random(-offset, offset);
			py = y + (r * Math.sin( deg(i) )) + random(-offset, offset);
			py = map(py, y+(r/2), y-(r/2), y+(h/4), y-(h/4)); //from circle to ellipse
			c.lineTo(px, py);	
		}
		x = lastx; 
		y = lasty;
	}
	if(eA==360) c.lineTo(x+(w/2), y);
	c.fill();
	if(drawStroke){
		c.stroke();
	}
	c.closePath();
}

var fEllipse = function(x, y, w, h, sA, eA){
	if(sA===undefined) sA = 0;
	if(eA===undefined) eA = 360; 

	if(w > h) var r = h/2; 
	else var r = w/2; 

	var lastx = x; 
	var lasty = y;
	var inc = 10; 
	var offset = 1; 
	
	c.beginPath();

	if(r>25 && r<=100){
		inc = 15;
		offset = 1;
	}else if(r<=25){
		inc = 20;
		offset = 0.6;
	}else{
		inc = 10; 
		offset = 2; 
	}

	if(eA==360) c.moveTo(x+(w/2), y);
	for(i=sA; i<eA; i+=inc){
		strokeWidth();
		if(w>h){
		//stretch width
			px = x + (r * Math.cos( deg(i) )) + random(-offset, offset);
			py = y + (r * Math.sin( deg(i) )) + random(-offset, offset);
			px = map(px, x+(r/2), x-(r/2), x+(w/4), x-(w/4)); //from circle to ellipse
			c.lineTo(px, py);	
		}else{
		//stretch height
			px = x + (r * Math.cos( deg(i) )) + random(-offset, offset);
			py = y + (r * Math.sin( deg(i) )) + random(-offset, offset);
			py = map(py, y+(r/2), y-(r/2), y+(h/4), y-(h/4)); //from circle to ellipse
			c.lineTo(px, py);	
		}
		x = lastx; 
		y = lasty;
	}
	if(eA==360) c.lineTo(x+(w/2), y);
	c.fill();
	// c.stroke();
	c.closePath();
}

