
    var container, scene, renderer, camera, light, clock, loader, mirrorCamera ;
    var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

    container = document.querySelector('.viewport');
// var TWEEN = require('tween.js');
    clock = new THREE.Clock();

    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

    VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.01,
    FAR = 100;

    // alert(window.innerWidth);
    var rendering = true;
    var animationFrame;
    // var mousePosition = {
    //   x:0,
    //   y:0
    // };



    var controlsActive = false;

    var cameraInertia = 0;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xff0000 );
    scene.rotation.x = 0;
    scene.rotation.y = 0;
    scene.rotation.z = 0;
    renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});

    renderer.setSize(WIDTH, HEIGHT);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( 0xffffff, 1 );
    // renderer.setClearColorHex( 0xffffff, 0);
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    mirrorCamera = new THREE.CubeCamera( 1, 10, 1024);
    camera.position.set( 0.5105396863227961, 3.643376153074933, -1.3890251433637397);

    camera.rotation.x = -Math.PI / 12;

    scene.add(camera);

    if (controlsActive){
      controls = new THREE.OrbitControls( camera, renderer.domElement );
      controls.target.set(0,0,0);
      controls.update();
      controls.maxPolarAngle = Math.PI/2-0.094;
      // controls.enablePan = false;
      controls.maxDistance = 13;
      // controls.minDistance = 5.5;
    }


    //

    var ambient = new THREE.AmbientLight( 0x00FFFF);
    scene.add(ambient);
    scene.add(mirrorCamera);
    var mesh, container;
    // var floor_geometry = new THREE.BoxGeometry( 10, 0.001, 10);
    // var floor_material = new THREE.MeshBasicMaterial( { envMap: mirrorCamera.renderTarget } );

        var planeGeo = new THREE.PlaneBufferGeometry( 10, 10 );
        var groundMirror = new THREE.Mirror( renderer, camera, { clipBias: 1, textureWidth: WIDTH, textureHeight: HEIGHT, color: 0xECECEC } );
        var texture = groundMirror.material;
        var mirrorMesh = new THREE.Mesh( planeGeo, texture );
				mirrorMesh.add( groundMirror );
				mirrorMesh.rotateX( - Math.PI / 2 );


    var maze_geometry = new THREE.BoxGeometry(1,0.3,0.01);
    var maze_geometry2 = new THREE.BoxGeometry(5,0.3,0.01);
    var maze_material = new THREE.MeshBasicMaterial(
    { color: 0x000000}
    );
    var yellow_material = new THREE.MeshBasicMaterial(
    { color: 0xff4646 }
  );
    var textured_material = new THREE.MeshBasicMaterial({
    // { map: THREE.ImageUtils.loadTexture('assets/img/dotted-texture5.png')}
      color:0x000000
    });
      var circle_material = new THREE.MeshBasicMaterial( { color: 0xffff00} );
    var maze = new THREE.Mesh(
      maze_geometry,
      maze_material
    );
    var maze2 = new THREE.Mesh(
      maze_geometry,
      maze_material
    );
    var maze3 = new THREE.Mesh(
      maze_geometry,
      maze_material
    );
    var maze4 = new THREE.Mesh(
      maze_geometry,
      maze_material
    );
    var maze5 = new THREE.Mesh(
      maze_geometry2,
      maze_material
    );
    var maze6 = new THREE.Mesh(
      maze_geometry2,
      maze_material
    );
  // maze2
  var centerGeometry = new THREE.BoxGeometry(0.0000001,0.0000001,0.0000001);
  var center = new THREE.Mesh(centerGeometry);
  var center2 = new THREE.Mesh(centerGeometry);
  var mazeLineGeom = new THREE.Geometry();
  var mazeLineGeom2 = new THREE.Geometry();
  var mazeLineGeom3 = new THREE.Geometry();

  var yellowGeom = new THREE.Geometry();


  var circle_geometry = new THREE.CircleGeometry( 2, 32 );

  var circle = new THREE.Mesh( circle_geometry, circle_material );
  circle.rotation.x = Math.PI/2;
  // circle.rotation.x = Math.PI/2;
  circle.position.y = 10;
// scene.add( circle );

  mazeLineGeom.vertices.push(
    new THREE.Vector3(0, 0, 0 ),
    new THREE.Vector3( 0, 0, 4 ),
    // new THREE.Vector3( -1, 0, 1 ),
    new THREE.Vector3( -4, 0, 0 )
  );
  mazeLineGeom2.vertices.push(
    new THREE.Vector3(0, 0, 0 ),
    new THREE.Vector3( 0, 1, 0 ),
    new THREE.Vector3( 1, 1, 0 ),
    new THREE.Vector3( 1, 0, 0 )
  );
  mazeLineGeom3.vertices.push(
    new THREE.Vector3(0, 0, 0 ),
    new THREE.Vector3( 0, 0.10, 0 ),
    new THREE.Vector3( 8, 0.10, 0 ),
    new THREE.Vector3( 8, 0, 0 )
  );
  yellowGeom.vertices.push(
    new THREE.Vector3(0, 0, 0 ),
    new THREE.Vector3( 0, 0.15, 0 ),
    new THREE.Vector3( 7, 0.15, 0 ),
    new THREE.Vector3( 7, 0, 0 )
  );

  mazeLineGeom.faces.push( new THREE.Face4( 0, 1, 2, 3 ) );
  mazeLineGeom2.faces.push( new THREE.Face3( 0, 1, 2 ) );
  mazeLineGeom2.faces.push( new THREE.Face3( 0, 2, 3 ) );

  mazeLineGeom3.faces.push( new THREE.Face3( 0, 1, 2 ) );
  mazeLineGeom3.faces.push( new THREE.Face3( 0, 2, 3 ) );

  yellowGeom.faces.push( new THREE.Face3( 0, 1, 2 ) );
  yellowGeom.faces.push( new THREE.Face3( 0, 2, 3 ) );
  mazeLineGeom.computeBoundingSphere();
  mazeLineGeom2.computeBoundingSphere();
  mazeLineGeom3.computeBoundingSphere();
  yellowGeom.computeBoundingSphere();
  var mazeShape = new THREE.Mesh( mazeLineGeom, maze_material );
  var mazeShape2 = new THREE.Mesh( mazeLineGeom2, textured_material );
  var mazeShape3 = new THREE.Mesh( mazeLineGeom3, maze_material );
  var yellowShape = new THREE.Mesh( yellowGeom, yellow_material );

var mazeCont = new THREE.Mesh(centerGeometry, maze_material);
  mazeShape.position.y = 2;
  mazeShape2.position.y = 3;
  mazeShape2.position.x = 0;

  mazeShape3.position.x = -3
  // yellowShape.position.x = 1;
  // yellowShape.position.z = 2;
  yellowShape.position.set(-3, 1.5, -1);
  yellowShape.rotation.y = -Math.PI/4;
  var view = {
    position: camera.position,
    rotation : {
      x: camera.rotation.x,
      y:camera.rotation.y,
      z:camera.rotation.z
    }
  };
  var rotation = {
    x: -3.047493474219677 ,
    y: -0.04584905340038268,
    z: -3.137267058875789
  };
  var rotation2 = {
    x:  -1.6467429167580074 ,
    y: 0.07239749524230163,
    z: -3.913465086216434
  };
  //  view.position = camera.position;
  //  view.rotation = camera.rotation;
  var cameraPosition = {
    x: 0.88717662734015728,
    y: 12.039731858009107,
    z:0
  };
  var lastPosition = {
    x: 0.88717662734015728,
    y: 12.039731858009107
  };

  var fov = {};
  fov.uno = 10;
  var position2 = {
    x:0,
    y:0,
    z:0
  }
  camera.fov =10;
  var vasa = 40;
  yellowShape.pos = {
    x: -3,
    z: -1
  }
  camera.updateProjectionMatrix();
  center2.add(mazeShape, mazeShape2, mazeShape3, yellowShape);
  var tween =  new TWEEN.Tween( view.position).to( {
  					z: -10  }, 1400 )
  					.easing( TWEEN.Easing.Quadratic.Out );

  var tween5 =  new TWEEN.Tween( view.position ).to({ y:15.24936767630562154},1200 )
  					.easing( TWEEN.Easing.Quadratic.In );

  var tween7 =  new TWEEN.Tween( rotation ).to({x: -2.2554387824359834},1200 )
  					.easing( TWEEN.Easing.Quadratic.In );

  var tween8 =  new TWEEN.Tween( rotation ).to({x: -1.8876330848263423, y: 0.30203039260633513, z: 2.4048065724721672 -Math.PI *2},1500 )
  					.easing( TWEEN.Easing.Quartic.Out );

  var tween6 =  new TWEEN.Tween( view.position ).to({	x: 5,  z: -5}, 1500 )
  					.easing( TWEEN.Easing.Quartic.Out );

  var tween9 =  new TWEEN.Tween( rotation ).to({x: -1.6454100468212487, y: 6.356535846627996  -Math.PI *2, z: 2.3661085397270294 -Math.PI *2},1700 )
  					.easing( TWEEN.Easing.Quartic.In );

  var tween10 =  new TWEEN.Tween( view.position ).to({	x: 0.88717662734015728, y:12.039731858009107,  z: -0.9}, 1300 )
  					.easing( TWEEN.Easing.Quartic.In );

  var tween11 =  new TWEEN.Tween( position2 ).to({	x: 2, y:0 , z:2}, 1500 )
  					.easing( TWEEN.Easing.Quartic.Out );

  var tween12 =  new TWEEN.Tween( yellowShape.pos ).to({	x: -3, z: -3}, 800 )
  					.easing( TWEEN.Easing.Circular.Out );

  var tween13 =  new TWEEN.Tween( view.position).to({	x: -0.0049721028749924855,y:10.030423691905458,  z: -3}, 800 )
  					.easing( TWEEN.Easing.Circular.Out );

  var tween14 =  new TWEEN.Tween( rotation2 ).to({x: -1.8614181039561095, y: 0.0004749152755075068+Math.PI*2, z:-3.840004787782862},1500 )
  					.easing( TWEEN.Easing.Quartic.In );

  var tween2 =  new TWEEN.Tween( view.position ).to( {
  					x: -4.217951970039052, y: 11.951513296555966, z: -2.8931317116041537 }, 3000 )
  					.easing( TWEEN.Easing.Quartic.InOut );
  var tween3 =  new TWEEN.Tween( view.position ).to( {
  					x: -0.000009226082225396355, y: 12.999999999993499, z: 0.000009158570126944982}, 3000 )
  					.easing( TWEEN.Easing.Quartic.InOut );

  var tween4 =  new TWEEN.Tween( fov ).to( {uno:40}, 1400 )
            .easing( TWEEN.Easing.Quadratic.In );

  var tweenMouse =  new TWEEN.Tween( cameraPosition ).to( mousePosition, 5400 )
            .easing( TWEEN.Easing.Quadratic.InOut );

var cameraAfter  = {
  y:0
};
  var idleCamera =  new TWEEN.Tween( cameraPosition ).to( { y:10  },4444 ).repeat( Infinity ).yoyo(true)
            .easing( TWEEN.Easing.Cubic.InOut );

  tween4.delay(2500).start();
  tween4.chain(tween);
  tween.chain(tween5, tween7);
  tween7.chain(tween6, tween8);
  tween10.onComplete(showHeader);
  tween8.chain(tween9, tween10);
  tween10.delay(400).chain(tween12);
  tween12.onComplete(showActions);
  if(isMobile.any()==null){
    tween12.chain(tweenMouse);
  } else {
    tween12.onComplete(function(){
      deltaX = camera.position.x;
      deltaY = camera.position.y;
      manual = true;
    });
  }
  // tweenMouse.chain(idleCamera);
  // tween12.chain(tween13);
  tweenMouse.onComplete(function(){
    cameraPosition.x = lastPosition.x;
    cameraPosition.y = lastPosition.z;
    cameraPosition.z = camera.position.z;
    cameraAfter.y = cameraPosition.y;
    console.log('matora poziciaaj'+cameraAfter.y);
    // manual = true;
      idleCamera.start();

    // mouseLinked = true;
  });
  // tweenMouse.start();
  // tween13.chain(tween14);
  // tween11.chain(tween12);
  // tween4.chain(tween5, tween6);
  // tween6.chain(tween);
  // tween.chain(tween7);
  // tween.chain(tween2);
  // tween2.chain(tween3);
  // tween3.chain(tween);
  idleCamera.onUpdate(function(){
      camera.position.y = cameraPosition.y ;
      // console.log(cameraPosition.y );
  });

tweenMouse.onUpdate(function(){
  camera.position.x = cameraPosition.x;
  camera.position.y = cameraPosition.y ;
  camera.lookAt(center2.position);
  lastPosition.x = cameraPosition.x;
  lastPosition.z = cameraPosition.y;
  // console.log(cameraPosition)
});
// new position
tween11.onUpdate(function(){
  mazeCont.position.x = position2.x;
  mazeCont.position.y = position2.y;
  mazeCont.position.z = position2.z;
});
tween12.onUpdate(function(){
  yellowShape.position.x = yellowShape.pos.x;
  // yellowShape.position.y = yellowShape.pos.y;
  yellowShape.position.z = yellowShape.pos.z;
});
  tween.onUpdate(function(){
      camera.position.x = view.position.x;
      camera.position.y = view.position.y;
      camera.position.z = view.position.z;

      //
      // camera.rotation.x = rotation.x;
      // camera.rotation.y = rotation.y;
      // camera.rotation.z = rotation.z;
      // console.log(rotation);
      // camera.lookAt(mazeShape2.position);
  });
  tween6.onUpdate(function(){
      camera.position.x = view.position.x;
      camera.position.y = view.position.y;
      camera.position.z = view.position.z;
  });
  tween13.onUpdate(function(){
      camera.position.x = view.position.x;
      camera.position.y = view.position.y;
      camera.position.z = view.position.z;
  });
  tween5.onUpdate(function(){
      camera.rotation.x = rotation.x;
      camera.rotation.y = rotation.y;
      camera.rotation.z = rotation.z;
      // camera.lookAt(center2.position);
  });
  tween14.onUpdate(function(){
      camera.rotation.x = rotation2.x;
      camera.rotation.y = rotation2.y;
      camera.rotation.z = rotation2.z;
      // camera.lookAt(center2.position);
      // camera.lookAt(center2.position);
  });
  tween7.onUpdate(function(){
      camera.rotation.x = rotation.x;
      camera.rotation.y = rotation.y;
      camera.rotation.z = rotation.z;
      // camera.lookAt(center2.position);
  });
  tween8.onUpdate(function(){
      camera.rotation.x = rotation.x;
      camera.rotation.y = rotation.y;
      camera.rotation.z = rotation.z;

      // camera.lookAt(center2.position);
  });
  tween9.onUpdate(function(){
    camera.rotation.x = rotation.x;
    camera.rotation.y = rotation.y;
    camera.rotation.z = rotation.z;
  });

  tween10.onUpdate(function(){

      camera.position.x = view.position.x;
      camera.position.y = view.position.y;
      camera.position.z = view.position.z;

      // camera.lookAt(center2.position);
  });
  tween2.onUpdate(function(){
      camera.position.x = view.position.x;
      camera.position.y = view.position.y;
      camera.position.z = view.position.z;
      camera.lookAt(center2.position);
  });
  tween3.onUpdate(function(){
      camera.position.x = view.position.x;
      camera.position.y = view.position.y;
      camera.position.z = view.position.z;
      camera.lookAt(center2.position);
  });
  tween4.onUpdate(function(){
    // console.log(fov);
      camera.fov = fov.uno;
      camera.updateProjectionMatrix();
        // camera.lookAt(mazeShape2.position);
  });
  maze2.position.x = -0.5;
  maze2.position.z = -0.5;
  maze2.rotation.y = Math.PI/2;

  maze3.position.x = 0.5;
  maze3.position.z = -0.5;
  maze3.rotation.y = Math.PI/2;

  maze4.position.z = -1;
  maze5.position.z = -0.5;
  maze5.rotation.y = Math.PI/4;

  maze5.position.z = -0.5;
  maze5.rotation.y = Math.PI/4;

  maze6.position.z = 0.5;
  maze6.rotation.y = Math.PI/4;
  center.position.z = 0.5;
  // var mazeCont = new THREE.Mesh();
  mazeCont.add(maze, maze2, maze3, maze4, maze5, maze6);
  center.add(mazeCont);
  center2.add(center);
  scene.add(center2);
  var cameraPosX = 0.44426790438853775;
  var cameraPosY = 3.6624066401248725;
  var cameraPosZ =  -1.9126542045900217;
  camera.position.set(0.44426790438853775,3.6624066401248725,  -1.9126542045900217);
  camera.rotation.set(-3.047493474219677, -0.04584905340038268, -3.137267058875789);

      center2.add( mirrorMesh );
      render();
    center2.direction = 1;
    var time;
    function render() {
      groundMirror.render();
      renderer.render( scene, camera );
     TWEEN.update();
     if (manual){
       camera.lookAt(center2.position);
     }
      if (rendering){
        animationFrame = requestAnimationFrame(render);
      }
    }

/**/

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	// composer.setSize( window.innerWidth, window.innerHeight );
}

//
window.addEventListener( 'resize', onWindowResize, false );
