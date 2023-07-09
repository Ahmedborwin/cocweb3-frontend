import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"
import { useRouter } from "next/router"
import Link from "next/link"
import PlayerDetails from "./playerDetailsDisplay"
import RookieRaid from "./RookieRaid"
// const {
//     chainId,
//     provider,
//     CoCWeb3Address,
//     createNewPlayer,
//     getPlayer,
// } = require("./contractConnection")

export default function CreateNewPlayer() {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    //instantiate contract

    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")

    const chainId = parseInt(chainIdHex)

    const CoCWeb3Address = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [playerDetails, setPlayerDetails] = useState({ Username: "", XP: 0, Rank: "" })
    const [username, setUsername] = useState("")

    const {
        runContractFunction: createNewPlayer,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: CoCWeb3Address,
        functionName: "createNewPlayer",
        params: { _name: username },
    })

    const { runContractFunction: getPlayer } = useWeb3Contract({
        abi: abi,
        contractAddress: CoCWeb3Address,
        functionName: "getPlayer",
        params: { _player: account },
    })

    const getPlayerInfo = async () => {
        let rankTitle
        const playerInformation = await getPlayer()

        function getRankByIndex(index) {
            let rank
            switch (index) {
                case 0:
                    rank = "Officer Cadet"
                    break
                case 1:
                    rank = "Second Lieutenant"
                    break
                case 2:
                    rank = "Lieutenant"
                    break
                case 3:
                    rank = "Captain"
                    break
                case 4:
                    rank = "Major"
                    break
                case 5:
                    rank = "Lieutenant Colonel"
                    break
                case 6:
                    rank = "Colonel"
                    break
                case 7:
                    rank = "Brigadier"
                    break
                case 8:
                    rank = "Major General"
                    break
                case 9:
                    rank = "Lieutenant General"
                    break
                case 10:
                    rank = "General"
                    break
                case 11:
                    rank = "Field Marshal"
                    break
                default:
                    rank = "Invalid index"
                    break
            }

            return rank
        }

        if (!playerInformation.username) {
            rankTitle = " "
        } else {
            rankTitle = getRankByIndex(playerInformation.rank)
        }

        setPlayerDetails((prevState) => ({
            ...prevState,
            Username: playerInformation.username,
            XP: playerInformation.playerXP.toString(),
            Rank: rankTitle,
        }))

        console.log(JSON.stringify(playerDetails))
    }

    async function updateUI() {
        await getPlayerInfo()
    }

    const listenEvents = async () => {
        const CoCWeb3 = new ethers.Contract(CoCWeb3Address, abi, provider)
        CoCWeb3.on("NewPlayerCreated", async (playerAddress, player) => {
            updateUI()
        })
    }

    const handleSuccess = async (tx) => {
        //await tx.wait(1)
        //handleNotification(tx)
        updateUI()
    }

    const handleNotification = () => {}

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
            listenEvents()
        }
    }, [isWeb3Enabled])

    return CoCWeb3Address ? (
        <>
            <h1> </h1>
            {!playerDetails.Username && (
                <div className="CreatePlayer">
                    <h2 className="text-2xl font-bold mb-4">Create New Player</h2>
                    <form>
                        <label className="mb-4">
                            Username:
                            <input
                                className="border text-black border-gray-300 rounded px-4 py-2 w-half"
                                type="text"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                            ></input>
                        </label>
                    </form>
                    <button
                        className="mb-5 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={async () => {
                            await createNewPlayer({
                                onSuccess: handleSuccess,
                                onError: (error) => {
                                    console.log(error)
                                },
                            })
                        }}
                        disabled={isLoading || isFetching}
                    >
                        Create New Player
                    </button>
                </div>
            )}
            {playerDetails.Username && (
                <div>
                    <h1 className="mb-10 text-3xl md:text-4xl lg:text-5xl font-bold underline">
                        Welcome <span className="text-blue-500">{playerDetails.Username}</span>. Are
                        you ready to play?
                    </h1>
                    <Link
                        className="border mt-10 px-8 py-2 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker"
                        href="/RookieRaid"
                    >
                        Go to Rookie Raid
                    </Link>
                    <div className="playerCardContainer flex flex-row">
                        <div className="flex-grow"></div>
                        <div className="w-1/3 bg-blue-300 p-4 rounded-lg shadow-md">
                            <div className="flex flex-col justify-start items-end">
                                <span className="text-gray-700">
                                    Username: {playerDetails.Username}
                                </span>
                                <span className="text-gray-700">XP: {playerDetails.XP}</span>
                                <span className="text-gray-700">Rank: {playerDetails.Rank}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : (
        <div>Please connect to a supported chain</div>
    )
}