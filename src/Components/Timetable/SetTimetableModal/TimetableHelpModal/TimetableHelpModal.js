import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import {QuestionMark} from "@mui/icons-material";
import {Accordion, AccordionDetails, AccordionSummary, Icon, IconButton, Modal} from "@mui/material";
import {useState} from "react";
import "./TimetableHelpModal.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


export default function TimetableHelpModal(props) {
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    }

    return <>
        <Tooltip title="How does this work?">
            <IconButton className="set-timetable-help" variant="outlined" onClick={openModal}>
                <QuestionMark/>
            </IconButton>
        </Tooltip>
        <Modal className="timetable-help-modal" open={open} onClose={closeModal}>
            <div className="timetable-help-modal-content">
                <div className="timetable-help-modal-header">
                    <span>Questions About the Set Timetable Function </span>
                </div>
                <div className="timetable-help-modal-body">
                    <Accordion className="timetable-help-how-to-use">
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            How do I use this?
                        </AccordionSummary>
                        <AccordionDetails>
                            Simply go into your timetable on PC School or another timetable app and input the subjects
                            you have on week A and B Monday and Tuesday
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="timetable-how-it-works">
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            How does this work?
                        </AccordionSummary>
                        <AccordionDetails>
                            The order of the subjects is important. This is because the subject's order repeats itself.
                            For example, if English was after Physics, then for the 2 weeks, English will always be
                            after Physics. Because of this, as long as a full rotation of subjects is known, the rest of
                            the subject's period number can be inferred, the only thing that needs to be known is the
                            order of the subject, and the week it is on, as week A and B have different orders
                        </AccordionDetails>
                    </Accordion>

                </div>
            </div>
        </Modal>
    </>
}