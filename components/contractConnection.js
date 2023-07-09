import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"

const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()

export const chainId = parseInt(chainIdHex)

export const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")

export const CoCWeb3Address = chainId in contractAddresses ? contractAddresses[chainId][0] : null

export const {
    runContractFunction: createNewPlayer,
    isFetching,
    isLoading,
} = useWeb3Contract({
    abi: abi,
    contractAddress: CoCWeb3Address,
    functionName: "createNewPlayer",
    params: { _name: "Ahmed" },
})

export const { runContractFunction: getPlayer } = useWeb3Contract({
    abi: abi,
    contractAddress: CoCWeb3Address,
    functionName: "getPlayer",
    params: { _player: account },
})
