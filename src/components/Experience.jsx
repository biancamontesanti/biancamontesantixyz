import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  CameraControls,
  Environment,
  Html,
  MeshPortalMaterial,
  OrbitControls,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
} from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
import '/src/index.css';
import { Ipod } from "./Ipod";

export const Experience = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  useCursor(hovered);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls
     
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
   
      
        <Html
          transform
          occlude="blending"
          position={[0, 0, 0.051]}
          className="html-container fish-portal"
          distanceFactor={1.5}
          pointerEvents="none"
        >
          <div className="iframe-wrapper">
            <iframe src="https://biancamontesanti.netlify.app" className="portal-iframe" title="Fish Portal" />
          </div>
        </Html>

      {/* <MonsterStage
        name="Dragon"
        color={"#df8d52"}
        texture={"textures/anime_art_style_lava_world.jpg"}
        position={[-2.5, 0, 0]}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      > */}
          <Ipod scale={2.3} position={[0, 0, -0.12]} rotation-y={Math.PI / -2}/>
  
      {/* </MonsterStage> */}
    </>
  );
};

const MonsterStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  hovered,
  setHovered,
  ...props
}) => {
  const map = useTexture(texture);
  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
  });

  return (
    <group {...props}>
      <Text
        font="fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY={"bottom"}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        {/* <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial> */}
      </RoundedBox>
    </group>
  );
};

export default Experience;