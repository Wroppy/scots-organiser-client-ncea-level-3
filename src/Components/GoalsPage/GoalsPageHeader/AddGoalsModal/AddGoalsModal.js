import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";
import "./AddGoalsModal.scss";
import {useState, useContext} from "react";
import {Modal, TextField} from "@mui/material";
import LoadingButton from "../../../LoadingButton/LoadingButton";
import {GoalsContext, LoadingContext} from "../../GoalsPage";
import serverFetch from "../../../../Fetches";

export default function AddGoalsModal() {
    const [open, setOpen] = useState(false);
    const [formError, setFormError] = useState("");
    const isPageLoading = useContext(LoadingContext);
    const [goals, setGoals] = useContext(GoalsContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isFormFetching, setIsFormFetching] = useState(false);

    const handleFormSubmit = async (e) => {
        console.log("set goal")
        e.preventDefault();
        setIsFormFetching(true);
        let body = {
            goalsData: {
                name,
                description,
                completed: false,
                subjectName: ""
            }
        }

        const clearFields = () => {
            setDescription("");
            setName("");
        }

        let token = localStorage.getItem("userAuthToken");
        let response = await serverFetch("/add-goal", body, {userAuthToken: token});
        let data = await response.json();
        console.log(data);
        setIsFormFetching(false);
        clearFields();
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (isFormFetching) {
            return;
        }
        setOpen(false);
    }

    return <>
        <Button disabled={isPageLoading} onClick={handleOpen} className="add-goals-button" variant="outlined">
            <Add/>
        </Button>
        <Modal className="add-goals-modal-container" open={open} onClose={handleClose}>
            <div className="add-goals-modal-content">
                <form className="add-goals-modal-form" onSubmit={handleFormSubmit}>
                    <div className="add-goals-modal-header">
                        <span>
                            Add A Goal
                        </span>
                    </div>
                    <div className="add-goals-modal-content">
                        <TextField disabled={isFormFetching} inputProps={{maxLength: 50}}
                                   className="add-goals-text-area" label="Goal Name"
                                   fullWidth={true} required={true}
                                   value={name} onChange={(e) => {
                            setName(e.currentTarget.value);
                        }}
                        />
                        <TextField disabled={isFormFetching} inputProps={{maxLength: 1000}}
                                   className="add-goals-text-area" multiline={true}
                                   rows={5}
                                   label="Goal Description" fullWidth={true}
                                   value={description} onChange={(e) => {
                            setDescription(e.currentTarget.value);
                        }}
                        />
                    </div>
                    <div className="add-goals-modal-footer">
                        <span className="add-goals-error-text">
                            {formError}
                        </span>
                        <LoadingButton className="add-goals-modal-button"
                                       buttonProps={{variant: "outlined", type: "submit", disabled: isFormFetching}}
                                       buttonText="Add Goal" disabled={isFormFetching}>
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </Modal>
    </>
}