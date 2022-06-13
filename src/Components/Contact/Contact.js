import "./Contact.scss";
import {TextField, Typography} from "@mui/material";
import {useState} from "react";
import LoadingButton from "../LoadingButton/LoadingButton";
import serverFetch from "../../Fetches";

export default function Contact(props) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState("    ");

    const formSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let token = localStorage.getItem("userAuthToken");
        let response = await serverFetch("/send-email", {name, message}, {userAuthToken: token})
        let data = await response.json();
        setLoading(false)

        if (!data.response){
            setFormError("Something went wrong. Please try again later.");
            setTimeout(() => {
                setFormError("");
            }, 5000);
        }else{
            // Clears the form
            setName("");
            setMessage("");

            // Tells the user that the form was submitted
            alert("Form has been submitted.")
        }

    }

    return <div className="contact-page-container">
        <form className="contact-form" onSubmit={formSubmit}>
            <div className="contact-form-text-body">
                Contact me by simply typing in your name into the name field, and your message into the message field
            </div>
            <div className="contact-form-text-fields">
                <TextField required fullWidth autoComplete="off" label="Name" value={name} onChange={(e) => {
                    setName(e.currentTarget.value)
                }} inputProps={{maxLength: 100}}/>
                <TextField required multiline rows={5} fullWidth autoComplete="off" label="Message" value={message}
                           onChange={(e) => {
                               setMessage(e.currentTarget.value)
                           }} inputProps={{maxLength: 2000}}/>

                <div className="form-button">
                    <Typography variant="error">
                        {formError}
                    </Typography>
                    <LoadingButton disabled={loading}
                                   buttonProps={{variant: "outlined", disabled: loading, type: "submit"}}/>
                </div>
            </div>
        </form>
    </div>
}