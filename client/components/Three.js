import { FlyControls, PerspectiveCamera } from "@react-three/drei";
import {
  BoxGeometry,
  Color,
  Fog,
  MeshPhongMaterial,
  Scene,
  TextureLoader,
} from "three";
import lenflare0 from "../assets/lensflare0.png";
import lenflare3 from "../assets/lensflare3.png";
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare";

const Three = () => {
  let scene = new Scene();
  scene.background = new Color(0x050505);
  scene.fog = new Fog(0x050505, 2000, 3500);
  let s = 100;
  const geometry = new BoxGeometry(s, s, s);
  const material = new MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 70,
  });

  let par = [];

  for (let i = 0; i < 30000; i++) {
    const position = {
      x: 8000 * (2.0 * Math.random() - 1.0),
      y: 8000 * (2.0 * Math.random() - 1.0),
      z: 8000 * (2.0 * Math.random() - 1.0),
    };

    const rotation = {
      x: Math.random() * Math.PI,
      y: Math.random() * Math.PI,
      z: Math.random() * Math.PI,
    };

    const params = {
      position,
      rotation,
    };

    par.push(params);
  }

  const textureLoader = new TextureLoader();

  const textureFlare0 = textureLoader.load(lenflare0);
  const textureFlare3 = textureLoader.load(lenflare3);

  const lensflare1 = new Lensflare();
  lensflare1.addElement(
    new LensflareElement(
      textureFlare0,
      700,
      0,
      new Color().setHSL(0.55, 0.9, 0.5)
    )
  );
  lensflare1.addElement(new LensflareElement(textureFlare3, 60, 0.6));
  lensflare1.addElement(new LensflareElement(textureFlare3, 70, 0.7));
  lensflare1.addElement(new LensflareElement(textureFlare3, 120, 0.9));
  lensflare1.addElement(new LensflareElement(textureFlare3, 70, 1));

  const lensflare2 = new Lensflare();
  lensflare2.addElement(
    new LensflareElement(
      textureFlare0,
      700,
      0,
      new Color().setHSL(0.08, 0.8, 0.5)
    )
  );
  lensflare2.addElement(new LensflareElement(textureFlare3, 60, 0.6));
  lensflare2.addElement(new LensflareElement(textureFlare3, 70, 0.7));
  lensflare2.addElement(new LensflareElement(textureFlare3, 120, 0.9));
  lensflare2.addElement(new LensflareElement(textureFlare3, 70, 1));
  const lensflare3 = new Lensflare();
  lensflare3.addElement(
    new LensflareElement(
      textureFlare0,
      700,
      0,
      new Color().setHSL(0.995, 0.5, 0.9)
    )
  );
  lensflare3.addElement(new LensflareElement(textureFlare3, 60, 0.6));
  lensflare3.addElement(new LensflareElement(textureFlare3, 70, 0.7));
  lensflare3.addElement(new LensflareElement(textureFlare3, 120, 0.9));
  lensflare3.addElement(new LensflareElement(textureFlare3, 70, 1));

  return (
    <>
      {/* Camera  */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 0]}
        args={[27, window.innerWidth / window.innerHeight, 1, 3500]}
      />
      <FlyControls
        movementSpeed={500}
        rollSpeed={Math.PI / 6}
        autoForward={false}
        dragToLook={false}
      />

      {par.map((params) => (
        <mesh
          key={params.rotation.x}
          position={[params.position.x, params.position.y, params.position.z]}
          material={material}
          geometry={geometry}
          rotation={[params.rotation.x, params.rotation.y, params.rotation.z]}
        ></mesh>
      ))}

      <directionalLight
        args={[0xffffff, 0.05]}
        position={[0, -1, 0]}
        color={"#3366ff"}
      />

      {/* <pointLight args={[ 0xffffff, 1.5, 2000 ]} color={new Color().setHSL(0.55, 0.9, 0.5)} position={[5000, 0, -1000]} add={lensflare1} />
            <pointLight args={[ 0xffffff, 1.5, 2000 ]} color={new Color().setHSL(0.08, 0.8, 0.5)} position={[0, 0, -1000]} add={lensflare2} />
            <pointLight args={[ 0xffffff, 1.5, 2000 ]} color={new Color().setHSL(0.995, 0.5, 0.9)} position={[5000, 5000, -1000]} add={lenflare3} /> */}
      <pointLight
        args={[0xffffff, 1.5, 2000]}
        color={"#002699"}
        position={[5000, 0, -1000]}
        add={lensflare1}
      />
      <pointLight
        args={[0xffffff, 1.5, 2000]}
        color={"#809fff"}
        position={[0, 0, -1000]}
        add={lensflare2}
      />
      <pointLight
        args={[0xffffff, 1.5, 2000]}
        color={"#002699"}
        position={[5000, 5000, -1000]}
        add={lenflare3}
      />
    </>
  );
};

export default Three;
