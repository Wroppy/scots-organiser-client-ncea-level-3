import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";
import "./AddGoalsModal.scss";
import {useState, useContext} from "react";
import {Modal, TextField} from "@mui/material";
import LoadingButton from "../../../LoadingButton/LoadingButton";
import {GoalsContext, LoadingContext} from "../../GoalsPage";

export default function AddGoalsModal() {
    const [open, setOpen] = useState(false);
    const [formError, setFormError] = useState("error");
    const isPageLoading = useContext(LoadingContext);
    const [goals, setGoals] = useContext(GoalsContext);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }



    return <>
        <Button disabled={isPageLoading} onClick={handleOpen} className="add-goals-button" variant="outlined">
            <Add/>
        </Button>
        <Modal className="add-goals-modal-container" open={open} onClose={handleClose}>
            <div className="add-goals-modal-content">
                <form className="add-goals-modal-form">
                    <div className="add-goals-modal-header">
                        <span>
                            Add A Goal
                        </span>
                    </div>
                    <div className="add-goals-modal-content">
                        <TextField className="add-goals-text-area" label="Goal Name" fullWidth={true}/>
                        <TextField className="add-goals-text-area" multiline={true} rows={5}
                                   label="Goal Description" fullWidth={true}/>
                    </div>
                    <div className="add-goals-modal-footer">
                        <span className="add-goals-error-text">
                            {formError}
                        </span>
                        <LoadingButton className="add-goals-modal-button" variant="outlined">
                            Add Goal
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </Modal>
    </>
}