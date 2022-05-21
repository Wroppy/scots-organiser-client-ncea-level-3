import {useState} from "react";
import TextField from "@mui/material/TextField";
import "./UserForm.scss";
import Button from "@mui/material/Button";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

function UserForm(props) {
    // Hooks for the text fields, along with the error messages
    const [username, setUsername] = useState("");
    const [usernameErrorMsg, setUsernameErrorMsg] = useState("");

    const [password, setPassword] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

    const [name, setName] = useState("");
    const [nameErrorMsg, setNameErrorMsg] = useState("");

    const [email, setEmail] = useState("");
    const [emailErrorMsg, setEmailErrorMsg] = useState("");

    const [loading, setLoading] = useState(false);

    // Function for the form submit
    const handleSubmit = props.submit;

    // Function for the form heading
    const heading = props.heading;

    // Hook for whether the user wants the password to be shown
    const [showPassword, setShowPassword] = useState(false);

    // For if the user wants a name and an email field in the form
    const showRegisterFields = props.showRegisterFields;

    // Gets the footer text and link
    const footerText = props.footerText;
    const footerLink = props.footerPath;
    const footerLinkText = props.footerPathText;

    // function for the form onSubmit
    const formSubmit = (e) => {
        e.preventDefault();
        if (showRegisterFields) {
            handleSubmit(name, username, password, email, setNameErrorMsg, setUsernameErrorMsg, setPasswordErrorMsg, setEmailErrorMsg, setLoading);
            return;
        }
        handleSubmit(username, password, setUsernameErrorMsg, setPasswordErrorMsg, setLoading);
    }

    // Toggles the password visibility
    const passwordShowClicked = () => {
        setShowPassword(!showPassword);
    }

    // Prevent default
    const passwordShowPressDown = (e) => {
        e.preventDefault();
    }

    // Icon for the toggle on and off icon
    const passwordInputAdornment = () => {
        return <IconButton onMouseDown={passwordShowPressDown} onClick={passwordShowClicked} edge="end" aria-label="toggle
                show password">
            {showPassword ? <Visibility/> : <VisibilityOff/>}
        </IconButton>
    }

    return <form className={`${props.formClassName} user-form-container`} onSubmit={formSubmit}>
        <div className="user-form-header">
            {heading}
        </div>
        <div className="user-form-body">
            {/* Conditional rendering if the name field needs to be on */}
            {showRegisterFields && <TextField required={true} autoComplete="off" className="form-text-field"
                                              error={nameErrorMsg.length > 0} helperText={nameErrorMsg}
                                              variant="outlined"
                                              label="First Name" value={name} onChange={(e) => {
                setName(e.currentTarget.value);
            }}/>
            }
            {showRegisterFields && <TextField required={true} autoComplete="off" className="form-text-field"
                                              error={emailErrorMsg.length > 0} helperText={emailErrorMsg}
                                              variant="outlined"
                                              label="Email" value={email} onChange={(e) => {
                setEmail(e.currentTarget.value);
            }}/>}


            <TextField required={true} autoComplete="off" className="form-text-field"
                       error={usernameErrorMsg.length > 0} helperText={usernameErrorMsg} varient="outlined"
                       label="Username" value={username}
                       onChange={(e) => {
                           setUsername(e.currentTarget.value)
                       }}/>
            <TextField required={true} autoComplete="off" className="form-text-field"
                       error={passwordErrorMsg.length > 0} helperText={passwordErrorMsg}
                       type={showPassword ? "text" : "password"} varient="outlined" label="Password"
                       value={password}
                       onChange={(e) => {
                           setPassword(e.currentTarget.value)
                       }} InputProps={{endAdornment: passwordInputAdornment()}}/>
        </div>
        <div className="user-form-footer">
            {/* Links to a path given through props */}
            <span>{footerText} <Link className="user-footer-link" to={footerLink}>{footerLinkText}</Link></span>
            <Button loading={loading} variant="contained" type="submit">
                Submit
            </Button>
        </div>
    </form>
}

export default UserForm;