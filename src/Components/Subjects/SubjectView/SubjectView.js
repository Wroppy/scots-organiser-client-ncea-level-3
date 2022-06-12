import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./SubjectView.scss";
import EditSubjectModal from "./EditSubjectModalBox/EditSubjectModal";
import Button from "@mui/material/Button";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import serverFetch from "../../../Fetches";

export default function SubjectView(props) {
    let subject = props.subject;

    let deleteSubject = async (closeModal) => {
        // Deletes the subject
        let response = await serverFetch("/delete-subject", {subjectName: subject.subject_name}, {userAuthToken: localStorage.getItem("userAuthToken")});
        let data = await response.json();
        if (data.valid) {
            closeModal();
            props.removeSubject(subject.subject_name);
        }
    }

    return <><Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <div className="accordion-summary">
                <span>
                    {subject.subject_name}
                </span>
                <span>
                    {subject.teacher}
                </span>
            </div>
        </AccordionSummary>
        <AccordionDetails>
            <div className="accordion-details">
                <span>
                    Room: {subject.room}
                </span>
                <span>
                    Background Colour: {<span
                    style={{color: subject.background_colour}}>{subject.background_colour}</span>}
                </span>
            </div>
            <br/>
            <div className="accordion-description">
                Description:
                <br/>
                {/* If there is no description it will inform the user there is no user*/}
                {subject.description.length === 0 ? "There is no description for this subject" : subject.description}
            </div>
            <div className="accordion-footer">
                <Typography variant="error">
                    Deleting may change timetable!
                </Typography>
                <ConfirmModal onConfirm={deleteSubject} title="Are You Sure You Want To Delete?"
                              buttonProps={{variant: "outlined", size: "small"}} confirmText="Yes" rejectText="No"
                              openModalText="Delete"/>
                <EditSubjectModal editSubject={props.editSubject} subject={props.subject}/>

            </div>
        </AccordionDetails>
    </Accordion>
    </>
}