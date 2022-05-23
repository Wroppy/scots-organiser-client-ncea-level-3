import "./EditSubjectModal.scss";
import {Menu, Modal, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useRef, useState} from "react";
import serverFetch from "../../../../Fetches";
import LoadingButton from "../../../LoadingButton/LoadingButton";
import {ChromePicker} from "react-color";


export default function EditSubjectModal(props) {
    const [open, setOpen] = useState(false);
    const [subjectName, setSubjectName] = useState(props.name);
    const [teacherName, setTeacherName] = useState(props.teacher);
    const [room, setRoom] = useState(props.room);
    const [description, setDescription] = useState(props.description);
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);

    const [subjectNameError, setSubjectNameError] = useState("");
    const [teacherNameError, setTeacherNameError] = useState("");
    const [roomError, setRoomError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const colorInput = useRef();
    let [backgroundColour, setBackgroundColour] = useState(props.backgroundColour);

    // let editSubject = props.editSubject;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const colourPickerOpen = Boolean(anchorEl);

    const openColourPicker = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const closeColourPicker = () => {
        setAnchorEl(null);
    };

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

        console.log(body);
        // Gets the jwt token from local storage
        // let token = localStorage.getItem("userAuthToken");
        // setDisabled(true);

        // let data = await serverFetch("/add-subject", body, {userAuthToken: token});
        // let response = await data.json();
        // console.error(response);
        // setDisabled(false);
        // if (response.valid) {
        //     setOpen(false);
        //
        //     // Adds the subject to the list of subjects
        //     let subject = {
        //         subject_name: subjectName,
        //         teacher: teacherName,
        //         room,
        //         description,
        //         background_colour: backgroundColour
        //     }
        //     addSubject(subject);
        //     return;
        // }
        // setError(response.message);
        // setTimeout(() => {
        //     setError("");
        // }, 2000);
    };


    const onClose = () => {
        if (disabled) {
            return;
        }
        setOpen(false);
    }
    return <>
        <Button size="small" className="subject-add-button" variant="outlined" onClick={e => setOpen(true)}>
            Edit
        </Button>

        <Modal className="edit-subject-modal" open={open} onClose={onClose}>
            <form onSubmit={onSubmit}>
                <div className="edit-subject-header">
                    Edit Subject:
                </div>
                <TextField required size="small" autoComplete="off" className="subject-name-input form-field"
                           label="Edit Subject" disabled={disabled} error={subjectNameError > 0}
                           helperText={subjectNameError}
                           value={subjectName} onChange={e => setSubjectName(e.currentTarget.value)}/>

                <TextField required size="small" autoComplete="off" className="teacher-name-input form-field"
                           label="Edit Teacher" disabled={disabled} error={teacherNameError > 0}
                           helperText={teacherNameError}
                           value={teacherName} onChange={e => setTeacherName(e.currentTarget.value)}/>

                <TextField required size="small" autoComplete="off" className="room-name-input form-field"
                           label="Edit Room"
                           disabled={disabled} error={roomError > 0} helperText={roomError} value={room}
                           onChange={e => setRoom(e.currentTarget.value)}/>

                <div className="colour-input-div form-field">
                    <label htmlFor="color-input">Edit background color: {backgroundColour}</label>
                    {/*Colour picker*/}
                    <Button style={{backgroundColor: backgroundColour}} size="small" variant="contained" onClick={openColourPicker}>
                        Edit Colour
                    </Button>
                    <Menu open={colourPickerOpen} onClose={closeColourPicker} anchorEl={anchorEl}>
                        <ChromePicker color={backgroundColour} onChange={(colour) => setBackgroundColour(colour.hex)}/>
                    </Menu>
                </div>

                <TextField size="small" autoComplete="off" className="description-input form-field"
                           label="Edit Description"
                           rows={5} value={description} onChange={e => setDescription(e.currentTarget.value)}
                           multiline={true} disabled={disabled} error={descriptionError > 0}
                           helperText={descriptionError}/>
                <div className="form-footer">
                    <span>
                        {error}
                    </span>
                    <LoadingButton disabled={disabled} className="edit-subject-button" variant="contained"
                                   value="Save Subject"/>
                </div>
            </form>
        </Modal>
    </>
}