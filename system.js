	// This is where stuff in our game will happen:
	var scene = new THREE.Scene();
	
	// This is what sees the stuff:
	var aspect_ratio = window.innerWidth / window.innerHeight;
	var above_cam = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 1e6);
	above_cam.position.z = 1000;
	scene.add(above_cam);
	
	// This will draw what the camera sees onto the screen:
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	document.body.style.backgroundColor = 'black';
	
	var ambient = new THREE.AmbientLight(0xffffff);
	scene.add(ambient);
	
	var sunlight = new THREE.PointLight(0xffffff, 5, 1000);
	scene.add(sunlight);
	
	var surface = new THREE.MeshPhongMaterial({ambient: 0xFFD700});
	surface.map = THREE.ImageUtils.loadTexture("images/sun.jpg");
	var star = new THREE.SphereGeometry(50, 28, 21);
	var sun = new THREE.Mesh(star, surface);
	sun.rotation.x = Math.PI/2;
	scene.add(sun);
	
	var mesh_ambient = 0x1a1a1a;
	var imagesPlanets = ["mercury.jpg", "venus.jpg", "earth.jpg", "mars.jpg", "jupiter.jpg", "saturn.jpg", "uranus.jpg", "neptune.jpg"];
	var planets = []
	
	for(var i = 0; i < 8; i++){
		var surface = new THREE.MeshPhongMaterial({ambient: mesh_ambient});
		surface.map = THREE.ImageUtils.loadTexture("images/"+imagesPlanets[i]);
		var body = new THREE.SphereGeometry(20, 20, 15);
		var planet = new THREE.Mesh(body, surface);
		planet.position.set(100 + i*80, 0, 0);
		planet.rotation.x = Math.PI/2;
		scene.add(planet);
		planets.push(planet);
	}

	var stars = new THREE.Geometry();
	
	while(stars.vertices.length < 1e4){
	var lat = Math.PI * Math.random() - Math.PI/2;
	var lon = 2*Math.PI * Math.random();
	
	stars.vertices.push(new THREE.Vector3(
		1e5 * Math.cos(lon) * Math.cos(lat),
		1e5 * Math.sin(lon) * Math.cos(lat),
		1e5 * Math.sin(lat)
	));
	}
	
	var star_stuff = new THREE.ParticleBasicMaterial({size: 500});
	var star_system = new THREE.ParticleSystem(stars, star_stuff);
	scene.add(star_system);
	
	orbits = [];
	
	for(var i = 0; i < 8; i++){
		var orbit = new THREE.Line(
			new THREE.CircleGeometry(100+i*80, 90),
			new THREE.MeshBasicMaterial({
				color: 0xffffff,
				transparent: true,
				opacity: .3,
				side: THREE.BackSide
			})
		);
		orbit.geometry.vertices.shift();
		orbits.push(orbit);
		scene.add(orbit);
	}
	
	var cameras = []
	
	for(var i = 0; i < 8; i++){
		var Camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 1e6);
		scene.add(Camera);
		cameras.push(Camera);
	}

	var sun_cam = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 1e6);
	scene.add(sun_cam);
	
	var camera = above_cam;
	
	var clock = new THREE.Clock();
	
	function animate(){
		requestAnimationFrame(animate);
		
		var time = clock.getElapsedTime();
		
		var relativeCirculationTime = [2.07555, 0.81168, 0.5, 0.26315, 0.04166, 0.01694, 0.00595, 0.00303]; //I hope i got these right
		
		for(var i = 0; i < 8; i++){
			var angle = time * relativeCirculationTime[i];
			planets[i].position.set((100+ i*80)*Math.cos(angle), (100 + i*80)*Math.sin(angle), 0);
		}
		
		var sun_y_diff = sun.position.y - planets[2].position.y,
			sun_x_diff = sun.position.x - planets[2].position.x,
			sun_angle = Math.atan2(sun_x_diff, sun_y_diff);
			sun_cam.rotation.set(Math.PI/2, -sun_angle, 0);
			sun_cam.position.set(planets[2].position.x, planets[2].position.y, 22);
			
		for(var i = 0; i < 8; i++){
			y_diff = planets[i].position.y - planets[2].position.y,
			x_diff = planets[i].position.x - planets[2].position.x,
			angle_a = Math.atan2(x_diff, y_diff);
			cameras[i].rotation.set(Math.PI/2, -angle_a, 0);
			cameras[i].position.set(planets[2].position.x, planets[2].position.y, 22);
		}
		
		renderer.render(scene, camera);
	}
	
	animate();
	
document.addEventListener("keydown", function(event){
	var code = event.keyCode;

	switch(code){
		case 65:
			camera = above_cam;
			break;
		case 77:
		case 49:
			camera = cameras[0];
			break;
		case 86:
		case 50:
			camera = cameras[1];
			break;
		case 69:
		case 52:
			camera = cameras[3];
			break;
		case 74:
		case 53:
			camera = cameras[4];
			break;
		case 83:
		case 54:
			camera = cameras[5];
			break;
		case 85:
		case 55:
			camera = cameras[6];
			break;
		case 78:
		case 56:
			camera = cameras[7];
			break;
		case 48:
			camera = sun_cam;
			break;
		case 79:
			for(var i = 0; i < orbits.length; i++){
				orbits[i].material.visible = !orbits[i].material.visible;
			}
			break;
	}
});