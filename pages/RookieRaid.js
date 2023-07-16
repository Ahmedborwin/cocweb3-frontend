import { Inter } from "next/font/google"
import RookieRaid from "../components/RookieRaid"
import NavBar from "@/components/NavBar"

const inter = Inter({ subsets: ["latin"] })

export default function RookieRaidPage() {
    return (
        <div>
            <NavBar />
            <RookieRaid />
        </div>
    )
}
