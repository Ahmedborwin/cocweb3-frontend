import {
    GamecontractAddress,
    Gameabi,
    providerURLs,
    LootcontractAddress,
    Lootabi,
} from "../constants/index"
import NFTBox from "./NFTBox"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { Card, NftCard, useNotification } from "web3uikit"
import { ethers } from "ethers"

export default function ArmoryComponent() {
    const { chainId: chainIdHex, isWeb3Enabled, account, enableWeb3 } = useMoralis()

    const chainId = parseInt(chainIdHex).toString()

    //get provider
    const providerurl = chainId in providerURLs ? providerURLs[chainId] : null
    const provider = new ethers.providers.JsonRpcProvider(providerurl)

    //get contract addresses
    const CoCWeb3Address = chainId in GamecontractAddress ? GamecontractAddress[chainId][0] : null
    const LootContractAdress =
        chainId in LootcontractAddress ? LootcontractAddress[chainId][0] : null

    const [userTokenUriList, setUserTokenUriList] = useState([])
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")
    const [showModal, setShowModal] = useState(false)
    const hideModal = () => setShowModal(false)

    // user state hooks

    //get all token players Token URI's
    const { runContractFunction: getNftsOwnedbyPlayer } = useWeb3Contract({
        abi: Lootabi,
        contractAddress: LootContractAdress,
        functionName: "getNftsOwnedbyPlayer",
        params: {
            player: account,
        },
    })

    //get all token players Token URI's
    const { runContractFunction: LootWheelSpin } = useWeb3Contract({
        abi: Lootabi,
        contractAddress: LootContractAdress,
        functionName: "LootWheelSpinFromGameContract",
        params: {
            _player: account,
            _randomNumber: 70,
        },
    })

    async function updateUI() {
        const tokenList = await getNftsOwnedbyPlayer()
        setUserTokenUriList(tokenList)
    }

    const listenEvents = async () => {
        const LootContract = new ethers.Contract(LootContractAdress, Lootabi, provider)
        LootContract.on("AllTokenUrisbyAddress", async (tokenUriList, playerAddress) => {
            updateUI()
        })
    }

    const handleSuccess = async (tx) => {
        updateUI()
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
            listenEvents()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        enableWeb3()
    }, [])

    return (
        <div>
            <button
                type="button"
                className="rounded border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={async () => {
                    await LootWheelSpin({
                        onSuccess: handleSuccess,
                        onError: (error) => {
                            console.log(error)
                        },
                    })
                }}
                // disabled={isLoading || isFetching}
            >
                Spin the Wheel!
            </button>

            <div className="container mx-auto">
                <h1 className="py-4 px-4 font-bold text-2xl">Your Arsenal</h1>
                <div className="flex flex-wrap">
                    {userTokenUriList.map((tokenURI, index) => {
                        return (
                            <div>
                                <NFTBox tokenURI={tokenURI} key={index} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
