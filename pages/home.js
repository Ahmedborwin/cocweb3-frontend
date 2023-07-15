import { Inter } from "next/font/google"
import Header from "../components/header"
import Lair from "../components/lair"
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <div>
            <Header />
            <Lair />
        </div>
    )
}
