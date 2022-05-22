import React from "react";
import Button from "@mui/material/Button";
import Loader from "../UserInfoForm/UserForm/LoadingAnimation/Loader";


export default function LoadingButton(props) {
    let disabled = props.disabled
    return <Button variant="contained" type="submit" {...props}>
        Submit {disabled && <Loader/>}
    </Button>
}