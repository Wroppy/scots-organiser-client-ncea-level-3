import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./GoelViewer.scss";
import {Check, Clear} from "@mui/icons-material";
import {green} from "@mui/material/colors";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import serverFetch from "../../../Fetches";

export default function GoalViewer(props) {
    let goal = props.goal;
    console.log(goal);

    const deleteGoal = async (closeModal) => {
        // Deletes the goal
        let response = await serverFetch("/delete-goal", {goalID : goal.goal_id}, {userAuthToken: localStorage.getItem("userAuthToken")});
        let data = await response.json();
        if (data.valid) {
            closeModal();
            props.removeGoal(goal.goal_id);
        }
    }


    return <><Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <div className="accordion-summary">
                <span>
                    {goal.name}
                </span>
                <span className="goal-completed-container">
                    {/* If it is completed, show the green check, otherwise, show red cross*/}
                    Completed: {goal.completed ? <Check sx={{color: green[500]}}/> : <Clear color="error"/>}
                </span>
            </div>
        </AccordionSummary>
        <AccordionDetails>
            <div className="accordion-description">
                Description:
                <br/>
                {/* If there is no description it will inform the user there is no user*/}
                {goal.description.length === 0 ? "There is no description for this subject" : goal.description}
            </div>
            <div className="accordion-footer">

                <ConfirmModal onConfirm={deleteGoal} title="Are You Sure You Want To Delete?"
                              buttonProps={{variant: "outlined", size: "small"}} confirmText="Yes" rejectText="No"
                              openModalText="Delete"/>

                {/*<EditSubjectModal editSubject={props.editSubject} subject={props.subject}/>*/}

            </div>
        </AccordionDetails>
    </Accordion>
    </>
}