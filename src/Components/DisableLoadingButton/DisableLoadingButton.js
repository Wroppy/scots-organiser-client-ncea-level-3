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
    let loading = props.loading;
    return <Button {...props}>
        {buttonText} {loading && <Loader/>} {props.showForwardArrow && <KeyboardArrowRight/>}
    </Button>
}