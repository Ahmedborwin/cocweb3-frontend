import { Inter } from "next/font/google";
import Header from "../components/header";
import CreateNewPlayer from "../components/createNewPlayer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Header />
      <CreateNewPlayer />
    </div>
  );
}
