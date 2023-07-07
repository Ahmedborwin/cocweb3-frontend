import { useEffect, useState } from "react"

export default function PlayerDetails(playerInformation) {
    const [playerDetails, setPlayerDetails] = useState([])
    const rankDisplay = () => {
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
    }
    const rank = rankDisplay(playerInformation.rank)

    const playerArray = []

    playerArray.push(playerInformation.username, playerInformation.playerXP.toString(), rank)
    setPlayerDetails(playerArray)

    return (
        <>
            {playerDetails.map((player, index) => (
                <ul key={index}>{player}</ul>
            ))}
        </>
    )
}
