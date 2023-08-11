import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Card } from "web3uikit"
import { Rankabi, RankContractAddress, GamecontractAddress, Gameabi } from "../constants/index"
import Image from "next/image"

export default function PlayerDetails({ rankNeeded }) {
    //State hooks
    const { chainId: chainIdHex, isWeb3Enabled, account, enableWeb3 } = useMoralis()

    const [playerRankString, setPlayerRankString] = useState("")
    const [imageURI, setImageURI] = useState("")
    const [playerDetails, setPlayerDetails] = useState({
        Username: "",
        XP: 0,
        Rank: "",
        raidAttempts: 0,
    }) // player stats

    const chainId = parseInt(chainIdHex).toString()

    //get contract addresses
    const CoCWeb3Address = chainId in GamecontractAddress ? GamecontractAddress[chainId][0] : null

    const _RankContractAdress =
        chainId in RankContractAddress ? RankContractAddress[chainId][0] : null

    //get all token players Token URI's

    const { runContractFunction: getPlayer } = useWeb3Contract({
        abi: Gameabi,
        contractAddress: CoCWeb3Address,
        functionName: "getPlayer",
        params: { _player: account },
    })
    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: Gameabi,
        contractAddress: CoCWeb3Address,
        functionName: "getRankTokenUris",
        params: {
            rankIndex: 0,
        },
    })

    const getPlayerInfo = async () => {
        let rankTitle
        const playerInformation = await getPlayer()

        if (playerInformation) {
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
                setPlayerRankString(playerInformation.toString())
            }

            setPlayerDetails((prevState) => ({
                ...prevState,
                Username: playerInformation.username,
                Rank: rankTitle,
                XP: playerInformation.playerXP.toString(),
                raidAttempts: playerInformation.raidAttempts.toString(),
            }))
        }
    }

    const getRankBadge = async () => {
        const tokenURI = await getTokenURI()

        if (tokenURI) {
            // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            try {
                const response = await fetch(requestURL)
                const tokenURIResponse = await response.json()

                const imageURI = tokenURIResponse.image

                console.log("imageURI", imageURI)

                const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")

                setImageURI(imageURIURL)
            } catch (error) {
                // Handle error if fetch or JSON parsing fails
                console.error("Error fetching or parsing data:", error)
            }
        } else {
            console.log("no token URI buddy")
        }
    }

    async function updateUI() {
        await getPlayerInfo()
        await getRankBadge()
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled, account])

    useEffect(() => {
        enableWeb3()
    }, [])

    return (
        <div>
            <Card>
                {rankNeeded && (
                    <Card>
                        <Image
                            loader={() => imageURI}
                            src={imageURI}
                            height="200"
                            width="200"
                            alt="NFT Token"
                            unoptimized
                        />
                    </Card>
                )}

                <div className="grid grid-cols-2 ">
                    <div className="p-4 border className">Username:</div>
                    <div className="p-4 border classNametext-center">{playerDetails.Username}</div>
                    <div className="p-4 border ">XP:</div>
                    <div className="p-4 border classNametext-center">{playerDetails.XP}</div>
                    <div className="p-4 border ">Rank:</div>
                    <div className="p-4 border classNametext-center">{playerDetails.Rank}</div>
                    <div className="p-4 border ">Lives:</div>
                    <div className="p-4 border classNametext-center">
                        {playerDetails.raidAttempts}
                    </div>
                </div>
            </Card>
        </div>
    )
}
