import { Inter } from "next/font/google"
import { useRouter } from "next/router"
import Header from "../components/Navbar"
import Lair from "../components/lair"

const inter = Inter({ subsets: ["latin"] })

export default function Index() {
    return (
        <div>
            <Header />
            <Lair />
        </div>
    )
}
