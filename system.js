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

  // ******** START CODING ON THE NEXT LINE ********

  document.body.style.backgroundColor = 'black';
  
  var surface = new THREE.MeshPhongMaterial({ambient: 0xFFD700});
  surface.map = THREE.ImageUtils.loadTexture("images/sun.jpg");
  var star = new THREE.SphereGeometry(50, 28, 21);
  var sun = new THREE.Mesh(star, surface);
  sun.rotation.x = Math.PI/2;
  scene.add(sun);
  
  var ambient = new THREE.AmbientLight(0xffffff);
  scene.add(ambient);
  
  var sunlight = new THREE.PointLight(0xffffff, 5, 1000);
  scene.add(sunlight);

  var surface = new THREE.MeshPhongMaterial({ambient: 0x1a1a1a});
  surface.map = THREE.ImageUtils.loadTexture("images/mercury.jpg");
  var planet = new THREE.SphereGeometry(20, 20, 15);
  var mercury = new THREE.Mesh(planet, surface);
  mercury.position.set(100, 0, 0);
  mercury.rotation.x = Math.PI/2;
  scene.add(mercury);

  var surface = new THREE.MeshPhongMaterial({ambient: 0x1a1a1a});
  surface.map = THREE.ImageUtils.loadTexture("images/venus.jpg");
  var planet = new THREE.SphereGeometry(20, 20, 15);
  var venus = new THREE.Mesh(planet, surface);
  venus.position.set(180, 0, 0);
  venus.rotation.x = Math.PI/2;
  scene.add(venus);

  var surface = new THREE.MeshPhongMaterial({ambient: 0x1a1a1a});
  surface.map = THREE.ImageUtils.loadTexture("images/earth.jpg");
  var planet = new THREE.SphereGeometry(20, 20, 15);
  var earth = new THREE.Mesh(planet, surface);
  earth.position.set(260, 0, 0);
  earth.rotation.x = Math.PI/2;
  scene.add(earth);
  
  var surface = new THREE.MeshPhongMaterial({ambient: 0x1a1a1a});
  surface.map = THREE.ImageUtils.loadTexture("images/mars.jpg");
  var planet = new THREE.SphereGeometry(20, 20, 15);
  var mars = new THREE.Mesh(planet, surface);
  mars.position.set(340, 0, 0);
  mars.rotation.x = Math.PI/2;
  scene.add(mars);
  
  var surface = new THREE.MeshPhongMaterial({ambient: 0x1a1a1a});
  surface.map = THREE.ImageUtils.loadTexture("images/jupiter.jpg");
  var planet = new THREE.SphereGeometry(20, 20, 15);
  var jupiter = new THREE.Mesh(planet, surface);
  jupiter.position.set(420, 0, 0);
  jupiter.rotation.x = Math.PI/2;
  scene.add(jupiter);
  
  var surface = new THREE.MeshPhongMaterial({ambient: 0x1a1a1a});
  surface.map = THREE.ImageUtils.loadTexture("images/saturn.jpg");
  var planet = new THREE.SphereGeometry(20, 20, 15);
  var saturn = new THREE.Mesh(planet, surface);
  saturn.position.set(500, 0, 0);
  saturn.rotation.x = Math.PI/2;
  scene.add(saturn);
  
  var surface = new THREE.MeshPhongMaterial({ambient: 0x1a1a1a});
  surface.map = THREE.ImageUtils.loadTexture("images/uranus.jpg");
  var planet = new THREE.SphereGeometry(20, 20, 15);
  var uranus = new THREE.Mesh(planet, surface);
  uranus.position.set(580, 0, 0);
  uranus.rotation.x = Math.PI/2;
  scene.add(uranus);
  
  var surface = new THREE.MeshPhongMaterial({ambient: 0x1a1a1a});
  surface.map = THREE.ImageUtils.loadTexture("images/neptune.jpg");
  var planet = new THREE.SphereGeometry(20, 20, 15);
  var neptune = new THREE.Mesh(planet, surface);
  neptune.position.set(660, 0, 0);
  neptune.rotation.x = Math.PI/2;
  scene.add(neptune);
  
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
  
  // Now, show what the camera sees on the screen:
  
  var mercury_cam = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 1e6);
  scene.add(mercury_cam);
  
  var venus_cam = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 1e6);
  scene.add(venus_cam);
  
  var mars_cam = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 1e6);
  scene.add(mars_cam);
  
  var jupiter_cam = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 1e6);
  scene.add(jupiter_cam);
  
  var saturn_cam = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 1e6);
  scene.add(saturn_cam);
  
  var uranus_cam = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 1e6);
  scene.add(uranus_cam);
  
  var neptune_cam = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 1e6);
  scene.add(neptune_cam);
  
  var sun_cam = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 1e6);
  scene.add(sun_cam);
  
  var camera = above_cam;
  
  var clock = new THREE.Clock();
  
  function animate(){
    requestAnimationFrame(animate);
    
    var time = clock.getElapsedTime();
    
    var mercury_angle = time * 2.07555;
    mercury.position.set(100*Math.cos(mercury_angle), 100*Math.sin(mercury_angle), 0);
    
    var v_angle = time * 0.81168;
    venus.position.set(180*Math.cos(v_angle), 180*Math.sin(v_angle), 0);
    
    var e_angle = time * 0.5;
    earth.position.set(260*Math.cos(e_angle), 260*Math.sin(e_angle), 0);
    
    var m_angle = time * 0.26315;
    mars.position.set(340*Math.cos(m_angle), 340*Math.sin(m_angle), 0);
    
    var j_angle = time * 0.04166;
    jupiter.position.set(420*Math.cos(j_angle), 420*Math.sin(j_angle), 0);
    
    var s_angle = time * 0.01694;
    saturn.position.set(500*Math.cos(s_angle), 500*Math.sin(s_angle), 0);
    
    var u_angle = time * 0.00595;
    uranus.position.set(580*Math.cos(u_angle), 580*Math.sin(u_angle), 0);
    
    var n_angle = time * 0.00303;
    neptune.position.set(660*Math.cos(n_angle), 660*Math.sin(n_angle), 0);
    
  var sun_y_diff = sun.position.y - earth.position.y,
        sun_x_diff = sun.position.x - earth.position.x,
        sun_angle = Math.atan2(sun_x_diff, sun_y_diff);
        
    var mercury_y_diff = mercury.position.y - earth.position.y,
        mercury_x_diff = mercury.position.x - earth.position.x,
        mercury_angle_a = Math.atan2(mercury_x_diff, mercury_y_diff);
        
    var venus_y_diff = venus.position.y - earth.position.y,
        venus_x_diff = venus.position.x - earth.position.x,
        venus_angle_a = Math.atan2(venus_x_diff, venus_y_diff);
        
    var y_diff = mars.position.y - earth.position.y,
        x_diff = mars.position.x - earth.position.x,
        angle = Math.atan2(x_diff, y_diff);
    
    var jupiter_y_diff = jupiter.position.y - earth.position.y,
        jupiter_x_diff = jupiter.position.x - earth.position.x,
        jupiter_angle_a = Math.atan2(jupiter_x_diff, jupiter_y_diff);
    
    var saturn_y_diff = saturn.position.y - earth.position.y,
        saturn_x_diff = saturn.position.x - earth.position.x,
        saturn_angle_a = Math.atan2(saturn_x_diff, saturn_y_diff);
    
    var uranus_y_diff = uranus.position.y - earth.position.y,
        uranus_x_diff = uranus.position.x - earth.position.x,
        uranus_angle_a = Math.atan2(uranus_x_diff, uranus_y_diff);
    
    var neptune_y_diff = neptune.position.y - earth.position.y,
        neptune_x_diff = neptune.position.x - earth.position.x,
        neptune_angle_a = Math.atan2(neptune_x_diff, neptune_y_diff);
    
    mercury_cam.rotation.set(Math.PI/2, -mercury_angle_a, 0);
    mercury_cam.position.set(earth.position.x, earth.position.y, 22);
    
    venus_cam.rotation.set(Math.PI/2, -venus_angle_a, 0);
    venus_cam.position.set(earth.position.x, earth.position.y, 22);
    
    mars_cam.rotation.set(Math.PI/2, -angle, 0);
    mars_cam.position.set(earth.position.x, earth.position.y, 22);
    
    jupiter_cam.rotation.set(Math.PI/2, -jupiter_angle_a, 0);
    jupiter_cam.position.set(earth.position.x, earth.position.y, 22);
    
    saturn_cam.rotation.set(Math.PI/2, -saturn_angle_a, 0);
    saturn_cam.position.set(earth.position.x, earth.position.y, 22);
    
    uranus_cam.rotation.set(Math.PI/2, -uranus_angle_a, 0);
    uranus_cam.position.set(earth.position.x, earth.position.y, 22);
    
    neptune_cam.rotation.set(Math.PI/2, -neptune_angle_a, 0);
    neptune_cam.position.set(earth.position.x, earth.position.y, 22);
    
    sun_cam.rotation.set(Math.PI/2, -sun_angle, 0);
    sun_cam.position.set(earth.position.x, earth.position.y, 22);
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  document.addEventListener("keydown", function(event){
    var code = event.keyCode;
    
    if(code == 65){
      camera = above_cam;
    }
    if(code == 77 || code == 49){
      camera = mercury_cam;
    }
    if(code == 86 || code == 50){
      camera = venus_cam;
    }
    if(code == 69 || code == 52){
      camera = mars_cam;
    }
    if(code == 74 || code == 53){
      camera = jupiter_cam;
    }
    if(code == 83 || code == 54){
      camera = saturn_cam;
    }
    if(code == 85 || code == 55){
      camera = uranus_cam;
    }
    if(code == 78 || code == 56){
      camera = neptune_cam;
    }
    if(code == 48){
      camera = sun_cam;
    }
    if(code == 79){
      for(var i = 0; i < orbits.length; i++){
        orbits[i].material.visible = !orbits[i].material.visible;
      }
    }
  });