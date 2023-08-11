import {
    GamecontractAddress,
    Gameabi,
    providerURLs,
    LootcontractAddress,
    Lootabi,
} from "../constants"
import PlayerDetails from "./payerDetails"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Card } from "web3uikit"
import { ethers } from "ethers"

export default function Lair() {
    const { chainId: chainIdHex, isWeb3Enabled, account, enableWeb3 } = useMoralis()

    const dispatch = useNotification()

    const chainId = parseInt(chainIdHex).toString()

    //get provider
    const providerurl = chainId in providerURLs ? providerURLs[chainId] : null
    const provider = new ethers.providers.JsonRpcProvider(providerurl)

    //get contract addresses
    const CoCWeb3Address = chainId in GamecontractAddress ? GamecontractAddress[chainId][0] : null

    const [playerDetails, setPlayerDetails] = useState({
        Username: "",
        XP: 0,
        Rank: "",
        raidAttempts: 0,
    }) // player stats

    //variable for New Username unput field
    const [username, setUsername] = useState("")
    const [playerFound, setPlayerFound] = useState(false) // bool playerfound? used by render conidtions

    const [notificationMessage, setNotificationMessage] = useState("")
    const [notificationTitle, setNotificationTitle] = useState("")

    const {
        runContractFunction: createNewPlayer,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: Gameabi,
        contractAddress: CoCWeb3Address,
        functionName: "createNewPlayer",
        params: { _name: username },
    })

    const { runContractFunction: getPlayer } = useWeb3Contract({
        abi: Gameabi,
        contractAddress: CoCWeb3Address,
        functionName: "getPlayer",
        params: { _player: account },
    })

    const { runContractFunction: getPlayerFound } = useWeb3Contract({
        abi: Gameabi,
        contractAddress: CoCWeb3Address,
        functionName: "getPlayerFound",
        params: { _playerAddress: account },
    })

    async function updateUI() {
        const playerFoundbool = await getPlayerFound()
        if (playerFoundbool) {
            const playerInformation = await getPlayer()
            setPlayerFound(true)
        }
    }

    const listenEvents = async () => {
        const CoCWeb3 = new ethers.Contract(CoCWeb3Address, Gameabi, provider)
        CoCWeb3.on("NewPlayerCreated", async (playerAddress, player) => {
            setNotificationMessage("Welcome to the game. Lets get it")
            setNotificationTitle("Player Created")
            handleNotification()
            updateUI()
        })
        CoCWeb3.on("UsernameTaken", async (PlayerAddress) => {
            setNotificationMessage(
                "Sorry, someone has already taken that username. Choose another one buddy"
            )
            setNotificationTitle("Username unavailable")
            handleNotification()
            updateUI()
        })
    }

    const handleSuccess = async (tx) => {
        // await tx.wait(1)
        // handleNotification(tx)
        updateUI()
    }

    const handleNotification = () => {
        dispatch({
            type: "info",
            message: notificationMessage,
            title: notificationTitle,
            position: "topR",
            icon: "bell",
        })
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
            listenEvents()
        }
    }, [isWeb3Enabled, account])

    useEffect(() => {
        enableWeb3()
    }, [])

    return CoCWeb3Address ? (
        <div>
            {!playerFound && (
                <div
                    id="createPlayer-background-container"
                    className="fixed top-10 left-10 right-10 bottom-10 bg-cover bg-white flex justify-center opacity-80 "
                    style={{
                        backgroundImage: `url(/images/citySkyline.jpeg)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundColor: "#ffffff",
                        maxWidth: "1024px",
                        marginTop: "80px",
                    }}
                >
                    <div id="CreatePlayerForm" className="mt-40 ">
                        <h2 className="text-2xl font-bold mb-4 ml-20">What do they call you?</h2>
                        <form>
                            <input
                                className="border text-black border-gray-300 rounded px-4 py-2 w-1/2 ml-20"
                                type="text"
                                value={username}
                                placeholder="UserName"
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                            ></input>
                        </form>
                        <button
                            className="mb-5 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-2 px-4 rounded ml-20"
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
                </div>
            )}
            {playerFound && (
                <div>
                    <div id="playerStats" className="container my-12 mx-auto md:px-6 w-1/3">
                        <PlayerDetails rankNeeded={true} />
                    </div>

                    <div
                        id="pageCards"
                        className="w-full max-w-1024px mx-auto pt-4 px-6 flex items-center justify-center gap-5 "
                    >
                        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div
                                className="relative overflow-hidden bg-cover bg-no-repeat"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                            >
                                <img
                                    className="rounded-t-lg"
                                    src="/images/ChineseThemedBackground.png"
                                    alt=""
                                />
                                <a href="RookieRaid">
                                    <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                                </a>
                            </div>
                            <div className="p-6">
                                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                    Rookie Raid
                                </h5>
                                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                    The easiest Raids. Get some practise in, earn XP and Loot.
                                </p>
                                <button
                                    type="button"
                                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                >
                                    Wet your Beak
                                </button>
                            </div>
                        </div>
                        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div
                                className="relative overflow-hidden bg-cover bg-no-repeat"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                            >
                                <img
                                    className="rounded-t-lg"
                                    src="/images/desertThemedBG.png"
                                    alt=""
                                />
                                <a href="#!">
                                    <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                                </a>
                            </div>
                            <div className="p-6">
                                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                    Mid Raid
                                </h5>
                                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                    Attempt once you have earned enough XP and Loot. Not for
                                    Begginers.
                                </p>
                                <button
                                    type="button"
                                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >
                                    Lets get it
                                </button>
                            </div>
                        </div>
                        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div
                                className="relative overflow-hidden bg-cover bg-no-repeat"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                            >
                                <img className="rounded-t-lg" src="/images/greenCity.png" alt="" />
                                <a href="#!">
                                    <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                                </a>
                            </div>
                            <div className="p-6">
                                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                    Expert
                                </h5>
                                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                    You have trained over the last ten years of your life for this?
                                    Cool. Come give it a go.
                                </p>
                                <button
                                    type="button"
                                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >
                                    Your funeral
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : (
        <div>Please connect to a supported chain</div>
    )
}
