import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model({ action }) {
  const group = useRef();
  const previousAction = usePrevious(action);
  const { nodes, materials, animations } = useGLTF("./theboy.glb");
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    if (previousAction) {
      actions[previousAction].fadeOut(0.2);
      actions[action].stop();
    }
    actions[action].play();
    actions[action].fadeIn(0.2);
  }, [actions, action, previousAction]);
  return (
    <group ref={group} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          name="Boy01_Body_Geo"
          geometry={nodes.Boy01_Body_Geo.geometry}
          material={materials.Boy01_Body_MAT}
          skeleton={nodes.Boy01_Body_Geo.skeleton}
        />
        <skinnedMesh
          name="Boy01_Brows_Geo"
          geometry={nodes.Boy01_Brows_Geo.geometry}
          material={materials.Boy01_Brows_MAT1}
          skeleton={nodes.Boy01_Brows_Geo.skeleton}
        />
        <skinnedMesh
          name="Boy01_Eyes_Geo"
          geometry={nodes.Boy01_Eyes_Geo.geometry}
          material={materials.Boy01_Eyes_MAT1}
          skeleton={nodes.Boy01_Eyes_Geo.skeleton}
        />
        <skinnedMesh
          name="h_Geo"
          geometry={nodes.h_Geo.geometry}
          material={materials.Boy01_Mouth_MAT1}
          skeleton={nodes.h_Geo.skeleton}
        />
      </group>
    </group>
  );
}
useGLTF.preload("/theboy.glb");

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
