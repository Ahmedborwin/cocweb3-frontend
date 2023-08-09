import Link from "next/link"
import { ConnectButton } from "web3uikit"

export default function WalletConnectButton() {
    return (
        <div>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
