// import { Canvas } from "@react-three/fiber";
// import { Inter } from "next/font/google";
// import { Suspense } from "react";
// import Three from "@/components/Three";
import Layout from "@/components/Layout";
import Help from "@/components/Help";
import Notification from "@/components/Notification";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Layout>
        {/* <Canvas id="three-canvas-container">
          <Suspense fallback={null}>
            <Three id="three-cont" />
          </Suspense>
        </Canvas> */}
        <Help />
        <Notification />
      </Layout>
    </>
  );
}
