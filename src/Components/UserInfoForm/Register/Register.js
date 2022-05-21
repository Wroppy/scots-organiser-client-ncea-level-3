import UserForm from './../UserForm/UserForm';
import "./Register.scss";
import {isNameValid, isUsernameValid, isPasswordValid, isEmailValid} from "../user_validation";
import React from "react";
import getTestFetch from "../../../Fetches";

// Component: Register
// Description: Register form

function Register(props) {
    const  handleSubmit = async (name, username, password, email, setNameError, setUsernameError, setPasswordError, setEmailError, setLoading) => {
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
        console.log(`Registering user ${name} with email ${email} username ${username} and password ${password}`);
        //  Disables the buttons
        setLoading(true);

        let data = await (await getTestFetch("/hello")).text()

        console.log(data);
    }


    return <div className="register-page-container">
        <UserForm formClassName="register-form-container" heading="Register" showRegisterFields={true}
                  submit={handleSubmit}
                  footerText="Already have an account? Login" footerPath="/login" footerPathText="here"/>
    </div>
}

export default Register;