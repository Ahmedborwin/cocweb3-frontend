import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"

const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
const chainId = parseInt(chainIdHex)

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")

const CoCWeb3Address = chainId in contractAddresses ? contractAddresses[chainId][0] : null

module.exports = { chainId, provider, CoCWeb3Address }
