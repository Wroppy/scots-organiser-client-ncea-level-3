import UserForm from './../UserForm/UserForm';
import "./Register.scss";

function Register(props) {
    props.setCurrentHeader("Register");
    return <div className="register-page-container">
        <UserForm formClassName="register-form-container" heading="Register"/>
    </div>
}

export default Register;