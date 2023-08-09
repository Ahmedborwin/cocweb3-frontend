import { Inter } from "next/font/google"
import { useRouter } from "next/router"
import Header from "../components/Navbar"
import ArmoryComponent from "/components/ArmoryComponent"

const inter = Inter({ subsets: ["latin"] })

export default function Armory() {
    return (
        <div>
            <Header />
            <ArmoryComponent />
        </div>
    )
}
