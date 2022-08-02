import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function LotteryEntrance() {

    const [entranceFee, setEntranceFee] = useState("0")
    const [numOfPlayers, setNumOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("")


    const dispatch = useNotification();
    
    const {chainId: chainIdHex, isWeb3Enabled} = useMoralis();
    const chainId = parseInt(chainIdHex)
    const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    
    
    const { runContractFunction: enterLottery, isLoading, isFetching } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        msgValue: entranceFee,
        params: {},
    })
    
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getEntranceFee",
        params: {},
    })
    
    const { runContractFunction: getNumOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getNumOfPlayers",
        params: {},
    })
    
    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getRecentWinner",
        params: {},
    })
    
    
    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numOfPlayersFromCall = (await getNumOfPlayers()).toString()
        const recentWinnerFromCall = (await getRecentWinner()).toString()
        setEntranceFee(entranceFeeFromCall)
        setNumOfPlayers(numOfPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }
    
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])
    
    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }
    
    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell"
        })
    }
    
    return (
        <div className="p-5 place-content-center">
            <div className="text-center font-bold text-2xl py-7">"IF YOU DONT BUY A TICKET, YOU CANT WIN THE RAFFLE.."</div>
            { lotteryAddress ? (
                <div className="justify-items-center"> 
                    <div className="lotteryBtn">
                        <button
                                onClick={async function() {
                                    await enterLottery({
                                        onSuccess: handleSuccess,
                                        onError: (error => console.log(error)),
                                    })
                                }}
                                disabled={isLoading || isFetching}
                            >
                                {isLoading || isFetching ? (
                                    <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                                    ) : (
                                    <div>ENTER LOTTERY</div>
                                )}
                        </button>
                    </div>
                        <div className="font-bold">ENTRANCE FEE : {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>
                        <div className="font-bold">NUMBER OF PLAYERS : {numOfPlayers}</div>
                        <div className="font-bold">RECENT WINNER : {recentWinner}</div>
                </div>
            ) : (
            <div>No Raffle Address Detected</div>
            )}
            
        </div>
    )
}