import { useEffect, useState } from "react"

export default function PlayerDetails({ playerInformation }) {
    console.log(playerInformation)
    const [playerDetails, setPlayerDetails] = useState({
        Username: "",
        XP: 0,
        Rank: "",
        raidAttempts: 0,
    }) // player stats

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

    console.log(JSON.stringify(playerDetails))

    return (
        <>
            <div className="w-1/3  text-white text-sm font-bold p-4 bg-[hsla(0,0%,0%,0.70)] rounded-lg shadow-md sm:text-base sm:text-xs">
                <div class="grid grid-cols-2">
                    <div class="p-4 border border-gray-500">Username:</div>
                    <div class="p-4 border border-gray-500">{playerDetails.Username}</div>
                    <div class="p-4 border border-gray-500">XP</div>
                    <div class="p-4 border border-gray-500">{playerDetails.XP}</div>
                    <div class="p-4 border border-gray-500">Rank</div>
                    <div class="p-4 border border-gray-500">{playerDetails.Rank}</div>
                    <div class="p-4 border border-gray-500">Raid Attempts</div>
                    <div class="p-4 border border-gray-500">{playerDetails.raidAttempts}</div>
                </div>
            </div>
        </>
    )
}
