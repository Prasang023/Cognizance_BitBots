// import { Inter } from "next/font/google";
import Head from "next/head";
import Layout from "@/components/Layout";
import First from "@/components/Frontpages/First";
import Second from "@/components/Frontpages/Second";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const { userRole } = useSelector((state) => state.navbar);
  const { push } = useRouter();
  if (userRole != null) {
    push("/profile");
  }

  useEffect(() => {
    
    const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".cursor-circle");

const colors = [
  "#0f3fc4",
  "#1753f7",
  "#2b4f79",
  "#394992",
  "#465997",
  "#325c6d",
  "#3776ff",
  "#3a78ff",
  "#3a63bd",
  "#6594bb",
  "#5d8aec",
  "#5c8be3",
  "#6f8ebd",
  "#6b90a8",
  "#8cbada",
  "#61bff5",
  "#5ea9ef",
  "#6bfff8",
  "#69e7fd",
  "#63cef8",
  "#3bd8ff",
  "#ecececc0"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.5;
    y += (nextCircle.y - y) * 0.5;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();



  }, [])


  return (
    <>
      <Head>
        <title>DVAL</title>
        <meta name="description" content="Hello this side DWAR App." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
        <div class="cursor-circle "></div>
      <div className="main-dwar-body">


        <Layout>
          <First />
          <Second />
        </Layout>
      </div>
    </>
  );
}
