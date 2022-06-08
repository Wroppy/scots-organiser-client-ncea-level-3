import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./GoelViewer.scss";
import {Check, Clear} from "@mui/icons-material";
import {green} from "@mui/material/colors";

export default function GoalViewer(props) {
    let goal = props.goal;
    console.log(goal);


    return <><Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <div className="accordion-summary">
                <span>
                    {goal.name}
                </span>
                <span className="goal-completed-container">
                    {/* If it is completed, show the green check, otherwise, show red cross*/}
                    {/*Completed: {goal.completed ? <Check color="primary"/> : <Clear color="error"/>}*/}
                    Completed: { <Check sx={{color: green[500]}}/>}

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

                {/*<ConfirmModal onConfirm={deleteSubject} title="Are You Sure You Want To Delete?"*/}
                {/*              buttonProps={{variant: "outlined", size: "small"}} confirmText="Yes" rejectText="No"*/}
                {/*              openModalText="Delete"/>*/}

                {/*<EditSubjectModal editSubject={props.editSubject} subject={props.subject}/>*/}

            </div>
        </AccordionDetails>
    </Accordion>
    </>
}