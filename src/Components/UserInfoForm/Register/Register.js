import UserForm from './../UserForm/UserForm';
import "./Register.scss";
import {isNameValid, isUsernameValid, isPasswordValid, isEmailValid} from "../user_validation";
import React from "react";
import serverFetch from "../../../Fetches";

// Component: Register
// Description: Register form

function Register(props) {
    const handleSubmit = async (name, username, password, email, setNameError, setUsernameError, setPasswordError, setEmailError, setLoading) => {
        const timeout = 2000
        let nameValid = isNameValid(name);
        if (!nameValid.valid) {
            setNameError(nameValid.error);
            setTimeout(() => setNameError(""), timeout);
            return;
        }

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

        let emailValid = isEmailValid(email);
        if (!emailValid.valid) {
            setEmailError(emailValid.error);
            setTimeout(() => setEmailError(""), timeout);
            return;
        }
        //  Disables the buttons
        setLoading(true);

        let body = {name, username, password, email};
        let data = await (await serverFetch("/register-user", body)).json()
        console.log(data);

        // If it is not valid, it will display an error message
        if (!data.valid){
            return;
        }

        // If it is valid, it will add the JWT token to the local storage
        localStorage.setItem("userAuthToken", data.JWTAuthToken);
    }

    return <div className="register-page-container">
        <UserForm formClassName="register-form-container" heading="Register" showRegisterFields={true}
                  submit={handleSubmit}
                  footerText="Already have an account? Login" footerPath="/login" footerPathText="here"/>
    </div>
}

export default Register;