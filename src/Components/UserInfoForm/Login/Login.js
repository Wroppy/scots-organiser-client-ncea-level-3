// Login page for the website

import UserForm from './../UserForm/UserForm';
import "./Login.scss";
import {isPasswordValid, isUsernameValid} from "../user_validation";
import React, {useState} from "react";
import serverFetch from "../../../Fetches";

function Login(props) {
    const [disableUserForm, setDisableUserForm] = useState(false);
    const [userFormError, setUserFormError] = useState("");
    let handleSubmit = async (username, password, setUsernameError, setPasswordError) => {
        setDisableUserForm(true);
        const timeout = 2000
        let usernameValid = isUsernameValid(username);
        if (!usernameValid.valid) {
            setUsernameError(usernameValid.error);
            setTimeout(() => setUsernameError(""), timeout);
            setDisableUserForm(false);
            return;
        }
        let passwordValid = isPasswordValid(password);
        if (!passwordValid.valid) {
            setPasswordError(passwordValid.error);
            setTimeout(() => setPasswordError(""), timeout);
            setDisableUserForm(false);
            return;
        }

        console.log(`Logging into ${username} with password ${password}`);
        let response = await serverFetch("/login-user", {username, password});
        let data = await response.json();
        console.log(data);
        if (!data.valid) {
            setUserFormError(data.error);
            setTimeout(() => setUserFormError(""), timeout);
            setDisableUserForm(false);
            return;
        }
        setDisableUserForm(false);
        localStorage.setItem("userAuthToken", data.JWTAuthToken);

    }


    return <div className="login-page-container">
        <UserForm userFormError={userFormError} formClassName="login-form-container" heading="Login" showRegisterFields={false} submit={handleSubmit}
                  disableUserForm={disableUserForm} footerText="Don't have an account? Register" footerPath="/register" footerPathText="here"/>
    </div>
}

export default Login;