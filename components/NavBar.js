import Link from "next/link"

export default function NavBar() {
    return (
        <div>
            <div className="top-0 left-0 bg-gray-200 p-4 flex flex-row w-1/2 ">
                <Link href="/">
                    <button className="w-full py-2 px-4 text-gray-700 font-bold underline shadow-md hover:shadow-xl transition duration-300">
                        Home
                    </button>
                </Link>
                <Link href="/armory">
                    <button className="w-full py-2 px-4 text-gray-700 font-bold underline shadow-md hover:shadow-xl transition duration-300">
                        Armory
                    </button>
                </Link>
                <Link href="/about">
                    <button className="w-full py-2 px-4 text-gray-700 font-bold underline shadow-md hover:shadow-xl transition duration-300">
                        About Game
                    </button>
                </Link>
                <Link href="/dev-corner">
                    <button className="w-full py-2 px-4 text-gray-700 font-bold underline shadow-md hover:shadow-xl transition duration-300">
                        Dev Corner
                    </button>
                </Link>
            </div>
        </div>
    )
}
