import { Card, useNotification } from "web3uikit"
import Image from "next/image"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"

export default function NFTBox({ tokenURI, tokentally }) {
    const { isWeb3Enabled, account } = useMoralis()
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")
    // const [tokenTally, setTokenTally] = ""

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

    return (
        <div>
            {imageURI ? (
                <div className="px-4 flex flex-col items-end gap-2 ">
                    <Card description={tokenDescription} cursorType="pointer">
                        <div>
                            <div>
                                {`You own: `}
                                <span className="font-bold underline">{tokentally}</span>
                                {` ${tokenName}'s`}
                            </div>
                            {/* <div className="italic text-sm">Owned by {formattedSellerAddress}</div> */}
                            <Image
                                loader={() => imageURI}
                                src={imageURI}
                                height="200"
                                width="200"
                                alt="NFT Token"
                            />
                        </div>
                    </Card>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}
