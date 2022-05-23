import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./SubjectView.scss";

export default function SubjectView(props) {
    let subject = props.subject;
    console.log(subject)

    return <Accordion>
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
                    Background Colour: {<span style={{color: subject.background_colour}}>{subject.background_colour}</span>}
                </span>
            </div>
            <br/>
            <div className="accordion-description">
                Description:
                <br/>
                {/* If there is no description it will inform the user there is no user*/}
                {subject.description.length === 0 ? "There is no description for this subject" : subject.description}
            </div>
        </AccordionDetails>
    </Accordion>
}