import { contractAddresses, abi, providerURLs } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState, Link } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"

export default function RookieRaid() {
    //let provider
    const { chainId: chainIdHex, isWeb3Enabled, account, enableWeb3 } = useMoralis()
    const chainId = parseInt(chainIdHex)

    const providerurl = chainId in providerURLs ? providerURLs[chainId] : null

    const provider = new ethers.providers.JsonRpcProvider(providerurl)

    const CoCWeb3Address = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [playerDetails, setPlayerDetails] = useState({ Username: "", XP: 0, Rank: "" })

    // raid button
    const {
        runContractFunction: lvl1Raid,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: CoCWeb3Address,
        functionName: "performUpkeep",
        params: { performData: [] },
    })

    const { runContractFunction: getPlayer } = useWeb3Contract({
        abi: abi,
        contractAddress: CoCWeb3Address,
        functionName: "getPlayer",
        params: { _player: account },
    })

    const getPlayerInfo = async () => {
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

        const rankTitle = getRankByIndex(playerInformation.rank)

        setPlayerDetails((prevState) => ({
            ...prevState,
            Username: playerInformation.username,
            XP: playerInformation.playerXP.toString(),
            Rank: rankTitle,
        }))

        //console.log(JSON.stringify(playerDetails))
    }

    async function updateUI() {
        await getPlayerInfo()
    }

    const listenEvents = async () => {
        const CoCWeb3 = new ethers.Contract(CoCWeb3Address, abi, provider)

        CoCWeb3.on("RaidSuccessful", async (playerAddress) => {
            console.log("Wallet Address for successfull raid is: ", playerAddress)
            updateUI()
        })
        CoCWeb3.on("RaidUnsuccessful", async (playerAddress) => {
            console.log("Wallet Address for unsuccessfull raid is: ", playerAddress)
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

    useEffect(() => {
        enableWeb3()
        // if (account) {
        //     updateUI()
        // }
    }, [])

    return (
        <>
            {/* {!playerDetails.Username && (
                <div>
                    <Link
                        className="border mt-10 px-8 py-2 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker"
                        href="/home"
                    >
                        Create New Player or LogIn on home screen
                    </Link>
                </div>
            )} */}
            {playerDetails.Username && (
                <div>
                    <h1 className="mb-10 text-3xl md:text-4xl lg:text-5xl font-bold underline">
                        Welcome <span className="text-blue-500">{playerDetails.Username}</span>.
                        Ready to Raid?
                    </h1>
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
                    <button
                        className="mb-5 mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
                        Raid!
                    </button>
                </div>
            )}
        </>
    )
}
