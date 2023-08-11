import React, { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { Card, NftCard, useNotification, Button } from "web3uikit"
import NFTBox from "./NFTBox"
import {
    GamecontractAddress,
    Gameabi,
    providerURLs,
    LootcontractAddress,
    Lootabi,
} from "../constants/index"

export default function ArmoryComponent() {
    let tokenList

    const { chainId: chainIdHex, isWeb3Enabled, account, enableWeb3 } = useMoralis()
    const chainId = parseInt(chainIdHex).toString()

    const providerurl = providerURLs[chainId] || null
    const provider = new ethers.providers.JsonRpcProvider(providerurl)

    const CoCWeb3Address = chainId in GamecontractAddress ? GamecontractAddress[chainId][0] : null
    const LootContractAddress =
        chainId in LootcontractAddress ? LootcontractAddress[chainId][0] : null

    const [userTokenUriObj, setUserTokenUriObj] = useState({})

    const [playerRankInteger, setPlayerRankInteger] = useState("")
    const [playerFound, setPlayerFound] = useState(false) // bool playerfound? used by render conidtions

    const { runContractFunction: getNftsOwnedbyPlayer } = useWeb3Contract({
        abi: Lootabi,
        contractAddress: LootContractAddress,
        functionName: "getNftsOwnedbyPlayer",
        params: {
            player: account,
        },
    })

    const { runContractFunction: RookieRaidTest } = useWeb3Contract({
        abi: Gameabi,
        contractAddress: CoCWeb3Address,
        functionName: "callRookieRaidTest",
        params: { _player: account, _randomNumber: 60, manualXP: true },
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

    async function getplayerNFTS() {
        try {
            const tokenURIObj = {}
            for (const tokenURI of tokenList) {
                tokenURIObj[tokenURI] = (tokenURIObj[tokenURI] || 0) + 1
            }
            setUserTokenUriObj(tokenURIObj)
        } catch (error) {
            console.error("error fetching player", error)
        }
    }

    async function updateUI() {
        const playerFoundbool = await getPlayerFound()
        if (playerFoundbool) {
            setPlayerFound(true)
            tokenList = await getNftsOwnedbyPlayer()
            await new Promise(async (resolve) => {
                if (tokenList) {
                    await getplayerNFTS()
                    resolve()
                }
            })
        }
    }

    const listenEvents = async () => {
        const LootContract = new ethers.Contract(LootContractAddress, Lootabi, provider)
        LootContract.on("LootNftMinted", async (tokenId, player, nftAddress) => {
            console.log("NFT Minted")
            updateUI()
        })
    }

    const handleSuccess = async () => {
        await listenEvents()
    }

    useEffect(() => {
        enableWeb3()
    }, [])

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        getplayerNFTS()
    }, [playerFound])

    return (
        <div>
            {playerFound ? (
                <div className="mb-5 mt-5 align-center ">
                    <Button
                        onClick={async () => {
                            await RookieRaidTest({
                                onSuccess: handleSuccess,
                                onError: (error) => {
                                    console.log(error)
                                },
                            })
                        }}
                        text="Test Raid"
                        size="large"
                        theme="primary"
                    ></Button>
                    <h1 className="container mx-auto py-4 px-4 font-bold text-2xl ">
                        Your Arsenal
                    </h1>

                    <div className="flex flex-wrap">
                        {Object.keys(userTokenUriObj).map((tokenURI, index) => (
                            <NFTBox
                                tokenURI={tokenURI}
                                tokentally={userTokenUriObj[tokenURI]}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div> No Player - go back to the home screen and create a player </div>
            )}
        </div>
    )
}
