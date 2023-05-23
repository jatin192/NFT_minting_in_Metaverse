import * as THREE from './node_modules/three/build/three.module.js';
import Movements from './movement.js';
import polygon from './Web3.js';
import abi from "./abi/abi.json" assert { type: "json" };

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//_______________________________________________cyclinder_____________________________________________________________________

const geometry_cylinder = new THREE.CylinderGeometry( 5, 5, 20, 32 ); 
const material_cylinder = new THREE.MeshPhongMaterial( {color: 0x00ff00} ); 
const cylinder = new THREE.Mesh( geometry_cylinder, material_cylinder ); 
scene.add( cylinder );
cylinder.position.set(-20,5,0);

//_______________________________________________torus_________________________________________________________________________

const geometry_torus = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
const material_torus = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
const torus = new THREE.Mesh( geometry_torus, material_torus ); scene.add( torus );
scene.add( torus );
torus.position.set(40,5,0);

//________________________________________________cone_________________________________________________________________________

// const geometry_cone = new THREE.ConeGeometry( 5, 20, 32 ); 
// const material_cone = new THREE.MeshBasicMaterial( {color: 0xffff00} );
// const cone = new THREE.Mesh(geometry_cone, material_cone ); 
// scene.add( cone );
// cone.position.set(-20,5,0);

//________________________________________________cube________________________________________________________________________

let geometry_cube= new THREE.BoxGeometry( 10,10,10 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
let material_cube = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
let cube = new THREE.Mesh( geometry_cube, material_cube );
scene.add( cube );

//_______________________________________________Plane Area_________________________________________________________________________

let geometry_area = new THREE.BoxGeometry( 100, 0.2, 50 );
let material_area = new THREE.MeshPhongMaterial({ color: 0xdd0f01 })
let area = new THREE.Mesh( geometry_area, material_area );
scene.add( area );

//______________________________________create an AudioListener and add it to the camera___________________________________________________________________________________________---


// const listener = new THREE.AudioListener();
// camera.add( listener );

// // create a global audio source
// const sound = new THREE.Audio( listener );

// // load a sound and set it as the Audio object's buffer
// const audioLoader = new THREE.AudioLoader();
// audioLoader.load( '1.ogg', function( buffer ) {
// 	sound.setBuffer( buffer );
// 	sound.setLoop( true );
// 	sound.setVolume( 0.5 );
// 	sound.play();
// });

//____________________________________________________________________________________________________________________________


camera.position.z = 5;
camera.position.set(10,5,40);


let ambient_light = new THREE.AmbientLight(0x404040);
let direction_light = new THREE.DirectionalLight(0x00ff00,1);
ambient_light.add(direction_light);
scene.add(ambient_light);

//  ambient_light + direction_light +MeshPhongMaterial -> MAKE more 3D

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
    cube.position.y += 0.01;  // movement


    if (Movements.isPressed(37)) 
    {
        //left
        camera.position.x -= 0.5;
    }
    if (Movements.isPressed(38)) 
    {
        //up
        camera.position.x += 0.5;
        camera.position.y += 0.5;
    }
    if (Movements.isPressed(39)) 
    {
        //right
        camera.position.x += 0.5;
    }
    if (Movements.isPressed(40)) 
    {
        //down
        camera.position.x -= 0.5;
        camera.position.y -= 0.5;
    }
    camera.lookAt(area.position);
	renderer.render( scene, camera );
}

animate();
renderer.render( scene, camera );

//____________________________________________________________________________________________________________________________

let button = document.querySelector("#mint");
button.addEventListener("click",mint_NFT_func);

async function mint_NFT_func() {
    let nft_shape = document.querySelector("#nft_shape").value;
    let nft_width = document.querySelector("#nft_width").value;
    let nft_height = document.querySelector("#nft_height").value;
    let nft_depth = document.querySelector("#nft_depth").value;
    let nft_x = document.querySelector("#nft_x").value;
    let nft_y = document.querySelector("#nft_y").value;
    let nft_z = document.querySelector("#nft_z").value;

    if(typeof window.ethereum == "undefined")
        {
            rej("Please install Metamask");
        }

    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi,"0xd5DadDE2e929C2299706cd50431FabB5011Dc7d7");  //contract address (Polygon)
    
    web3.eth.requestAccounts().then((accounts_) => {
        contract.methods
          .min_NFT(nft_shape, nft_width, nft_height, nft_depth, nft_x, nft_y, nft_z)
          .send({from: accounts_[0],value: "10"})
          .then((data) => {
            console.log("NFT is minted");
          });
      });
    }


//____________________________________________________________________________________________________________________
polygon.then((result) => {
    result.nft.forEach((object, index) => {
      if (index <= result.supply) {
        
        // let shape_ = document.querySelector("#nft_shape").value;
        // console.log("shape=",shape_);

        // if(shape_.value === "cyclinder") //getting error Don't know why
        // {
            // const geometry_cylinder_2 = new THREE.CylinderGeometry(object.w, object.h, object.d); 
            // const material_cylinder_2 = new THREE.MeshPhongMaterial( {color: 0xffff00} ); 
            // const cylinder_nft = new THREE.Mesh( geometry_cylinder_2, material_cylinder_2 ); 
            // cylinder_nft.position.set(object.x, object.y, object.z);
            // scene.add(cylinder_nft);
        // }
        // else if(shape_.vaue === "cone")
        // {
            const geometry_cone_2 = new THREE.ConeGeometry(object.w, object.h, object.d); 
            const material_cone_2 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
            const cone_nft = new THREE.Mesh(geometry_cone_2, material_cone_2 ); 
            cone_nft.position.set(object.x, object.y, object.z);
            scene.add( cone_nft );
        // }
        // else if(shape_.value === "cube")
        // {
            // let geometry_cube_2= new THREE.BoxGeometry(object.w, object.h, object.d);
            // let material_cube_2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
            // let cube_nft = new THREE.Mesh( geometry_cube_2, material_cube_2 );
            // cube_nft.position.set(object.x, object.y, object.z);
            // scene.add( cube_nft );
        // };
      };
    });
  });
//________________________________________________________________________________________________________________
