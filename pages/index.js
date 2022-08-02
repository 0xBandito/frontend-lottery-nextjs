import Head from 'next/head'
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"
export default function Home() {
  return (
    <div className="px-4 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 ... h-screen">
      <Head>
        <title>CYF LOTTERY</title>
        <meta name="description" content="CYF Lottery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <LotteryEntrance />
    </div>
  )
}
