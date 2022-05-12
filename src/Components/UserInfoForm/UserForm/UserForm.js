import {useState} from "react";
import TextField from "@mui/material/TextField";
import "./UserForm.scss";
import Button from "@mui/material/Button";


function UserForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const handleSubmit = props.submit;
    const heading = props.heading;
    const formSubmit = (e) => {
        e.preventDefault();
        handleSubmit(username, password);
    }

    return <form className={`${props.formClassName} user-form-container`} onSubmit={formSubmit}>
        <div className="user-form-header">
            {heading}
        </div>
        <div className="user-form-body">
            <TextField required={true} autoComplete="off" className="form-text-field" error={usernameErrorMsg.length > 0} helperText={usernameErrorMsg} varient="outlined" label="Username" value={username}
                       onChange={(e) => {
                           setUsername(e.currentTarget.value)
                       }}/>
            <TextField required={true} autoComplete="off" className="form-text-field" error={passwordErrorMsg.length > 0} helperText={passwordErrorMsg}
                       type="password" varient="outlined" label="Password" value={password} onChange={(e) => {
                setPassword(e.currentTarget.value)
            }}/>
        </div>
        <div className="user-form-footer">
            <Button variant="contained" type="submit">
                Submit
            </Button>
        </div>
    </form>
}

export default UserForm