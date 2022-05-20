import UserForm from './../UserForm/UserForm';
import "./Register.scss";
import {isNameValid, isUsernameValid, isPasswordValid} from "../user_validation";

// Component: Register
// Description: Register form

function Register(props) {
    const handleSubmit = (name, username, password, setNameError, setUsernameError, setPasswordError) => {
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

        console.log(`Registering user ${name} with username ${username} and password ${password}`);
    }


    return <div className="register-page-container">
        <UserForm formClassName="register-form-container" heading="Register" showNameField={true} submit={handleSubmit}
                  footerText="Already have an account? Login" footerPath="/login" footerPathText="here"/>
    </div>
}

export default Register;