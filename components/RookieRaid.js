import { contractAddresses, abi, providerURLs } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"
import Header from "./header"
import Link from "next/link"

export default function RookieRaid() {
    let playerInformation

    const dispatch = useNotification()
    //let provider
    const { chainId: chainIdHex, isWeb3Enabled, account, enableWeb3 } = useMoralis()
    const chainId = parseInt(chainIdHex)

    const providerurl = chainId in providerURLs ? providerURLs[chainId] : null

    const provider = new ethers.providers.JsonRpcProvider(providerurl)

    const CoCWeb3Address = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [playerDetails, setPlayerDetails] = useState({
        Username: "",
        XP: 0,
        Rank: "",
        raidAttempts: 0,
    }) // player stats

    const [notificationMessage, setNotificationMessage] = useState("")
    const [notificationTitle, setNotificationTitle] = useState("")

    // raid button
    const {
        runContractFunction: lvl1Raid,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: CoCWeb3Address,
        functionName: "performVRFRookieRaid",
        params: { _player: account },
    })

    //raid button
    const { runContractFunction: testRaid } = useWeb3Contract({
        abi: abi,
        contractAddress: CoCWeb3Address,
        functionName: "callRookieRaidTest",
        params: { _player: account },
    })

    const { runContractFunction: getPlayer } = useWeb3Contract({
        abi: abi,
        contractAddress: CoCWeb3Address,
        functionName: "getPlayer",
        params: { _player: account },
    })

    const getPlayerInfo = async () => {
        playerInformation = await getPlayer()

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

        const rankTitle = getRankByIndex(playerInformation.rank)

        setPlayerDetails((prevState) => ({
            ...prevState,
            Username: playerInformation.username,
            XP: playerInformation.playerXP.toString(),
            Rank: rankTitle,
            raidAttempts: playerInformation.raidAttempts.toString(),
        }))
    }

    async function updateUI() {
        await getPlayerInfo()
    }

    const listenEvents = async () => {
        const CoCWeb3 = new ethers.Contract(CoCWeb3Address, abi, provider)
        CoCWeb3.on("RaidSuccessful", async (playerAddress) => {
            await updateUI()
            setNotificationMessage("Raid was Successful. You have gained XP")
            setNotificationTitle("Raid Succesfull")
            handleNotification()
        })
        CoCWeb3.on("RaidUnsuccessful", async (playerAddress) => {
            await updateUI()
            setNotificationMessage("Raid was Unsuccessful. You have lost a life")
            setNotificationTitle("Raid UNSuccesfull")
            handleNotification()
        })
        //event for raid attempts
    }

    const handleSuccess = async (tx) => {
        updateUI()
    }

    const handleNotification = () => {
        dispatch({
            type: "info",
            message: notificationMessage,
            title: notificationTitle,
            position: "topR",
            icon: "check",
        })
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            // ;async () => {
            //     // Your asynchronous code here
            //     // playerInformation = await getPlayer()
            //     // const data = await playerInformation.json()
            //     // console.log(data)
            // }
            updateUI()
            listenEvents()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        enableWeb3()
    }, [])

    return (
        <div className="container my-24 mx-auto md:px-6">
            <section className="mb-32">
                <div className="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[url(/images/ChineseThemedBackground.png)] h-[500px]">
                    <Header />
                    <div className="w-1/3  text-white text-sm font-bold p-4 bg-[hsla(0,0%,0%,0.70)] rounded-lg shadow-md sm:text-base sm:text-xs">
                        <div class="grid grid-cols-2">
                            <div class="p-4 border border-gray-500">Username:</div>
                            <div class="p-4 border border-gray-500">{playerDetails.Username}</div>
                            <div class="p-4 border border-gray-500">XP</div>
                            <div class="p-4 border border-gray-500">{playerDetails.XP}</div>
                            <div class="p-4 border border-gray-500">Rank</div>
                            <div class="p-4 border border-gray-500">{playerDetails.Rank}</div>
                            <div class="p-4 border border-gray-500">Lives</div>
                            <div class="p-4 border border-gray-500">
                                {playerDetails.raidAttempts}
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.45)] bg-fixed">
                        <div className="absolute top-8 right-0 bottom-0 left-20 h-full w-full overflow-hidden bg-fixed">
                            <div className="flex h-full items-center justify-center">
                                <div className="px-6 text-center text-white md:px-12">
                                    <h2 className="mb-12 text-5xl font-bold leading-tight tracking-tight">
                                        Are you ready <br />
                                        <span>for an adventure?</span>
                                    </h2>
                                    <button
                                        type="button"
                                        className="rounded border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200"
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        onClick={async () => {
                                            await lvl1Raid({
                                                onSuccess: handleSuccess,
                                                onError: (error) => {
                                                    console.log(error)
                                                },
                                            })
                                        }}
                                        disabled={isLoading || isFetching}
                                    >
                                        Raid
                                    </button>
                                    <div className="mt-10">
                                        <Link href="/home">
                                            <button
                                                type="button"
                                                className="rounded border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200"
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                            >
                                                Back to Home Page
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
