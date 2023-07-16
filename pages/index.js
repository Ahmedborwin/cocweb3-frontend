import { Inter } from "next/font/google"
import { useRouter } from "next/router"
import Header from "../components/header"
import Lair from "../components/lair"
import NavBar from "../components/NavBar"

const inter = Inter({ subsets: ["latin"] })

export default function Index() {
    return (
        <div>
            <NavBar />
            <Lair />
        </div>
    )
}
