import { Modal, Input, useNotification } from "web3uikit"
import { useEffect, useState } from "react"
import {
    GamecontractAddress,
    Gameabi,
    providerURLs,
    LootcontractAddress,
    Lootabi,
} from "../constants/index"

export default function RaidModal({ onClose, isVisible, raidStatus }) {
    console.log("raidStatus", raidStatus)
    return (
        <div>
            <Modal
                isVisible={isVisible}
                onCancel={onClose}
                onCloseButtonPressed={onClose}
                onOk={() => {
                    {
                        onClose
                    }
                }}
            >
                {raidStatus ? <div>Raid Successfull</div> : <div>Raid Unsuccessfull</div>}
            </Modal>
        </div>
    )
}
