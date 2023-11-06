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
const al = new THREE.AmbientLight(0xffffff, 0.5);
group.add(al);

const dl = new THREE.DirectionalLight( 0xffffff, 0.6);
dl.position.set(0,-49,30);
const dlhelper = new THREE.DirectionalLightHelper(dl,5);
group.add(dl, dlhelper);

const sl = new THREE.SpotLight(0xffffff,3,5,Math.PI/8,0);
sl.position.set(15,-58,35);
const SpotLightHelper = new THREE.SpotLightHelper(sl);
group.add(sl,SpotLightHelper);

const pl = new THREE.PointLight(0xfff78f, 8, 100 ,0);
pl.position.set(0,-30,20);//centro
const pointlightHelper = new THREE.PointLightHelper(pl);
group.add(pl, pointlightHelper);
scene.add(group);

var esta_logeado = false;
camera.rotation.x += rotationSpeed;

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

//---------------------------------------Modelos-------------------------------------------------------

//domo
const domo = new OBJLoader(manager);
var mtldomo = new MTLLoader(manager);
//Suelo
const Suelo = new OBJLoader(manager);
var mtlSuelo = new MTLLoader(manager);
//Tractores
const trac1 = new OBJLoader(manager);
var mtltrac1 = new MTLLoader(manager);
let object1;
const trac2 = new OBJLoader(manager);
var mtltrac2 = new MTLLoader(manager);
let object2;
//Arbol1
const arbol1 = new OBJLoader(manager);
var mtlarbol1 = new MTLLoader(manager);
const arbol2 = new OBJLoader(manager);
var mtlarbol2 = new MTLLoader(manager);
//rocas de fondo
const roca1 = new OBJLoader(manager);
var mtlroca1 = new MTLLoader(manager);
const roca2 = new OBJLoader(manager);
var mtlroca2 = new MTLLoader(manager);
//segundas rocas
const pilar = new OBJLoader(manager);
var mtlpilar = new MTLLoader(manager);
const pilar2 = new OBJLoader(manager);
var mtlpilar2 = new MTLLoader(manager);
//arboles
const arboles = new OBJLoader(manager);
var mtlarboles = new MTLLoader(manager);
const arboles2 = new OBJLoader(manager);
var mtlarboles2 = new MTLLoader(manager);


mtlarboles2.load('models/Arbol1/Arboles.mtl',function (materials){

	materials.preload();

	arboles2.setMaterials(materials);

	arboles2.load('models/Arbol1/Arboles.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(1.3, 1.3, 1.3));
			object.position.set(27, -60, 30);
			object.rotation.y = 1;
			scene.add(object);
		});

	console.log(materials);
});

mtlarboles.load('models/Arbol1/Arboles.mtl',function (materials){

	materials.preload();

	arboles.setMaterials(materials);

	arboles.load('models/Arbol1/Arboles.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(1.3, 1.3, 1.3));
			object.position.set(-29, -60, 30);
			object.rotation.y = 0.6;
			scene.add(object);
		});

	console.log(materials);
});

mtlpilar2.load('models/RocksLowPoly_Obj/roca_fondo2.mtl',function (materials){

	materials.preload();

	pilar2.setMaterials(materials);

	pilar2.load('models/RocksLowPoly_Obj/roca_fondo2.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.6, 0.6, 0.6));
			object.position.set(39, -60, 16);
			object.rotation.y = -1;
			scene.add(object);
		});

	console.log(materials);
});

mtlpilar.load('models/RocksLowPoly_Obj/roca_fondo2.mtl',function (materials){

	materials.preload();

	pilar.setMaterials(materials);

	pilar.load('models/RocksLowPoly_Obj/roca_fondo2.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.6, 0.6, 0.6));
			object.position.set(-36, -60, 16);
			object.rotation.y = -1;
			scene.add(object);
		});

	console.log(materials);
});

mtlroca2.load('models/RocksLowPoly_Obj/roca_fondo.mtl',function (materials){

	materials.preload();

	roca2.setMaterials(materials);

	roca2.load('models/RocksLowPoly_Obj/roca_fondo.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(1, 1, 1));
			object.position.set(24, -60, 0);
			object.rotation.y = -1;
			scene.add(object);
		});

	console.log(materials);
});

mtlroca1.load('models/RocksLowPoly_Obj/roca_fondo.mtl',function (materials){

	materials.preload();

	roca1.setMaterials(materials);

	roca1.load('models/RocksLowPoly_Obj/roca_fondo.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(1, 1, 1));
			object.position.set(-15, -60, 0);
			object.rotation.y = 0.2;
			scene.add(object);
		});

	console.log(materials);
});

mtlarbol2.load('models/Arbol1/Arbol1.mtl',function (materials){

	materials.preload();

	arbol2.setMaterials(materials);

	arbol2.load('models/Arbol1/Arbol1.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(2, 2, 2));
			object.position.set(-15, -60, 19);
			object.rotation.y = 0;
			scene.add(object);
		});

	console.log(materials);
});

mtlarbol1.load('models/Arbol1/Arbol1.mtl',function (materials){

	materials.preload();

	arbol1.setMaterials(materials);

	arbol1.load('models/Arbol1/Arbol1.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(2, 2, 2));
			object.position.set(-11, -60, 15);
			object.rotation.y = 0;
			scene.add(object);
		});

	console.log(materials);
});

mtltrac1.load('models/Tractor/Tractor.mtl',function (materials){

	materials.preload();

	trac1.setMaterials(materials);

	trac1.load('models/Tractor/Tractor.obj',

		function ( object ) {
			object1=object;
			object1.scale.copy(new THREE.Vector3(0.12, 0.12, 0.12));
			object1.position.set(-11, -60, 35);
			object1.rotation.y = 98.8;
			scene.add(object1);
		});

	console.log(materials);
});

mtltrac2.load('models/Tractor/Tractor2.mtl',function (materials){

	materials.preload();

	trac2.setMaterials(materials);

	trac2.load('models/Tractor/Tractor2.obj',

		function ( object ) {
			object2=object;
      object2.scale.copy( new THREE.Vector3(0.12, 0.12, 0.12));
	  object2.position.set(9, -60, 35);
	  object2.rotation.y =98.8;
	   scene.add( object2 );

});

	console.log(materials);
});

mtlSuelo.load('models/suelo/suelo2.mtl',function (materials){

	materials.preload();

	Suelo.setMaterials(materials);

	Suelo.load('models/suelo/suelo2.obj',

		function ( object ) {

      object.scale.copy( new THREE.Vector3(5,5,5));
	  object.position.x =0;
	  object.position.y =-66.5;
	  object.position.z =0;
	
	

			scene.add( object );

		});

	console.log(materials);
});
  

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

});

//-----------------------------------------FUNCIONES--------------------------------------------------------
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
	alert("POSICION:" +object1.position.x + "," + object1.position.z);
}

//Jugador 1
if(tecla=='a'||tecla=='A'){
	//cube.position.x--;
	if (object1) {
		object1.position.x-=0.7;
		object1.rotation.y=270;
	} 
}
if(tecla=='d'||tecla=='D'){
	//cube.position.x++;
	if (object1) {
		object1.position.x+=0.7;
		object1.rotation.y=110;
	} 
}
if(tecla=='w'||tecla=='W'){
	//cube.position.z--;
	if (object1) {
		object1.position.z-=0.7;
		object1.rotation.y=98.8;
	} 
}
if(tecla=='s'||tecla=='S'){
	//cube.position.z ++;
	if (object1) {
		object1.position.z+=0.7;
		object1.rotation.y=20.41;
	} 
}

//Jugador 2
if(tecla=='j'||tecla=='J'){
	//cube.position.x--;
	if (object2) {
		object2.position.x-=0.7;
		object2.rotation.y=270;
	} 
}
if(tecla=='l'||tecla=='L'){
	//cube.position.x++;
	if (object2) {
		object2.position.x+=0.7;
		object2.rotation.y=110;
	} 
}
if(tecla=='i'||tecla=='I'){
	//cube.position.z--;
	if (object2) {
		object2.position.z-=0.7;
		object2.rotation.y=98.8;
	} 
}
if(tecla=='k'||tecla=='K'){
	//cube.position.z ++;
	if (object2) {
		object2.position.z+=0.7;
		object2.rotation.y=20.41;
	} 
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
