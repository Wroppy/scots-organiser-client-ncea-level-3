import React from "react";
import Button from "@mui/material/Button";
import Loader from "../UserInfoForm/UserForm/LoadingAnimation/Loader";


export default function LoadingButton(props) {
    let buttonText;
    if (props.buttonText === undefined){
        buttonText = "Submit";
    }
    else {
        buttonText = props.buttonText;
    }
    let disabled = props.disabled
    return <Button {...props}>
        {buttonText} {disabled && <Loader/>}
    </Button>
}