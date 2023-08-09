import WalletConnectButton from "./walletconnectbutton"
import Link from "next/link"

export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">Code of Conflict</h1>
            <div className="flex flex-row items-center">
                <Link className="mr-4 p-6" href="/">
                    Home
                </Link>
                <Link className="mr-4 p-6" href="/Armory">
                    Armory
                </Link>
                <WalletConnectButton />
            </div>
        </nav>
    )
}
