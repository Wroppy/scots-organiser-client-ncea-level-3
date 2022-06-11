import React from "react";
import Button from "@mui/material/Button";
import Loader from "../UserInfoForm/UserForm/LoadingAnimation/Loader";
import {KeyboardArrowRight} from "@mui/icons-material";


export default function DisableLoadingButton(props) {
    let buttonText;
    if (props.buttonText === undefined){
        buttonText = "Submit";
    }
    else {
        buttonText = props.buttonText;
    }

    let buttonProps = {...props}
    delete buttonProps.loading;
    delete buttonProps.buttonText;
    delete buttonProps.showForwardArrow;
    return <Button {...buttonProps}>
        {buttonText} {props.loading && <Loader/>} {props.showForwardArrow && <KeyboardArrowRight/>}
    </Button>
}