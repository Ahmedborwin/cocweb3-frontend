import { Card, useNotification } from "web3uikit"
import Image from "next/image"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"

export default function NFTBox({ tokenURI }) {
    const { isWeb3Enabled, account } = useMoralis()
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")

    useEffect(() => {
        async function fetchData() {
            // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            try {
                const response = await fetch(requestURL)
                const tokenURIResponse = await response.json()

                const imageURI = tokenURIResponse.image
                const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")

                setImageURI(imageURIURL)
                setTokenName(tokenURIResponse.name)
                setTokenDescription(tokenURIResponse.description)
            } catch (error) {
                // Handle error if fetch or JSON parsing fails
                console.error("Error fetching or parsing data:", error)
            }
        }

        fetchData()
    }, [tokenURI])

    // useEffect(() => {
    //     if (isWeb3Enabled) {
    //         updateUI()
    //     }
    // }, [isWeb3Enabled])

    return (
        <div>
            {imageURI ? (
                <Card title={tokenName} description={tokenDescription}>
                    <div className="p-2">
                        <div className="flex flex-col items-end gap-2">
                            {/* <div>#{tokenId}</div> */}
                            {/* <div className="italic text-sm">Owned by {formattedSellerAddress}</div> */}
                            <Image
                                loader={() => imageURI}
                                src={imageURI}
                                height="200"
                                width="200"
                                alt="NFT Token"
                            />
                            {/* <div className="font-bold">
                            {ethers.utils.formatUnits(price, "ether")} ETH
                        </div> */}
                        </div>
                    </div>
                </Card>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}
