import { contractAddresses, abi } from "../constants"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function NavBar() {
    return (
        <div>
            <div class="top-0 left-0 bg-gray-200 p-4 flex flex-row w-2/3 ">
                <Link href="/">
                    <button class="w-full py-2 px-4 text-gray-700 font-bold underline shadow-md hover:shadow-xl transition duration-300">
                        Home
                    </button>
                </Link>
                <Link href="/armory">
                    <button class="w-full py-2 px-4 text-gray-700 font-bold underline shadow-md hover:shadow-xl transition duration-300">
                        Armory
                    </button>
                </Link>
                <Link href="/about">
                    <button class="w-full py-2 px-4 text-gray-700 font-bold underline shadow-md hover:shadow-xl transition duration-300">
                        About Game
                    </button>
                </Link>
                <Link href="/dev-corner">
                    <button class="w-full py-2 px-4 text-gray-700 font-bold underline shadow-md hover:shadow-xl transition duration-300">
                        Dev Corner
                    </button>
                </Link>
            </div>
        </div>
    )
}
