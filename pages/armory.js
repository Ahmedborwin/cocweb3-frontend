import { Inter } from "next/font/google"
import Header from "../components/header"
import NavBar from "@/components/NavBar"
const inter = Inter({ subsets: ["latin"] })

export default function Armory() {
    return (
        <div className="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[url(/images/atlantisThemeBackground.png)] h-[500px]">
            <Header />
            <NavBar />
            <h1 className="text-xl">Armory page</h1>
            <div>
                Player can see all their NFT loot and items. They can equip their items in
                prepartion for a Raid.Boss battle.
            </div>
        </div>
    )
}
