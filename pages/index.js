import { Inter } from "next/font/google"
import { useRouter } from "next/router"
import Header from "../components/header"
import Lair from "../components/lair"
import { useMoralis, useWeb3Contract } from "react-moralis"

const inter = Inter({ subsets: ["latin"] })

export default function Index() {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()

    return (
        <div>
            <Header />
            <Lair />
        </div>
    )
}
