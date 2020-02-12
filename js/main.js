$(function() {
  var scene;
  var camera;
  var renderer;

  const initScene = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // drawFrog();
    drawGrass();
    drawRoad();
    drawVehicle(0,0,0);
    drawTrees();

    camera.position.z = 5;
  };

  const animate = function() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  };

  const drawTrees = () => {
    const treeZ = -10;

    const treeNumber = 20;

    for(var treeCount = -treeNumber; treeCount < treeNumber ; treeCount++ ){
        drawTree(treeCount, 0, treeZ);
    }
  };

  const drawFrog = () => {
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.z = 0;
  };

  const drawGrass = () => {};

  const drawRoad = () => {};

  const drawVehicle = (vehicleX, vehicleY, vehicleZ) => {
    const vehicleWidth = 3;
    const vehicleHeight = 1;
    // Draw body
    var geometry = new THREE.BoxGeometry(vehicleWidth,vehicleHeight,1);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var body = new THREE.Mesh(geometry, material);
    scene.add(body);

    const tyreRadius = 0.5;

    body.position.x = vehicleX;
    body.position.y = vehicleY + tyreRadius;
    body.position.z = vehicleZ;
    const wheelOffset = vehicleWidth /2 - (tyreRadius /2 );
    drawTyre(tyreRadius, vehicleX + wheelOffset, vehicleY, vehicleZ );
    drawTyre(tyreRadius, vehicleX - wheelOffset, vehicleY, vehicleZ );
  };

  const drawTyre = (tyreRadius, tyreX, tyreY, tyreZ) => {
    const height = 0.1;
    const segments = 32;

    var cylinderGeometry = new THREE.CylinderGeometry(
        tyreRadius,
        tyreRadius,
        height,
        segments
      );
      var cyinderMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      var cylinder = new THREE.Mesh(cylinderGeometry, cyinderMaterial);
      scene.add(cylinder);

      cylinder.position.x = tyreX;
      cylinder.position.y = tyreY;
      cylinder.position.z = tyreZ;
      
      cylinder.rotation.x = Math.PI / 2

  };

  const drawTree = (treeX, treeY, treeZ) => {
    const trunkHeight = 1;

    var geometry = new THREE.ConeGeometry(0.5, 1, 6);
    var material = new THREE.MeshBasicMaterial({ color: 0x059142 });
    var cone = new THREE.Mesh(geometry, material);
    scene.add(cone);

    var cylinderGeometry = new THREE.CylinderGeometry(
      0.1,
      0.1,
      trunkHeight,
      32
    );
    var cyinderMaterial = new THREE.MeshBasicMaterial({ color: 0x3f301d });
    var cylinder = new THREE.Mesh(cylinderGeometry, cyinderMaterial);
    scene.add(cylinder);

    cone.position.x = treeX;
    cone.position.y = trunkHeight + treeY;
    cone.position.z = treeZ;

    cylinder.position.x = treeX;
    cylinder.position.y = treeY;
    cylinder.position.z = treeZ;
  };

  initScene();
  animate();
});
