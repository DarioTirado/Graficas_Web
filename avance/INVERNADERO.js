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


var tractor_posicion = new THREE.Vector3(-11, -60, 35);
var tractor_obj = new THREE.Object3D();

//Cubos de colision
const group = new THREE.Group();

const geometry_cube_tractor = new THREE.BoxGeometry( 2.3, 2.3, 2.3 );
const material_cube_tractor = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube_tractor = new THREE.Mesh( geometry_cube_tractor, material_cube_tractor );
cube_tractor.position.set(tractor_posicion.x, tractor_posicion.y, tractor_posicion.z);
var cube_tractor_col = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
cube_tractor_col.setFromObject(cube_tractor);
cube_tractor.visible = false;
group.add( cube_tractor );

var tractor2_posicion = new THREE.Vector3(9, -60, 35);
var tractor2_obj = new THREE.Object3D();
const geometry_cube_tractor2 = new THREE.BoxGeometry( 2.3, 2.3, 2.3 );
const material_cube_tractor2 = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube_tractor2 = new THREE.Mesh( geometry_cube_tractor2, material_cube_tractor2 );
cube_tractor2.position.set(tractor2_posicion.x, tractor2_posicion.y, tractor2_posicion.z);
var cube_tractor2_col = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
cube_tractor2_col.setFromObject(cube_tractor2);
cube_tractor2.visible = false;
group.add( cube_tractor2 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



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

const pl = new THREE.PointLight(0xffffff, 1.7, 50 ,0);
pl.position.set(0,-59,20);//centro
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
//tomates
const tomates = new OBJLoader(manager);
var mtltomates = new MTLLoader(manager);
const tomates1 = new OBJLoader(manager);
var mtltomates1 = new MTLLoader(manager);
const tomates2 = new OBJLoader(manager);
var mtltomates2 = new MTLLoader(manager);
//maceta
const maceta = new OBJLoader(manager);
var mtlmaceta = new MTLLoader(manager);
const maceta1 = new OBJLoader(manager);
var mtlmaceta1 = new MTLLoader(manager);
const maceta2 = new OBJLoader(manager);
var mtlmaceta2 = new MTLLoader(manager);
const maceta3 = new OBJLoader(manager);
var mtlmaceta3 = new MTLLoader(manager);
const maceta4 = new OBJLoader(manager);
var mtlmaceta4 = new MTLLoader(manager);
const maceta5 = new OBJLoader(manager);
var mtlmaceta5 = new MTLLoader(manager);
//mesa
const mesa = new OBJLoader(manager);
var mtlmesa = new MTLLoader(manager);
const mesa1 = new OBJLoader(manager);
var mtlmesa1 = new MTLLoader(manager);
//Cplantasmaceta
const Cplantasmaceta = new OBJLoader(manager);
var mtlCplantasmacet = new MTLLoader(manager);
const Cplantasmaceta2 = new OBJLoader(manager);
var mtlCplantasmacet2 = new MTLLoader(manager);
const Cplantasmaceta3 = new OBJLoader(manager);
var mtlCplantasmacet3 = new MTLLoader(manager);
//plantas_nuevas
const plan1 = new OBJLoader(manager);
var mtlplan1 = new MTLLoader(manager);
const plan2 = new OBJLoader(manager);
var mtlplan2 = new MTLLoader(manager);
//Colisiones_variables
var direccion_tractor;
var move_tractor_izquierda = true;
var move_tractor_derecha = true;
var move_tractor_arriba = true;
var move_tractor_abajo = true;
var direccion_tractor2;
var move_tractor2_izquierda = true;
var move_tractor2_derecha = true;
var move_tractor2_arriba = true;
var move_tractor2_abajo = true;

mtlmesa1.load('models/Mesa/mesa.mtl',function (materials){

	materials.preload();

	mesa1.setMaterials(materials);

	mesa1.load('models/Mesa/mesa.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.8, 0.8, 0.8));
			object.position.set(-19, -60, 38);
			object.rotation.y = 0;
			scene.add(object);
		});

	console.log(materials);
});

mtlplan1.load('models/Plantas_Nuevas/planta2.mtl',function (materials){

	materials.preload();

	plan1.setMaterials(materials);

	plan1.load('models/Plantas_Nuevas/planta2.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.6, 0.6, 0.6));
			object.position.set(3, -60, 42);
			object.rotation.y = 1.5;
			scene.add(object);
		});

	console.log(materials);
});

mtlplan1.load('models/Plantas_Nuevas/planta1.mtl',function (materials){

	materials.preload();

	plan1.setMaterials(materials);

	plan1.load('models/Plantas_Nuevas/planta1.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.6, 0.6, 0.6));
			object.position.set(-19, -60, 32);
			object.rotation.y = 1.5;
			scene.add(object);
		});

	console.log(materials);
});

mtlCplantasmacet3.load('models/PlantaMaceta/CplantaMaceta.mtl',function (materials){

	materials.preload();

	Cplantasmaceta3.setMaterials(materials);

	Cplantasmaceta3.load('models/PlantaMaceta/CplantaMaceta.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.6, 0.6, 0.6));
			object.position.set(-4, -60, 45);
			object.rotation.y = 1.5;
			scene.add(object);
		});

	console.log(materials);
});

mtlCplantasmacet2.load('models/PlantaMaceta/CplantaMaceta.mtl',function (materials){

	materials.preload();

	Cplantasmaceta2.setMaterials(materials);

	Cplantasmaceta2.load('models/PlantaMaceta/CplantaMaceta.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.9, 0.9, 0.9));
			object.position.set(-17, -60, 28);
			object.rotation.y = 1.5;
			scene.add(object);
		});

	console.log(materials);
});

mtlCplantasmacet.load('models/PlantaMaceta/CplantaMaceta.mtl',function (materials){

	materials.preload();

	Cplantasmaceta.setMaterials(materials);

	Cplantasmaceta.load('models/PlantaMaceta/CplantaMaceta.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.9, 0.9, 0.9));
			object.position.set(14, -60, 26);
			object.rotation.y = 1.5;
			scene.add(object);
		});

	console.log(materials);
});

mtlmesa.load('models/Mesa/mesa.mtl',function (materials){

	materials.preload();

	mesa.setMaterials(materials);

	mesa.load('models/Mesa/mesa.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.9, 0.9, 0.9));
			object.position.set(-2, -60, 16);
			object.rotation.y = 1.5;
			scene.add(object);
		});

	console.log(materials);
});

mtlmaceta5.load('models/Maceta/maceta.mtl',function (materials){

	materials.preload();

	maceta5.setMaterials(materials);

	maceta5.load('models/Maceta/maceta.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.1, 0.1, 0.1));
			object.position.set(-4, -60, 38);
			object.rotation.y = 0;
			scene.add(object);
		});

	console.log(materials);
});

mtlmaceta4.load('models/Maceta/maceta.mtl',function (materials){

	materials.preload();

	maceta4.setMaterials(materials);

	maceta4.load('models/Maceta/maceta.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.1, 0.1, 0.1));
			object.position.set(-4, -60, 40);
			object.rotation.y = 0;
			scene.add(object);
		});

	console.log(materials);
});

mtlmaceta3.load('models/Maceta/maceta.mtl',function (materials){

	materials.preload();

	maceta3.setMaterials(materials);

	maceta3.load('models/Maceta/maceta.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.1, 0.1, 0.1));
			object.position.set(-4, -60, 42);
			object.rotation.y = 0;
			scene.add(object);
		});

	console.log(materials);
});

mtlmaceta2.load('models/Maceta/maceta.mtl',function (materials){

	materials.preload();

	maceta2.setMaterials(materials);

	maceta2.load('models/Maceta/maceta.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.1, 0.1, 0.1));
			object.position.set(-2, -60, 38);
			object.rotation.y = 0;
			scene.add(object);
		});

	console.log(materials);
});

mtlmaceta1.load('models/Maceta/maceta.mtl',function (materials){

	materials.preload();

	maceta1.setMaterials(materials);

	maceta1.load('models/Maceta/maceta.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.1, 0.1, 0.1));
			object.position.set(-2, -60, 40);
			object.rotation.y = 0;
			scene.add(object);
		});

	console.log(materials);
});

mtlmaceta.load('models/Maceta/maceta.mtl',function (materials){

	materials.preload();

	maceta.setMaterials(materials);

	maceta.load('models/Maceta/maceta.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.1, 0.1, 0.1));
			object.position.set(-2, -60, 42);
			object.rotation.y = 0;
			scene.add(object);
		});

	console.log(materials);
});

mtltomates2.load('models/tomates/tomates.mtl',function (materials){

	materials.preload();

	tomates2.setMaterials(materials);

	tomates2.load('models/tomates/tomates.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.3, 0.3, 0.3));
			object.position.set(17, -60, 30);
			object.rotation.y = 0;
			scene.add(object);
		});

	console.log(materials);
});

mtltomates1.load('models/tomates/tomates.mtl',function (materials){

	materials.preload();

	tomates1.setMaterials(materials);

	tomates1.load('models/tomates/tomates.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.3, 0.3, 0.3));
			object.position.set(17, -60, 35);
			object.rotation.y = 0;
			scene.add(object);
		});

	console.log(materials);
});

mtltomates.load('models/tomates/tomates.mtl',function (materials){

	materials.preload();

	tomates.setMaterials(materials);

	tomates.load('models/tomates/tomates.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.3, 0.3, 0.3));
			object.position.set(17, -60, 40);
			object.rotation.y = 0;
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

mtldomo.load('models/dome/dome.mtl',function (materials){

	materials.preload();

	domo.setMaterials(materials);

	domo.load('models/dome/dome.obj',

		function ( object ) {
			object=object;
			object.scale.copy(new THREE.Vector3(0.3, 0.3, 0.3));
			object.position.set(0, -60, 35);
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
			tractor_obj = object;

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
	   tractor2_obj = object;

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

//-----------------------------------------FUNCIONES--------------------------------------------------------//

function formatTime(seconds) {
	const minutos = Math.floor(seconds / 60);
	const segundos = seconds % 60;
	return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
}

// Función para actualizar el contador de tiempo cada segundo
function actualizarContador() {
	tiempoTranscurrido--;
	document.getElementById('contadorTiempo').innerText = formatTime(tiempoTranscurrido);
}

// Inicialización del tiempo y configuración del intervalo
let tiempoTranscurrido = 20;
const intervalo = setInterval(actualizarContador, 1000);


function clearScene() {
    for (var i = 0; i < arrySphere.length; i++) {
        scene.remove(arrySphere[i]);
    }
    arrySphere = [];
}
//---------------------------OBJETOS RANDOM-------------------------//
var commonYPosition = -60;
var arrySphere = [];
var clock = new THREE.Clock();
var elapsedTime = 0;
var entro=true;
function generateRandomObject() {
	const zanahoria = new OBJLoader(manager);
var mtlzanahoria = new MTLLoader(manager);
for(var i = 0; i<5; i++){
mtlzanahoria.load('models/Vegetales/carrot.mtl',function (materials){

	materials.preload();

	zanahoria.setMaterials(materials);

	zanahoria.load('models/Vegetales/carrot.obj',

		function ( object2 )  {

      object2.scale.copy( new THREE.Vector3(0.2,0.2,0.2));
	  object2.position.x =-23;
	  object2.position.y =-60;
	  object2.position.z =40;
	  object2.rotation.y =110;


	object2.position.y=commonYPosition;
	
	object2.position.x=Math.floor(Math.random()*40-20);
	object2.position.z=Math.floor(Math.random()*40-5);
	
	object2.scale.copy(new THREE.Vector3(0.3,0.03,0.03));
	
	arrySphere.push(object2);
	scene.add( object2 );
	

	

});


console.log(materials);
});
}
}


function update() {
    var deltaTime = clock.getDelta();
    elapsedTime += deltaTime;

    // Verifica si ha pasado 7 segundos
	if(tiempoTranscurrido==0){
		alert("!!Se Acabo El Tiempo!!\n Gana:");
	}
    if (elapsedTime > 5) {
        // Si no ha pasado el tiempo límite, elimina los objetos existentes y genera nuevos objetos
		
		elapsedTime = 0;
		clearScene();
        generateRandomObject();

		if(elapsedTime>=5){
			entro=false;
		}

    } if(entro===false){
	
		clearScene();
        generateRandomObject();
       
    }

    // Llama a la función update en el próximo cuadro
    requestAnimationFrame(update);
}

// Llama a la función update para comenzar la actualización continua
update();







	


function animate() {

	
	//Jugador 1
	cube_tractor.position.x = tractor_posicion.x;
	cube_tractor.position.y = tractor_posicion.y;
	cube_tractor.position.z = tractor_posicion.z;

	tractor_obj.position.x = tractor_posicion.x;
	tractor_obj.position.y = tractor_posicion.y;
	tractor_obj.position.z = tractor_posicion.z;

	//Jugador 2
	cube_tractor2.position.x = tractor2_posicion.x;
	cube_tractor2.position.y = tractor2_posicion.y;
	cube_tractor2.position.z = tractor2_posicion.z;

	tractor2_obj.position.x = tractor2_posicion.x;
	tractor2_obj.position.y = tractor2_posicion.y;
	tractor2_obj.position.z = tractor2_posicion.z;

	cube_tractor_col.setFromObject(cube_tractor);
	cube_tractor_col.copy(cube_tractor.geometry.boundingBox).applyMatrix4(cube_tractor.matrixWorld);
	cube_tractor2_col.setFromObject(cube_tractor2);
	cube_tractor2_col.copy(cube_tractor2.geometry.boundingBox).applyMatrix4(cube_tractor2.matrixWorld);

	Colisiones();

	requestAnimationFrame( animate );
	

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
if((tecla=='a'||tecla=='A')&& move_tractor_izquierda){
	//cube.position.x--;
	tractor_posicion.x-=0.7;
	tractor_obj.rotation.y=270;
	direccion_tractor = "izquierda";
}
if((tecla=='d'||tecla=='D') && move_tractor_derecha){
	//cube.position.x++;
	tractor_posicion.x+=0.7;
	tractor_obj.rotation.y=110;
	direccion_tractor = "derecha";
}
if((tecla=='w'||tecla=='W')&& move_tractor_arriba){
	//cube.position.z--;
	tractor_posicion.z-=0.7;
	tractor_obj.rotation.y=98.8;
	direccion_tractor = "arriba";
}
if((tecla=='s'||tecla=='S')&& move_tractor_abajo){
	//cube.position.z ++;
	tractor_posicion.z+=0.7;
	tractor_obj.rotation.y=20.41;
	direccion_tractor = "abajo";
}

//Jugador 2
if(tecla=='o'||tecla=='O'){
	tractor2_posicion.x=9;
	tractor2_posicion.z=35;
	tractor2_obj.rotation.y=98.8;
	direccion_tractor2 = "arriba";
}
if((tecla=='j'||tecla=='J') && move_tractor2_izquierda){
	//cube.position.x--;
	tractor2_posicion.x-=0.7;
	tractor2_obj.rotation.y=270;
	direccion_tractor2 = "izquierda";
}
if((tecla=='l'||tecla=='L') && move_tractor2_derecha){
	//cube.position.x++;
	tractor2_posicion.x+=0.7;
	tractor2_obj.rotation.y=110;
	direccion_tractor2 = "derecha";
}
if((tecla=='i'||tecla=='I') && move_tractor2_arriba){
	//cube.position.z--;
	tractor2_posicion.z-=0.7;
	tractor2_obj.rotation.y=98.8;
	direccion_tractor2 = "arriba";
}
if((tecla=='k'||tecla=='K') && move_tractor2_abajo){
	//cube.position.z ++;
	tractor2_posicion.z+=0.7;
	tractor2_obj.rotation.y=20.41;
	direccion_tractor2 = "abajo";
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


function Colisiones(){
	if(cube_tractor_col.intersectsBox(cube_tractor2_col))
	{
		if(direccion_tractor == "izquierda"){
			move_tractor_izquierda = false;
		}
		if(direccion_tractor == "derecha"){
			move_tractor_derecha = false;
		}
		if(direccion_tractor == "arriba"){
			move_tractor_arriba = false;
		}
		if(direccion_tractor == "abajo"){
			move_tractor_abajo = false;
		}
		if(direccion_tractor2 == "izquierda"){
			move_tractor2_izquierda = false;
		}
		if(direccion_tractor2 == "derecha"){
			move_tractor2_derecha = false;
		}
		if(direccion_tractor2 == "arriba"){
			move_tractor2_arriba = false;
		}
		if(direccion_tractor2 == "abajo"){
			move_tractor2_abajo = false;
		}
	}else{
		move_tractor_abajo = true;
		move_tractor_arriba = true;
		move_tractor_derecha = true;
		move_tractor_izquierda = true;
		move_tractor2_abajo = true;
		move_tractor2_arriba = true;
		move_tractor2_derecha = true;
		move_tractor2_izquierda = true;
	}
	
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
