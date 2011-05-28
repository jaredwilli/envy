/**
 * Author: Jared Williams
 *
 * Envy.js
 */
 
 
(function() {
 	var body = document.body,
		//canvas = document.createElement('canvas'),
		canvas = document.querySelector('canvas'),
		con = canvas.getContext('2d'),
		w = canvas.width, h = canvas.height,
		code = document.createElement('code'),
		left = 37, up = 38, right = 39, down = 40,
		isStarted = false,
		isDragging = false,
		fps = 33,
		points = [], 
		point, style, dPoint, w, h;
		
	//body.appendChild(canvas)
	
	
	function animate() {
	
		if (isStarted) {
		
			setTimeout(function() {		
				update();
				draw();
			}, 1000 / fps);
		
		}
	}
	
	function update() {
	
		isStarted = false;
		
		// Keyboard Controls
		window.onkeydown = function(e) {
			var keyCode = e.keyCode;

			isStarted = true;
			animate();
			
			if (keyCode == left) { shape.x -= 10; } else if (keyCode == up) { shape.y -= 10; }
			if (keyCode == right) { shape.x += 10; } else if (keyCode == down) { shape.y += 10; }
		};
		
		
		// make edges mirror like in asteroids
		if (shape.x + shape.size < 0) { shape.x = w; } else if (shape.x - shape.size > w) { shape.x = 0 - shape.size; }
		if (shape.y + shape.size < 0) { shape.y = h; } else if (shape.y - shape.size > h) {	shape.y = 0 - shape.size; }
		
		animate();
	}
	window.addEventListener('resize', draw, false);
	
	function draw() {
		con.clearRect(0, 0, canvas.width, canvas.height);
		
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		w = canvas.width;
		h = canvas.height;
		grid();
		
		shape.draw();
	}
		

	var shape = {
		color: '#fff',
		x: 10,
		y: 10,
		size: 105,
		draw: function() {
			con.fillStyle = this.color;
			con.fillRect(this.x, this.y, this.size, this.size, 0, 0);
		}
	};
	
	update();
	draw();
		
	
	// Grid Lines
	function grid() {
		for( var i = 0.5; i < w || i < h; i += 5 ) {
			con.moveTo( i, 0 );
			con.lineTo( i, h);
			
			con.moveTo( 0, i );
			con.lineTo( w, i);
		}
		con.strokeStyle = 'hsla(0, 0%, 40%, .2)';
		con.stroke();
	}

	
})();