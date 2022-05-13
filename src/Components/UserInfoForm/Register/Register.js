import UserForm from './../UserForm/UserForm';
import "./Register.scss";

// Component: Register
// Description: Register form

function Register(props) {
    return <div className="register-page-container">
        <UserForm formClassName="register-form-container" heading="Register" showNameField={true}/>
    </div>
}

export default Register;