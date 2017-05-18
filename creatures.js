function Component(x, y, w, h){
  this.x = x;
  this.y = y;
  this.w = w; 
  this.h = h; 
}
Component.prototype.update = function(){};
Component.prototype.draw = function(){};


function Blob(x, y, w, h) {
	Component.call(this, x, y, w, h);
	this.fill = gradient(x,y-h,x,y,"#05345f", "#004f73");
	this.stroke = "#004f73";
	this.slugLength = random(40,60);
	this.slugCount = 10; //random(0,10);
	this.height = h; 
	this.speed = random(0.2,0.8,false);
}

Blob.prototype = Object.create(Component.prototype);

Blob.prototype.update = function() {
	this.slug();
};

Blob.prototype.slug = function(){
	this.slugCount++;
	var amplitude = 7;
	var y = Math.sin( (this.slugCount/this.slugLength*2*Math.PI)+Math.PI ) * amplitude;
	this.h = this.height+(y*this.speed);
};

Blob.prototype.draw = function() {
	fill(this.fill);
	stroke(this.stroke);

	pEllipse(this.x, this.y, this.w, this.h*2, 180, 360);
	pEllipse(this.x, this.y, this.w, this.h*2, 180, 360);
	pEllipse(this.x, this.y, this.w, this.h*2, 180, 360);

}
