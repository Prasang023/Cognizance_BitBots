// import { Inter } from "next/font/google";
import Head from "next/head"
import Layout from "@/components/Layout"
import First from "@/components/Frontpages/First"
import Second from "@/components/Frontpages/Second"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
// import Notification from "@/components/Notification";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { userRole } = useSelector((state) => state.navbar)
  const { push } = useRouter()
  if (userRole!=null) {
    push("/profile")
  }
  return (
    <>
      <Head>
        <title>DWAR</title>
        <meta name="description" content="Hello this side DWAR App." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-dwar-body">
        <Layout>
          <First />
          <Second />
          {/* <Notification /> */}
        </Layout>
      </div>
    </>
  )
}
