import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TheBoy from "./Theboy";
import "./styles.css";

function App() {
  const [action, setAction] = useState("idle");

  return (
    <>
      <Canvas camera={{ position: [0, 1, 3] }}>

        <ambientLight />
        <Suspense fallback={null}>
          <TheBoy action={action} />
        </Suspense>
        <OrbitControls traget={[0, 1, 0]} autoRotate />

      </Canvas>
      <div className="controls">
        <button onClick={() => setAction("dance")}>Dance</button>
        <button onClick={() => setAction("dance2")}>Dance 2</button>
        <button onClick={() => setAction("idle")}>idle</button>
      </div>




    </>
  );
}

export default App;
