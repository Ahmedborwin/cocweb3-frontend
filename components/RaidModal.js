import { Modal, Input, useNotification } from "web3uikit"
import { useEffect, useState } from "react"
import {
    GamecontractAddress,
    Gameabi,
    providerURLs,
    LootcontractAddress,
    Lootabi,
} from "../constants/index"

export default function RaidModal({ onClose, isVisible }) {
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
                <div>Raid Successfull I guess</div>
            </Modal>
        </div>
    )
}
