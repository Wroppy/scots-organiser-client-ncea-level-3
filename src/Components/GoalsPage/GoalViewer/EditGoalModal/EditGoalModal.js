import Button from "@mui/material/Button";
import React, {useState} from "react";
import {FormControlLabel, Modal, Switch, TextField} from "@mui/material";
import LoadingButton from "../../../LoadingButton/LoadingButton";
import "./EditGoalModal.scss";
import useStateWithDep from "../../../Hooks/UseStateWithDep";
import serverFetch from "../../../../Fetches";

export default function EditGoalModal(props) {
    let [goalName, setGoalName] = useStateWithDep(props.goal.name);
    let [description, setDescription] = useStateWithDep(props.goal.description);
    const [goalCompleted, setGoalCompleted] = useStateWithDep(props.goal.completed);

    const [modalOpen, setModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(false)
    const [formError, setFormError] = useState("");

    const clearInputs = () => {
        setGoalCompleted("");
        setGoalName("");
        setDescription("");
    }
    const handleClose = () => {
        if (disabled) {
            return;
        }
        setModalOpen(false)
    }

    const handleOpen = () => {
        if (disabled) {
            return;
        }
        setModalOpen(true);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        // Edits the form;
        setDisabled(true);
        let body = {
            goalData: {
                goal_id: props.goal.goal_id,
                subject_name: "",
                name: goalName,
                completed: goalCompleted,
                description
            }
        }
        let token = localStorage.getItem("userAuthToken");

        let response = await serverFetch("/edit-goal", body, {userAuthToken: token});
        let data = await response.json();

        setDisabled(false);
        if (data.valid) {
            props.editGoal({
                goal_id: props.goal.goal_id,
                subject_name: "",
                name: goalName,
                completed: goalCompleted,
                description
            })
            handleClose()
            return;
        }
        setFormError(data.error);
    }


    return <>
        <Button variant="outlined" disabled={disabled} onClick={handleOpen}>
            Edit
        </Button>
        <Modal open={modalOpen} className="edit-goal-modal" onClose={handleClose}>
            <form className="edit-goal-form" onSubmit={onSubmit}>
                <div className="edit-goal-header">
                    Edit Goal:
                </div>
                <div className="edit-goal-body">
                    <TextField fullWidth label="Goal Name" inputProps={{maxLength: 50}} disabled={disabled}
                               autoComplete="off" required value={goalName} onChange={(e) => {
                        setGoalName(e.currentTarget.value);
                    }}/>
                    <div className="change-goal-completed">
                        <FormControlLabel
                            control={<Switch disabled={disabled} checked={goalCompleted} onChange={(e) => {
                                setGoalCompleted(e.currentTarget.checked)
                            }}/>}
                            label={`Change completion of the goal to ${goalCompleted ? "completed" : "not completed"}`}/>
                    </div>
                    <TextField fullWidth label="Goal Description" inputProps={{maxLength: 1000}} disabled={disabled}
                               autoComplete="off" multiline rows={5} value={description} onChange={(e) => {
                        setDescription(e.currentTarget.value);
                    }}/>
                </div>
                <div className="edit-goal-footer">
                    <div>
                        <span className="edit-goal-error">
                            {formError}
                        </span>
                    </div>
                    <div>
                        <Button disabled={disabled} variant="outlined" onClick={clearInputs}>
                            Clear Fields
                        </Button>
                        <LoadingButton buttonText="Edit Goal"
                                       buttonProps={{
                                           type: "submit",
                                           variant: "outlined",
                                           className: "edit-goal-button"
                                       }}/>
                    </div>
                </div>
            </form>
        </Modal>
    </>
}

