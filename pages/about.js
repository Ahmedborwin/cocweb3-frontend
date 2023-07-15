import { Inter } from "next/font/google"
import Header from "../components/header"
import NavBar from "@/components/NavBar"
const inter = Inter({ subsets: ["latin"] })

export default function Aboutgame() {
    return (
        <div className="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[url(/images/atlantisThemeBackground.png)] h-[500px]">
            <Header />
            <NavBar />
            <h1 className="text-xl">About the game</h1>
            <P>
                Welcome to "Starfire Assault," an adrenaline-pumping online military game that will
                immerse you in intense raid missions. Engage in strategic warfare, earning XP to
                level up and unlock new challenges. But here's the twist: each successful raid
                grants you random loot, in the form of valuable Non-Fungible Tokens (NFTs). These
                NFTs represent unique weapons, vehicles, and equipment, each providing specific
                utilities and advantages. Smart utilization of these NFTs will enhance your chances
                of success in future raids. Form alliances, customize your loadouts, and conquer
                enemy territories. Join the ranks of elite players and dominate the battlefield in
                Starfire Assault!
            </P>
        </div>
    )
}
