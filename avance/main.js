import * as THREE from 'three';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//camera.position.set(0, 3, 5); // Ajusta la posición de la cámara (x, y, z) según tus necesidades
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

cube.position.set(0, 30, 0); // Reemplaza x, y, z con las coordenadas deseadas

group.add( cube );

var cubeBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
cubeBB.setFromObject(cube);

//esfera
const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
const material2 = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube2 = new THREE.Mesh( geometry2, material2 );

group.add( cube2 );
cube2.position.x=-5;

var cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
cube2BB.setFromObject(cube2);
group.add( cube2 );


//cono 
const geometry_cono = new THREE.ConeGeometry( 5, 20, 32 ); 
const material_cono = new THREE.MeshPhongMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh(geometry_cono, material_cono ); 
group.add( cone );
var cube4BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
cube4BB.setFromObject(cone);

cone.scale.copy(new THREE.Vector3(0.05, 0.05, 0.05));
cone.position.z=-5;
cone.position.x=0;


const geometry4 = new THREE.BoxGeometry( 1, 1, 1 );
const material4 = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube4 = new THREE.Mesh( geometry4, material4 );

group.add( cube4 );
cube4.position.x=+8;

var cube4BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
cube4BB.setFromObject(cube4);


//cilindro
const geometry_C = new THREE.CylinderGeometry( 5, 5, 20, 32 ); 
const material_c = new THREE.MeshPhongMaterial( {color: 0xffff00} ); 
const cylinder = new THREE.Mesh( geometry_C, material_c );
 group.add( cylinder );

cylinder.scale.copy(new THREE.Vector3(0.05, 0.05, 0.05));
cylinder.position.x= 2;
camera.position.z = 5;
var bandera = false;
var regreso = false;

var cube3BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
cube3BB.setFromObject(cylinder);


const al = new THREE.AmbientLight(0xffffff, 0.3);
group.add(al);


const dl = new THREE.DirectionalLight( 0xffffff, 0.6);
dl.position.set(0,5,0);
const dlhelper = new THREE.DirectionalLightHelper(dl,5);
group.add(dl, dlhelper);


const sl = new THREE.SpotLight(0xffffff,3,5,Math.PI/8,0);
sl.position.set(0,2,0);
const SpotLightHelper = new THREE.SpotLightHelper(sl);
group.add(sl,SpotLightHelper);


const pl = new THREE.PointLight(0xffffff, 3, 10 ,0);
pl.position.set(-5,-3,0);
const pointlightHelper = new THREE.PointLightHelper(pl);
group.add(pl, pointlightHelper);

scene.add(group);

var esta_logeado = false;
camera.rotation.x += rotationSpeed;
Modelos3D();


const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load('media/fondogw.jpg'); // Ruta de la primera textura
const texture2 = textureLoader.load('media/grass_tex.jpg'); 
const texture3 = textureLoader.load('media/fondogw.jpg'); 
const texture4 = textureLoader.load('media/fondogw.jpg'); 
const texture5 = textureLoader.load('media/fondogw.jpg'); 


const greenMaterial1 = new THREE.MeshPhongMaterial({ map: texture1 });
const greenMaterial2 = new THREE.MeshPhongMaterial({ map: texture2 });
const greenMaterial3 = new THREE.MeshPhongMaterial({ map: texture3 });
const greenMaterial4 = new THREE.MeshPhongMaterial({ map: texture4 });
const greenMaterial5 = new THREE.MeshPhongMaterial({ map: texture5 });


const greenPlaneGeometry = new THREE.PlaneGeometry(100, 100); // Ajusta el tamaño del plano 
const greenPlane1 = new THREE.Mesh(greenPlaneGeometry, greenMaterial1);
const greenPlane2 = new THREE.Mesh(greenPlaneGeometry, greenMaterial2);
const greenPlane3 = new THREE.Mesh(greenPlaneGeometry, greenMaterial3);
const greenPlane4 = new THREE.Mesh(greenPlaneGeometry, greenMaterial4);
const greenPlane5 = new THREE.Mesh(greenPlaneGeometry, greenMaterial5);




// Cambiar posición y rotación del primer plano
greenPlane1.position.set(0, -10, -25); // Cambia las coordenadas x, y, z 
greenPlane1.rotation.set(THREE.MathUtils.degToRad(0), 0, 0); // Cambia los ángulos de rotación 

// Cambiar posición y rotación del segundo plano (paralelo al primero)
greenPlane2.position.set(0, -10, 10); // Ajusta la posición para que sea paralelo al primer plano
greenPlane2.rotation.set(THREE.MathUtils.degToRad(180), 0, 0); // Iguala la rotación al primer plano

greenPlane3.position.set(-25, -10, 20); 
greenPlane3.rotation.set(THREE.MathUtils.degToRad(0), 90, 0); 

greenPlane4.position.set(25, -10, 20); 
greenPlane4.rotation.set(THREE.MathUtils.degToRad(0), -90, 0); 

greenPlane5.position.set(0, -10, 50); 
greenPlane5.rotation.set(THREE.MathUtils.degToRad(0), 0, 0); 

scene.add(greenPlane1, greenPlane2, greenPlane3, greenPlane4, greenPlane5); 





//FUNCIONES//
function Colisiones(){
	
	if(cubeBB.intersectsBox(cube2BB)){
		dl.intensity-=0.01;
		sl.intensity-=0.01;
		pl.intensity-=0.01;
		
	}
	
	if(cubeBB.intersectsBox(cube4BB)){
		
	
		cube4.position.x=20;
	}
	
		if(cubeBB.intersectsBox(cube3BB)){
			vida-=20;
			console.log("colision");
			console.log("vida: " +vida);
			move=false;
			cube2.position.y = 100;
			camera.position.z+=1;
		}else{
			move=true;
		}
}
function animate() {
	
	

	requestAnimationFrame( animate );

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
	cube.position.x = camera.position.x;
	cube.position.z = camera.position.z - 2 ;
	cube.position.y = -1 ;

	cubeBB.copy(cube.geometry.boundingBox).applyMatrix4(cube.matrixWorld);
	Colisiones();
	

if(cone.position.y > 1)
{

	cone.position.x -= 0.01;
}

if(cone.position.x < -1){

cone.position.y -= 0.01;

if(cone.position.y < -1){
var entrar = true;
}
}

if(cone.position.y< -1 && cone.position.x < 1){
cone.position.x += 0.01;
	
}


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
	alert("POSICION:" +camera.position.x + "," + camera.position.z);
	
}
if(tecla=='a'||tecla=='A'){
	camera.position.x--;
}
if(tecla=='d'||tecla=='D'){
	camera.position.x++;
}
if(tecla=='w'||tecla=='W'){
	camera.position.z -=0.1;
}
if(tecla=='s'||tecla=='S'){
	camera.position.z +=0.1;
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

  const flower1 = new OBJLoader(manager);
  var mtlflower1 = new MTLLoader(manager);

 

mtlflower1.load('models/flower1.mtl',function (materials){

	materials.preload();

	flower1.setMaterials(materials);

	flower1.load('models/flower1.obj',

		function ( object ) {

      object.scale.copy( new THREE.Vector3(1,1,1));
	  object.position.x =0.0;
	  object.position.y =0.0;
	  object.position.z =0.0;
	

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


/*
	
cone.rotation.x += 0.01;
cone.rotation.y += 0.0;
//REBOTE
if(bandera == true){
	
if(cylinder.position.y<5){

	cylinder.position.y += 0.2;
}
else{
	bandera = false;
}
}
else{

	if(cylinder.position.y >0){

		cylinder.position.y -=0.5;
	}else{
		bandera = true;
		
	}

}

if(cylinder.position.x < 6 && regreso == false){
	cylinder.position.x += 0.01;
	if(cylinder.position.x > 6){
		regreso = true;
	}
}
if(regreso==true){
	cylinder.position.x -= 0.01;
	if(cylinder.position.x < 2){
	regreso=false;
	}
}


//RECORRIDO
if(esfera.position.x < -3){
esfera.position.x +=0.01;
pl.position.x +=0.01;
}
if(esfera.position.x > -3){

	esfera.position.x = -5;
	pl.position.x =-5;
}
=

//ROTACION
if(cone.position.x == 1){
	cone.position.y += 0.01;
}*/