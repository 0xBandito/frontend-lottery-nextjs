import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ManuelHeader from "../components/ManualHeader"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Smart Contract Lottery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ManuelHeader />
      WELCOME TO THE LOTTERY. ENTER TO WIN SOME ETH.
    </div>
  )
}
