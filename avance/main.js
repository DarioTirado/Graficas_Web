import * as THREE from 'three';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, -49, 50); // Ajusta la posición de la cámara (x, y, z) según tus necesidades
var move = true;
var vida=100;
const rotationSpeed = -0.50;

const manager = new THREE.LoadingManager();

manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onLoad = function ( ) {

	console.log( 'Loading complete!');

};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onError = function ( url ) {

	console.log( 'There was an error loading ' + url );

};


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const group = new THREE.Group();

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(0, -49, 50); 
group.add( cube );



//LUCES//
const al = new THREE.AmbientLight(0xffffff, 0.3);
group.add(al);

const dl = new THREE.DirectionalLight( 0xffffff, 0.6);
dl.position.set(0,-49,30);
const dlhelper = new THREE.DirectionalLightHelper(dl,5);
group.add(dl, dlhelper);

const sl = new THREE.SpotLight(0xffffff,3,5,Math.PI/8,0);
sl.position.set(15,-58,35);
const SpotLightHelper = new THREE.SpotLightHelper(sl);
group.add(sl,SpotLightHelper);

const pl = new THREE.PointLight(0xd88d2c, 10, 50 ,0);
pl.position.set(0,-59,10);
const pointlightHelper = new THREE.PointLightHelper(pl);
group.add(pl, pointlightHelper);

scene.add(group);

var esta_logeado = false;
camera.rotation.x += rotationSpeed;
Modelos3D();

//HORIZONTE//
const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load('media/fondogw.jpg'); // Ruta de la primera textura
const texture2 = textureLoader.load('media/grass_tex.jpg'); 
const texture3 = textureLoader.load('media/fondogw.jpg'); 
const texture4 = textureLoader.load('media/fondogw.jpg'); 
//const texture5 = textureLoader.load('media/fondogw.jpg'); 


const greenMaterial1 = new THREE.MeshPhongMaterial({ map: texture1 });
const greenMaterial2 = new THREE.MeshPhongMaterial({ map: texture2 });
//const greenMaterial3 = new THREE.MeshPhongMaterial({ map: texture3 });
//const greenMaterial4 = new THREE.MeshPhongMaterial({ map: texture4 });
//const greenMaterial5 = new THREE.MeshPhongMaterial({ map: texture5 });


const greenPlaneGeometry = new THREE.PlaneGeometry(100, 100); // Ajusta el tamaño del plano 
const greenPlane1 = new THREE.Mesh(greenPlaneGeometry, greenMaterial1);
const greenPlane2 = new THREE.Mesh(greenPlaneGeometry, greenMaterial2);
//const greenPlane3 = new THREE.Mesh(greenPlaneGeometry, greenMaterial3);
//const greenPlane4 = new THREE.Mesh(greenPlaneGeometry, greenMaterial4);
//const greenPlane5 = new THREE.Mesh(greenPlaneGeometry, greenMaterial5);




// Cambiar posición y rotación del primer plano
greenPlane1.position.set(0, -10, -25); // Cambia las coordenadas x, y, z 
greenPlane1.rotation.set(THREE.MathUtils.degToRad(0), 0, 0); // Cambia los ángulos de rotación 

// Cambiar posición y rotación del segundo plano (paralelo al primero)
greenPlane2.position.set(0, -10, 10); // Ajusta la posición para que sea paralelo al primer plano
greenPlane2.rotation.set(THREE.MathUtils.degToRad(180), 0, 0); // Iguala la rotación al primer plano

//greenPlane3.position.set(-25, -10, 20); 
//greenPlane3.rotation.set(THREE.MathUtils.degToRad(0), 90, 0); 

//greenPlane4.position.set(25, -10, 20); 
//greenPlane4.rotation.set(THREE.MathUtils.degToRad(0), -90, 0); 

//greenPlane5.position.set(0, -10, 50); 
//greenPlane5.rotation.set(THREE.MathUtils.degToRad(0), 0, 0); 

scene.add(greenPlane1, greenPlane2); 





//FUNCIONES//
function Colisiones(){
	

}
function animate() {
	
	

	requestAnimationFrame( animate );

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;


	

	renderer.render( scene, camera );
	

}

$(document).ready(function() {
	animate();

 $("#btnIniciar").on("click",iniciarSesion);

 $(document).keypress(function(e){

var tecla = String.fromCharCode(e.which);

const toggleButton = document.getElementById("toggleButton");
const hiddenText = document.getElementById("hiddenText");


if(tecla=='p'||tecla=='P'){
	alert("POSICION:" +cube.position.x + "," + cube.position.z);
	
}
if(tecla=='a'||tecla=='A'){
	cube.position.x--;
}
if(tecla=='d'||tecla=='D'){
	cube.position.x++;
}
if(tecla=='w'||tecla=='W'){
	cube.position.z--;
}
if(tecla=='s'||tecla=='S'){
	cube.position.z ++;
}
if(tecla=='c'||tecla=='C' ){
	if(al.intensity<1)
	al.intensity +=0.1;
	//$('canvas').hide();
//	hiddenText.classList.add("hidden");
}

if(tecla=='v'||tecla=='V'){
	if(al.intensity>0)
	al.intensity -=0.1;
	//$('canvas').show();
	//hiddenText.classList.remove("hidden");
}

 });


});

function Modelos3D(){
//CASA//    											LUEGO HAGO LA FUNCION PARA MANDARLE SOLO LOS VALORES
const granja = new OBJLoader(manager);
var mtlGarnja = new MTLLoader(manager);
// Molino
  const Molino = new OBJLoader(manager);
  var mtlMolino = new MTLLoader(manager);
//Suelo
const Suelo = new OBJLoader(manager);
var mtlSuelo = new MTLLoader(manager);
//Cultivo1
const cultivo1 = new OBJLoader(manager);
var mtlcultivo1 = new MTLLoader(manager);
//cultivo2
const cultivo2 = new OBJLoader(manager);
var mtlcultivo2 = new MTLLoader(manager);
const cultivo22 = new OBJLoader(manager);
var mtlcultivo22 = new MTLLoader(manager);
//montañas
const mount = new OBJLoader(manager);
var mtlmount = new MTLLoader(manager);
const mount2 = new OBJLoader(manager);
var mtlmount2 = new MTLLoader(manager);
//Tractores
const trac1 = new OBJLoader(manager);
var mtltrac1 = new MTLLoader(manager);
const trac2 = new OBJLoader(manager);
var mtltrac2 = new MTLLoader(manager);


mtltrac1.load('models/Tractor/Tractor.mtl',function (materials){

	materials.preload();

	trac1.setMaterials(materials);

	trac1.load('models/Tractor/Tractor.obj',

		function ( object ) {

      object.scale.copy( new THREE.Vector3(0.2,0.2,0.2));
	  object.position.x =2;
	  object.position.y =-60;
	  object.position.z =30;
	  object.rotation.y =98.8;
	 

			scene.add( object );

		});

	console.log(materials);
});

mtltrac2.load('models/Tractor/Tractor2.mtl',function (materials){

	materials.preload();

	trac2.setMaterials(materials);

	trac2.load('models/Tractor/Tractor2.obj',

		function ( object ) {

      object.scale.copy( new THREE.Vector3(0.2,0.2,0.2));
	  object.position.x =2;
	  object.position.y =-60;
	  object.position.z =15;
	  object.rotation.y =98.8;
	 

			scene.add( object );

		});

	console.log(materials);
});

mtlcultivo2.load('models/Cultivo2/cultivo2.mtl',function (materials){

	materials.preload();

	cultivo2.setMaterials(materials);

	cultivo2.load('models/Cultivo2/cultivo2.obj',

		function ( object ) {

      object.scale.copy( new THREE.Vector3(0.2,0.2,0.2));
	  object.position.x =2;
	  object.position.y =-60;
	  object.position.z =40;
	  object.rotation.y =99;
	 

			scene.add( object );

		});

	console.log(materials);
});

mtlmount2.load('models/Mount/mount.mtl',function (materials){

	materials.preload();

	mount2.setMaterials(materials);

	mount2.load('models/Mount/mount.obj',

		function ( object ) {

      object.scale.copy( new THREE.Vector3(5,5,5));
	  object.position.x =64;
	  object.position.y =-60;
	  object.position.z =-35;
	  object.rotation.y =116.33;
	 

			scene.add( object );

		});

	console.log(materials);
});

mtlmount.load('models/Mount/mount.mtl',function (materials){

	materials.preload();

	mount.setMaterials(materials);

	mount.load('models/Mount/mount.obj',

		function ( object ) {

      object.scale.copy( new THREE.Vector3(5,5,5));
	  object.position.x =-69;
	  object.position.y =-60;
	  object.position.z =-48;
	  object.rotation.y =116.33;
	 

			scene.add( object );

		});

	console.log(materials);
});

mtlcultivo2.load('models/Cultivo2/cultivo2.mtl',function (materials){

	materials.preload();

	cultivo2.setMaterials(materials);

	cultivo2.load('models/Cultivo2/cultivo2.obj',

		function ( object ) {

      object.scale.copy( new THREE.Vector3(0.2,0.2,0.2));
	  object.position.x =-12;
	  object.position.y =-60;
	  object.position.z =30;
	  object.rotation.y =116.33;
	 

			scene.add( object );

		});

	console.log(materials);
});
 
mtlcultivo1.load('models/Cultivo1/cultivo1.mtl',function (materials){

	materials.preload();

	cultivo1.setMaterials(materials);

	cultivo1.load('models/Cultivo1/cultivo1.obj',

		function ( object ) {

      object.scale.copy( new THREE.Vector3(0.3,0.3,0.3));
	  object.position.x =15;
	  object.position.y =-60;
	  object.position.z =15;
	  object.rotation.y =116.1;
	 

			scene.add( object );

		});

	console.log(materials);
});

mtlSuelo.load('models/suelo/suelo.mtl',function (materials){

	materials.preload();

	Suelo.setMaterials(materials);

	Suelo.load('models/suelo/suelo.obj',

		function ( object ) {

      object.scale.copy( new THREE.Vector3(5,5,5));
	  object.position.x =0;
	  object.position.y =-66.5;
	  object.position.z =0;
	
	

			scene.add( object );

		});

	console.log(materials);
});
  
mtlGarnja.load('models/granja/Farm.mtl',function (materials){

	materials.preload();

	granja.setMaterials(materials);

	granja.load('models/granja/Farm.obj',

		function ( object ) {

      object.scale.copy( new THREE.Vector3(0.2,0.2,0.2));
	  object.position.x =15;
	  object.position.y =-60;
	  object.position.z =35;
	  object.rotation.y =116.1;
	

			scene.add( object );

		});

	console.log(materials);
});
 

mtlMolino.load('models/Molino/Molino.mtl',function (materials){

	materials.preload();

	Molino.setMaterials(materials);

	Molino.load('models/Molino/Molino.obj',

		function ( object ) {

      object.scale.copy( new THREE.Vector3(0.2,0.2,0.2));
	  object.position.x =-20;
	  object.position.y =-60;
	  object.position.z =10;
	  object.rotation.y =116.1;
	

			scene.add( object );

		});

	console.log(materials);
});

//obj2

const tree = new OBJLoader(manager);
var mtltree = new MTLLoader(manager);



mtltree.load('models/Tree.mtl',function (materials){

  materials.preload();

  tree.setMaterials(materials);

  tree.load('models/Tree.obj',

	  function ( object ) {

	object.scale.copy( new THREE.Vector3(0.01,0.01,0.01));
	object.position.x =10;
	object.position.y =0.0;
	object.position.z =0.0;
  

		  scene.add( object );

	  });

  console.log(materials);
	});

//obj3

const planta = new OBJLoader(manager);
var mtlplanta = new MTLLoader(manager);



mtlplanta.load('models/planta.mtl',function (materials){

  materials.preload();

  planta.setMaterials(materials);

  planta.load('models/planta.obj',

	  function ( object ) {

	//object.scale.copy( new THREE.Vector3(1,1,1));
	object.position.x =-10;
	object.position.y =0.0;
	object.position.z =0.0;
  

		  scene.add( object );

	  });

  console.log(materials);
	})

}

function iniciarSesion(nombre, contra){
alert(nombre, contra);
$.get("http://localhost/WebServices/WebServices.php",{nombreUsuario: nombre,contra: contra},function(data){

if(data!=''){
	alert(data);
//animate();
alert("Conectado");
}


})

}
