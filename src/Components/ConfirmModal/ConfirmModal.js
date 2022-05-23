import "./ConfirmModal.scss";
import {Modal} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import LoadingButton from "../LoadingButton/LoadingButton";


export default function ConfirmModal(props) {
    let buttonProps = {...props.buttonProps}
    const [open, setOpen] = useState(false);
    const openModal = (event) => {
        setOpen(true);
    };
    const [disabled, setDisabled] = useState(false);
    const closeModal = () => {
        if (disabled) {
            return;
        }
        setOpen(false)
    };

    const onConfirm = () => {
        if (disabled) {
            return;
        }
        setDisabled(true);
        props.onConfirm(closeModal);
        setDisabled(false);
    }

    return <>
        <Button {...buttonProps} onClick={openModal}>
            {props.openModalText}
        </Button>
        <Modal className="confirm-modal" open={open} onClose={closeModal}>
            <div className="modal-content">
                <div className="modal-header">
                    {props.title}
                </div>
                <div className="modal-body">
                    <LoadingButton onClick={onConfirm} buttonText={props.confirmText} disabled={disabled}/>
                    <Button disabled={disabled} onClick={closeModal}>
                        {props.rejectText}
                    </Button>
                </div>
            </div>
        </Modal>
    </>
}