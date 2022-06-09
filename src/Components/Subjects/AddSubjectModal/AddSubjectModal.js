import "./AddSubjectModal.scss";
import {Menu, Modal, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import React, {useRef, useState} from "react";
import LoadingButton from "../../LoadingButton/LoadingButton";
import serverFetch from "../../../Fetches";
import {ChromePicker} from "react-color";


export default function AddSubjectModal(props) {
    const disableAddButton = props.disableAddButton;

    const [open, setOpen] = useState(false);
    const [subjectName, setSubjectName] = useState("");
    const [teacherName, setTeacherName] = useState("");
    const [room, setRoom] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);

    const [subjectNameError, setSubjectNameError] = useState("");
    const [teacherNameError, setTeacherNameError] = useState("");
    const [roomError, setRoomError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const colorInput = useRef();

    let [backgroundColour, setBackgroundColour] = useState("#000000");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const colourPickerOpen = Boolean(anchorEl);

    const openColourPicker = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const closeColourPicker = () => {
        setAnchorEl(null);
    };

    const clearFields = () => {
        setSubjectName("");
        setTeacherName("");
        setRoom("");
        setDescription("");
        setBackgroundColour("#000000");
    }

    let addSubject = props.addSubject;

    const onSubmit = async (e) => {
        e.preventDefault();

        // subject name, teacher and room must be between 1 and 50 characters
        if (subjectName.length < 1 || subjectName.length > 50) {
            setSubjectNameError("Subject name must be between 1 and 50 characters");
            setTimeout(() => {
                setSubjectNameError("");
            }, 2000);
            return;
        }
        if (teacherName.length < 1 || teacherName.length > 50) {
            setTeacherNameError("Teacher name must be between 1 and 50 characters");
            setTimeout(() => {
                setTeacherNameError("");
            }, 2000);
            return;
        }
        if (room.length < 1 || room.length > 50) {
            setRoomError("Room must be between 1 and 50 characters");
            setTimeout(() => {
                setRoomError("");
            }, 2000);
            return;
        }
        if (description.length > 500) {
            setDescriptionError("Description must be less than 500 characters");
            setTimeout(() => {
                setDescriptionError("");
            }, 2000);
            return;
        }

        // If there are no errors, gets the data and sends it to the server
        // setDisabled(true);
        let body = {
            subjectName,
            teacherName,
            room,
            description,
            backgroundColour
        };

        // Gets the jwt token from local storage
        let token = localStorage.getItem("userAuthToken");
        setDisabled(true);

        let data = await serverFetch("/add-subject", body, {userAuthToken: token});
        let response = await data.json();
        setDisabled(false);
        if (response.valid) {
            setOpen(false);
            // Adds the subject to the list of subjects
            let subject = {
                subject_name: subjectName,
                teacher: teacherName,
                room,
                description,
                "background_colour": backgroundColour
            }
            addSubject(subject);
            clearFields();
            return;
        }
        setError(response.message);
        setTimeout(() => {
            setError("");
        }, 2000);

    }
    const onClose = () => {
        if (disabled) {
            return;
        }
        setOpen(false);
    }


    return <>
        <Button disabled={disableAddButton} className="subject-add-button" variant="outlined"
                onClick={e => setOpen(true)}>
            <Add/>
        </Button>

        <Modal className="add-subject-modal" open={open} onClose={onClose}>
            <form onSubmit={onSubmit}>
                <div className="add-subject-header">
                    Add Subject:
                </div>
                <TextField required size="small" autoComplete="off" className="subject-name-input form-field"
                           label="Add Subject" disabled={disabled} error={subjectNameError > 0}
                           helperText={subjectNameError}
                           value={subjectName} onChange={e => setSubjectName(e.currentTarget.value)}/>

                <TextField required size="small" autoComplete="off" className="teacher-name-input form-field"
                           label="Teacher" disabled={disabled} error={teacherNameError > 0}
                           helperText={teacherNameError}
                           value={teacherName} onChange={e => setTeacherName(e.currentTarget.value)}/>

                <TextField required size="small" autoComplete="off" className="room-name-input form-field" label="Room"
                           disabled={disabled} error={roomError > 0} helperText={roomError} value={room}
                           onChange={e => setRoom(e.currentTarget.value)}/>

                <div className="colour-input-div form-field">
                    {/*Colour picker*/}
                    <span>
                        Background Colour: {backgroundColour}
                    </span>
                    <Button style={{backgroundColor: backgroundColour}} size="small" variant="contained"
                            onClick={openColourPicker}>
                        Edit Colour
                    </Button>
                    <Menu open={colourPickerOpen} onClose={closeColourPicker} anchorEl={anchorEl}>
                        <ChromePicker color={backgroundColour} onChange={(colour) => setBackgroundColour(colour.hex)}/>
                    </Menu>
                </div>

                <TextField size="small" autoComplete="off" className="description-input form-field" label="Description"
                           rows={5} value={description} onChange={e => setDescription(e.currentTarget.value)}
                           multiline={true} disabled={disabled} error={descriptionError > 0}
                           helperText={descriptionError}/>
                <div className="form-footer">
                    <span>
                        {error}
                    </span>
                    <div>
                        <Button disabled={disabled} className="clear-fields-button" variant="outlined"
                                onClick={clearFields}>
                            Clear Fields
                        </Button>
                        <LoadingButton buttonProps={{type: "submit", variant: "outlined", disabled: disabled}}
                                       disabled={disabled}
                                       className="add-subject-button"
                        >Add
                            Subject</LoadingButton>
                    </div>
                </div>
            </form>
        </Modal>
    </>
}