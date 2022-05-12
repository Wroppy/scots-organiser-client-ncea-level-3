import {useState} from "react";
import TextField from "@mui/material/TextField";
import "./UserForm.scss";
import Button from "@mui/material/Button";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {IconButton, InputAdornment} from "@mui/material";

function UserForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = props.submit;
    const heading = props.heading;

    const showNameField = props.showNameField;
    const [name, setName] = useState("");
    const [nameErrorMsg, setNameErrorMsg] = useState("");
    const handleNameChange = (event) => {
        setName(event.currentTarget.value);
    }


    const formSubmit = (e) => {
        e.preventDefault();
        handleSubmit(username, password);
    }
    const passwordShowClicked = () => {
        setShowPassword(!showPassword);
    }
    const passwordShowPressDown = (e) => {
        e.preventDefault();
    }

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
            {showNameField && <TextField required={true} autoComplete="off" className="form-text-field"
                                         error={nameErrorMsg.length > 0} helperText={nameErrorMsg}
                                         variant="outlined"
                                         label="Name" value={name} onChange={handleNameChange}/>}

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