import { Inter } from "next/font/google"
import RookieRaid from "../components/RookieRaid"
import Header from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export default function RookieRaidPage() {
    return (
        <div>
            <Header />
            <RookieRaid />
        </div>
    )
}
