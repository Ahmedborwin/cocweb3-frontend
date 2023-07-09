import { Inter } from "next/font/google"
import Header from "../components/header"
import RookieRaid from "../components/RookieRaid"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <div>
            <RookieRaid />
        </div>
    )
}
