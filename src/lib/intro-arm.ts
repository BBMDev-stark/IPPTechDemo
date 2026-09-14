import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/** Art-directed procedural arm, visually referenced to UBTECH Walker. Not an OEM CAD asset. */
export function createIntroArm(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true, powerPreference:'low-power'});
  renderer.setClearColor(0x000000,0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=0.9;
  const scene=new THREE.Scene();
  const room=new RoomEnvironment();
  const pmrem=new THREE.PMREMGenerator(renderer);
  const environment=pmrem.fromScene(room,0.04);
  scene.environment=environment.texture;
  room.dispose();pmrem.dispose();
  const camera=new THREE.OrthographicCamera(-1,1,1,-1,1,3000);
  camera.position.set(0,0,1200);
  const hemi=new THREE.HemisphereLight(0xe7f5ff,0x273344,1.2);scene.add(hemi);
  const key=new THREE.DirectionalLight(0xffffff,2);key.position.set(-200,400,600);scene.add(key);
  const rim=new THREE.DirectionalLight(0x16c5ff,1.4);rim.position.set(200,-150,350);scene.add(rim);
  const white=new THREE.MeshStandardMaterial({color:0xe9edef,metalness:0.68,roughness:0.25});
  const silver=new THREE.MeshStandardMaterial({color:0x8a9aa7,metalness:0.92,roughness:0.26});
  const black=new THREE.MeshStandardMaterial({color:0x161e28,metalness:0.45,roughness:0.38});
  const rubber=new THREE.MeshStandardMaterial({color:0x090e16,metalness:0.1,roughness:0.8});
  const cyan=new THREE.MeshStandardMaterial({color:0x05bbee,emissive:0x03a8de,emissiveIntensity:2,metalness:0.3,roughness:0.3});
  const arm=new THREE.Group();scene.add(arm);
  function box(parent:THREE.Object3D,size:number[],position:number[],mat:THREE.Material,radius=.1){const mesh=new THREE.Mesh(new RoundedBoxGeometry(size[0],size[1],size[2],3,radius),mat);mesh.position.set(position[0],position[1],position[2]);parent.add(mesh);return mesh;}
  function joint(parent:THREE.Object3D,x:number,y:number,z:number,r:number,length:number,material=black){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,length,32),material);mesh.rotation.x=Math.PI/2;mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
  // Forearm: layered shell, visible wrist bearing, longitudinal black seam and coolant-colored inlay.
  const forearm=new THREE.Group();arm.add(forearm);
  const forearmShell=new THREE.Mesh(new THREE.CapsuleGeometry(.51,2.5,8,28),white);forearmShell.rotation.z=Math.PI/2;forearmShell.position.set(2.15,.05,-.1);forearm.add(forearmShell);
  box(forearm,[2.5,.72,.87],[2.4,.07,-.13],black,.17);
  box(forearm,[2.25,.63,.17],[2.3,.14,.37],white,.09);
  box(forearm,[1.65,.055,.035],[2.1,.26,.475],cyan,.018);
  box(forearm,[1.65,.025,.035],[2.1,-.09,.475],silver,.008);
  for(let i=0;i<4;i++)box(forearm,[.14,.25,.035],[3.2+i*.18,.1,.37],rubber,.02);
  joint(forearm,4,.02,-.03,.7,.95);joint(forearm,4,.02,.49,.51,.11,silver);joint(forearm,4,.02,.57,.3,.07,white);joint(forearm,4,.02,.62,.12,.03,cyan);
  const upper=new THREE.Group();upper.position.set(4,.02,-.08);upper.rotation.z=-.95;forearm.add(upper);
  const upperShell=new THREE.Mesh(new THREE.CapsuleGeometry(.58,7.2,8,28),white);upperShell.rotation.z=Math.PI/2;upperShell.position.set(4,0,-.1);upper.add(upperShell);box(upper,[6.6,.17,.08],[4.1,.26,.43],black,.05);
  joint(forearm,.45,0,0,.48,.82,silver);box(forearm,[.58,.76,.79],[.27,0,0],black,.1);
  // Palm with dorsal shield and individual, articulated digits (four fingers + opposing thumb).
  const hand=new THREE.Group();arm.add(hand);
  box(hand,[1.22,1.43,.48],[-.55,0,.02],black,.16);
  box(hand,[1.08,1.27,.22],[-.52,0,.31],white,.15);
  box(hand,[.42,.065,.028],[-.47,.29,.439],cyan,.025);
  for(const y of [-.43,.43])for(const x of [-.92,-.12])joint(hand,x,y,.445,.038,.016,silver);
  const fingers:THREE.Group[][]=[];
  const lengths=[.64,.82,.77,.59];
  for(let i=0;i<4;i++){
    const root=new THREE.Group();root.position.set(-1.12,.53-i*.35,.02);hand.add(root);
    const chain:THREE.Group[]=[];let parent=root;
    for(let j=0;j<3;j++){
      const len=lengths[i]*(j===0?.67:j===1?.56:.45);
      const segment=new THREE.Group();if(j>0)segment.position.x=-lengths[i]*(j===1?.67:.56);parent.add(segment);
      joint(segment,0,0,0,.14,.29,silver);
      box(segment,[len,.25,.27],[-len/2,0,.025],white,.065);
      box(segment,[len*.62,.17,.07],[-len*.54,0,-.14],rubber,.04);
      chain.push(segment);parent=segment;
    }
    fingers.push(chain);
  }
  const thumb=new THREE.Group();thumb.position.set(-.21,-.69,.02);thumb.rotation.z=.72;hand.add(thumb);
  joint(thumb,0,0,0,.21,.37,silver);box(thumb,[.58,.32,.34],[-.31,0,.02],white,.09);
  const thumbTip=new THREE.Group();thumbTip.position.x=-.58;thumb.add(thumbTip);
  joint(thumbTip,0,0,0,.15,.32);box(thumbTip,[.48,.29,.31],[-.24,0,.02],white,.08);
  // Small recessed maker-style plate; branding itself lives in the HTML intro.
  box(forearm,[.8,.18,.025],[1.5,-.28,.44],black,.025);
  let width=0,height=0,scale=70;
  function resize(){width=window.innerWidth;height=window.innerHeight;renderer.setSize(width,height,false);camera.left=-width/2;camera.right=width/2;camera.top=height/2;camera.bottom=-height/2;camera.updateProjectionMatrix();scale=Math.min(84,Math.max(43,width*.061));arm.scale.setScalar(scale);}
  resize();window.addEventListener('resize',resize);
  function render(edgeX:number,reach:number,grip:number){
    const entry=(1-reach)*(width+scale*3);
    arm.position.set(edgeX-width/2+scale*(2.28-grip*.55)+entry,-height*.065,0);
    arm.rotation.set(-.3+grip*.1,-.22,-.07+grip*.08);
    hand.rotation.y=grip*-.1;
    fingers.forEach((chain,i)=>chain.forEach((part,j)=>{part.rotation.y=-grip*(j===0?.42:j===1?1.05:.8);part.rotation.z=(1-grip)*(i-1.5)*.055;}));
    thumb.rotation.y=-grip*.45;thumbTip.rotation.y=-grip*.85;
    renderer.render(scene,camera);
  }
  return {render,dispose(){window.removeEventListener('resize',resize);scene.traverse(o=>{if(o instanceof THREE.Mesh)o.geometry.dispose()});[white,silver,black,rubber,cyan].forEach(m=>m.dispose());environment.dispose();renderer.dispose();}};
}


