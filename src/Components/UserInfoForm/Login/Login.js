// Login page for the website

import UserForm from './../UserForm/UserForm';
import "./Login.scss";

function Login(props) {

    return <div className="login-page-container">
        <UserForm formClassName="login-form-container" heading="Login" showNameField={false}/>
    </div>
}

export default Login;