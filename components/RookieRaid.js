import {
    GamecontractAddress,
    Gameabi,
    providerURLs,
    LootcontractAddress,
    Lootabi,
} from "../constants/index"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"
import Link from "next/link"
import PlayerDetails from "./payerDetails"
import RaidModal from "./RaidModal"

export default function RookieRaid() {
    let playerInformation

    const dispatch = useNotification()
    //let provider
    const { chainId: chainIdHex, isWeb3Enabled, account, enableWeb3 } = useMoralis()
    const chainId = parseInt(chainIdHex)

    const providerurl = chainId in providerURLs ? providerURLs[chainId] : null

    const provider = new ethers.providers.JsonRpcProvider(providerurl)

    const CoCWeb3Address = chainId in GamecontractAddress ? GamecontractAddress[chainId][0] : null

    const [playerDetails, setPlayerDetails] = useState({
        Username: "",
        XP: 0,
        Rank: "",
        raidAttempts: 0,
    }) // player stats

    const [notificationMessage, setNotificationMessage] = useState("")
    const [notificationTitle, setNotificationTitle] = useState("")
    const [raidStatus, setRaidStatus] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const hideModal = () => setShowModal(false)

    // raid button
    const {
        runContractFunction: lvl1Raid,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: Gameabi,
        contractAddress: CoCWeb3Address,
        functionName: "performVRFRookieRaid",
        params: { _player: account },
    })

    //raid button
    const { runContractFunction: testRaid } = useWeb3Contract({
        abi: Gameabi,
        contractAddress: CoCWeb3Address,
        functionName: "callRookieRaidTest",
        params: { _player: account },
    })

    async function updateUI() {
        // how can i refresh the playerdetails component from here?
    }

    const listenEvents = async () => {
        const CoCWeb3 = new ethers.Contract(CoCWeb3Address, Gameabi, provider)
        CoCWeb3.on("RaidSuccessful", async (playerAddress) => {
            await updateUI()
            setNotificationMessage("Raid was Successful. You have gained XP")
            setNotificationTitle("Raid Succesfull")
            setRaidStatus(true)
            setShowModal(true)
        })
        CoCWeb3.on("RaidUnsuccessful", async (playerAddress) => {
            await updateUI()
            setNotificationMessage("Raid was Unsuccessful. You have lost a life")
            setNotificationTitle("Raid Unsuccesfull")
            handleNotification()
            setRaidStatus(false)
            setShowModal(true)
        })
        //event for raid attempts
    }

    const handleSuccess = async (tx) => {
        updateUI()
    }

    const handleNotification = () => {
        dispatch({
            type: "success",
            message: notificationMessage,
            title: notificationTitle,
            position: "topR",
        })
    }

    useEffect(() => {
        enableWeb3()
    }, [])
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
            listenEvents()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            {showModal ? (
                <div>
                    <RaidModal onClose={hideModal} isVisible={showModal} raidStatus={raidStatus} />
                </div>
            ) : (
                <div>
                    <div className="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[url(/images/ChineseThemedBackground.png)] h-[500px]">
                        <div className="flex">
                            <div id="playerDetailsCard" className=" w-1/3 px-7">
                                <PlayerDetails rankNeeded={true} />
                            </div>
                            <div
                                id="rookieRaidCTA"
                                className=" w-1/2 absolute top-0 right-0 bottom-0 left-0 h-full w-full bg-[hsla(0,0%,0%,0.45)] bg-fixed"
                            >
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
                                                <Link href="/">
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
                    </div>
                </div>
            )}
        </div>
    )
}
