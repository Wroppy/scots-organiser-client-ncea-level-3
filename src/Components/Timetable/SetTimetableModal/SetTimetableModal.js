import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import {Add, KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {FormControl, InputLabel, MenuItem, MobileStepper, Modal, Select, Step, StepLabel} from "@mui/material";
import {useEffect, useState} from "react";
import "./SetTimetableModal.scss";
import TimetableHelpModal from "./TimetableHelpModal/TimetableHelpModal";
import DisableLoadingButton from "../../DisableLoadingButton/DisableLoadingButton";
import serverFetch from "../../../Fetches";

const steps = [
    "Set Your Subject Order",
    "Set Your Week A Period 1 Subject",
    "Set Your Week B Period 1 Subject"
];


export default function SetTimetableModal(props) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const maxSteps = steps.length;
    const [currentStep, setCurrentStep] = useState(0)
    const disabled = props.disabled;
    const subjectNames = props.subjectNames;

    const [weekA, setWeekA] = useState("");
    const [weekB, setWeekB] = useState("");
    let [subject1, setSubject1] = useState("");
    let [subject2, setSubject2] = useState("");
    let [subject3, setSubject3] = useState("");
    let [subject4, setSubject4] = useState("");
    let [subject5, setSubject5] = useState("");
    let [subject6, setSubject6] = useState("");
    let subjectOrder = [subject1, subject2, subject3, subject4, subject5, subject6];
    let setSubjectOrder = [setSubject1, setSubject2, setSubject3, setSubject4, setSubject5, setSubject6];

    const [disableNextButton, setDisableNextButton] = useState(false);


    const clearTimetableModal = () => {
        setSubject1("");
        setSubject2("");
        setSubject3("");
        setSubject4("");
        setSubject5("");
        setSubject6("");
        setWeekA("");
        setWeekB("");
    }

    // Whenever a value changes such as the current step or the subject order, changes the disableNextButton state
    useEffect(() => {
        console.log("Changed");
        setDisableNextButton(isButtonDisabled());
    }, [weekA, weekB, subject1, currentStep, subject2, subject3, subject4, subject5, subject6])

    const isButtonDisabled = () => {
        switch (currentStep) {
            case 0:
                // Returns false if the subject order is not set
                return subjectOrder.includes("");
            case 1:
                return weekA === "";
            case 2:
                return weekB === "";
        }
    }

    const openModal = () => {
        setOpen(true);
    }

    // Essentially makes it so the 2 subjects can't be in 1 subject order
    // This works because subject name is unique to each subject and cannot be duplicated. This means it will not
    // mess up the disableSubjectNames function
    const disableSubjectNames = (subjectName) => {
        return subjectOrder.includes(subjectName);

    }


    const onClose = () => {
        // Closes the modal only if the modal is not loading
        if (isLoading) {
            return;
        }

        setOpen(false);
        setCurrentStep(0);
    }

    const submitForm = async () => {
        setIsLoading(true);

        // Gets the jwt auth token from the local storage
        const token = localStorage.getItem("userAuthToken");
        const body = {
            weekAStartingSubject: weekA,
            weekBStartingSubject: weekB,
            subjectOrder: subjectOrder
        }

        let response = await serverFetch("/set-timetable", body, {userAuthToken: token});
        let data = await response.json();

        if (data.valid) {
            onClose();

            // Clears the modal of any subjects
            clearTimetableModal()
            return;
        }

        // Displays an error message if the server returns an error
        alert(data.errorMessage);
    }

    const handleNext = () => {
        // If the current step is the last step, then submit the form
        if (currentStep === maxSteps - 1) {
            submitForm();
            setIsLoading(false);
            return;
        }

        setCurrentStep(currentStep + 1);
    }

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    }

    return <>
        <Tooltip title="Set Timetable">
            <Button disabled={disabled} variant="outlined" onClick={openModal}><Add/></Button>
        </Tooltip>
        <Modal className="set-timetable-modal" open={open} onClose={onClose}>
            <div className="timetable-modal-content">
                <div className="set-timetable-modal-header">
                    <span>Set Timetable:</span>
                    <TimetableHelpModal/>
                </div>
                <div className="set-timetable-modal-body">
                    <div className="set-timetable-modal-body-header">
                        {steps[currentStep]}
                    </div>
                    <div className="set-timetable-modal-body-content">

                        {/* For the steps */}
                        <div className="set-timetable-modal-steps"
                             style={(currentStep === 0) ? {display: "flex"} : {display: "none"}}>
                            <div>
                                {subjectOrder.map((subject, index) => {
                                    return <FormControl key={index} fullWidth={true}>
                                        <InputLabel id={`Subject ${index + 1}`}>Subject {index + 1}</InputLabel>
                                        <Select labelId={`Subject ${index + 1}`} disabled={isLoading} value={subject}
                                                label={`Subject ${index + 1}`} onChange={(event) => {
                                            let newSubject = event.target.value;
                                            setSubjectOrder[index](newSubject);
                                        }}>
                                            {subjectNames.map((subjectName, index) => {
                                                return <MenuItem disabled={disableSubjectNames(subjectName)} key={index}
                                                                 value={subjectName}>{subjectName}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>

                                })}
                            </div>
                        </div>
                        <div className="set-timetable-modal-steps"
                             style={(currentStep === 1) ? {display: "flex"} : {display: "none"}}>
                            <div>
                                Using the drop down box below, please input your Week A Period 1 Monday subject.
                            </div>
                            <div>
                                <FormControl fullWidth={true}>
                                    <InputLabel id="week-a-choose-subject">Choose Subject</InputLabel>
                                    <Select fullWidth={true} labelId="week-a-choose-subject" disabled={isLoading}
                                            label="Choose Subject" value={weekA}
                                            onChange={(event) => {
                                                setWeekA(event.target.value);
                                            }}>
                                        {subjectNames.map((subjectName, index) => {
                                            return <MenuItem value={subjectName} key={index}>{subjectName} </MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="set-timetable-modal-steps"
                             style={(currentStep === 2) ? {display: "flex"} : {display: "none"}}>
                            <div>
                                Using the drop down box below, please input your Week B Period 1 Monday subject.
                            </div>
                            <div>
                                <FormControl fullWidth={true}>
                                    <InputLabel id="week-b-choose-subject">Choose Subject</InputLabel>
                                    <Select fullWidth={true} labelId="week-b-choose-subject" disabled={isLoading}
                                            label="Choose Subject" value={weekB} onChange={(e) => {
                                        setWeekB(e.target.value);
                                    }}>
                                        {subjectNames.map((subjectName, index) => {
                                            return <MenuItem value={subjectName} key={index}>{subjectName} </MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="set-timetable-modal-footer">
                    <MobileStepper className="set-timetable-stepper" varient="text" steps={maxSteps} position="static"
                                   activeStep={currentStep}
                                   backButton={<Button disabled={(currentStep === 0) || isLoading}
                                                       onClick={handleBack}><KeyboardArrowLeft/>Back</Button>}
                                   nextButton={<DisableLoadingButton disabled={disableNextButton || isLoading}
                                                                     showForwardArrow={true}
                                                                     onClick={handleNext} loading={isLoading}
                                                                     buttonText={(currentStep === (maxSteps - 1)) ? "Submit" : "Next"}/>}>
                        {steps.map((step, index) => {
                                return <Step key={index}>
                                    <StepLabel>
                                        {step.label}
                                    </StepLabel>
                                </Step>
                            }
                        )}
                    </MobileStepper>
                </div>
            </div>
        </Modal>
    </>
}