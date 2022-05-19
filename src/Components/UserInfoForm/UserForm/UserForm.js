import {useState} from "react";
import TextField from "@mui/material/TextField";
import "./UserForm.scss";
import Button from "@mui/material/Button";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {IconButton, InputAdornment} from "@mui/material";

function UserForm(props) {
    // Hooks for the text fields, along with the error messages
    const [username, setUsername] = useState("");
    const [usernameErrorMsg, setUsernameErrorMsg] = useState("");

    const [password, setPassword] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

    const [name, setName] = useState("");
    const [nameErrorMsg, setNameErrorMsg] = useState("");

    // Function for the form submit
    const handleSubmit = props.submit;

    // Function for the form heading
    const heading = props.heading;

    // Hook for whether the user wants the password to be shown
    const [showPassword, setShowPassword] = useState(false);

    // For if the user wants a name field in the form
    const showNameField = props.showNameField;

    // function for the form onSubmit
    const formSubmit = (e) => {
        e.preventDefault();
        if (showNameField) {
            handleSubmit(name, username, password, setNameErrorMsg, setUsernameErrorMsg, setPasswordErrorMsg);
            return;
        }
        handleSubmit(username, password, setUsernameErrorMsg, setPasswordErrorMsg);
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
            {showNameField && <TextField required={true} autoComplete="off" className="form-text-field"
                                         error={nameErrorMsg.length > 0} helperText={nameErrorMsg}
                                         variant="outlined"
                                         label="Name" value={name} onChange={(e) => {
                setName(e.currentTarget.value);
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
            <Button variant="contained" type="submit">
                Submit
            </Button>
        </div>
    </form>
}

export default UserForm