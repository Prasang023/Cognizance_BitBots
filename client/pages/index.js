// import { Canvas } from "@react-three/fiber";
// import { Inter } from "next/font/google";
// import { Suspense } from "react";
// import Three from "@/components/Three";
import Layout from "@/components/Layout";
import Head from "next/head";
// import Notification from "@/components/Notification";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>DWAR</title>
        <meta name="description" content="Hello this side DWAR App." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-dwar-body">
        <Layout></Layout>
      </div>
      {/* <Layout>
        <Canvas id="three-canvas-container">
          <Suspense fallback={null}>
            <Three id="three-cont" />
          </Suspense>
        </Canvas>
        <Help />
        <Notification />
      </Layout> */}
    </>
  );
}
