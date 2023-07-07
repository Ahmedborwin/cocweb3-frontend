import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div className="float-right">
      <ConnectButton moralisAuth={false} />
    </div>
  );
}
