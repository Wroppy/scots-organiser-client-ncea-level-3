// Login page for the website

import UserForm from './../UserForm/UserForm';
import "./Login.scss";
import {isPasswordValid, isUsernameValid} from "../user_validation";
import React, {useState} from "react";

function Login(props) {
    const [userFormError, setUserFormError] = useState("");
    let handleSubmit = (username, password, setUsernameError, setPasswordError) => {
        const timeout = 2000
        let usernameValid = isUsernameValid(username);
        if (!usernameValid.valid) {
            setUsernameError(usernameValid.error);
            setTimeout(() => setUsernameError(""), timeout);
            return;
        }
        let passwordValid = isPasswordValid(password);
        if (!passwordValid.valid) {
            setPasswordError(passwordValid.error);
            setTimeout(() => setPasswordError(""), timeout);
            return;
        }
        console.log(`Logging into ${username} with password ${password}`);
    }


    return <div className="login-page-container">
        <UserForm userFormError={userFormError} formClassName="login-form-container" heading="Login" showRegisterFields={false} submit={handleSubmit}
                  footerText="Don't have an account? Register" footerPath="/register" footerPathText="here"/>
    </div>
}

export default Login;