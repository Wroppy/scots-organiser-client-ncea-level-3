import "./SubjectsPage.scss";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import React from "react";
import AddSubjectModal from "./AddSubjectModal/AddSubjectModal";
import serverFetch from "../../Fetches";
import SubjectView from "./SubjectView/SubjectView";


function SubjectsPage(props) {
    let filterOptions = [
        "name",
        "teacher",
    ];

    const [filterIndex, setFilterIndex] = useState(0);
    const [filterText, setFilterText] = useState("");

    const filterSubjects = (subject) => {
        // Filter subjects based on the filter input
        if (filterText.length === 0) {
            return true;
        }
        return subject.subject_name.toLowerCase().startsWith(filterText.toLowerCase());
    }

    const sortSubjects = (subjectA, subjectB) => {
        let subjectAComparison, subjectBComparison;

        // Sorts by subject name
        if (filterIndex === 0) {
            subjectAComparison = subjectA.subject_name.toUpperCase();
            subjectBComparison = subjectB.subject_name.toUpperCase();
        } else {
            // Sorts by teacher name
            subjectAComparison = subjectA.teacher.toUpperCase();
            subjectBComparison = subjectB.teacher.toUpperCase();

        }
        if (subjectAComparison < subjectBComparison) {
            return -1;
        }
        if (subjectAComparison > subjectBComparison) {
            return 1;
        }
        return 0;
    }

    const [subjects, setSubjects] = useState([]);

    let addSubject = (subject) => {
        setSubjects([...subjects, subject]);
    }

    const removeSubject = (subjectName) => {
        console.log("removing subject")
        for (let i = 0; i < subjects.length; i++) {
            if (subjects[i].subject_name === subjectName) {
                let newSubjects = [...subjects];
                newSubjects.splice(i, 1);
                setSubjects(newSubjects);
                break;
            }
        }
    }

    const updateSubject = (previousSubjectName, subject) => {
        for (let i = 0; i < subjects.length; i++) {
            if (subjects[i].subject_name === previousSubjectName) {
                let newSubjects = [...subjects];
                newSubjects[i] = subject;
                setSubjects(newSubjects);
                break;
            }
        }
    }

    let getSubjectsFromServer = async () => {
        let token = localStorage.getItem("userAuthToken");
        let response = await serverFetch("/get-subjects", {}, {userAuthToken: token});
        let data = await response.json();
        console.error(data);
        if (!data.valid) {
            console.error("Error getting subjects");
            return;
        }
        setSubjects(data.subjects);
    }

    useEffect(() => {
        (async () => {await getSubjectsFromServer()})()
    }, [])

    const handleChange = (event) => {
        setFilterIndex(event.target.value);
    };

    return <div className="subjects-page-container">
        <div className="subjects-navigation">
            <AddSubjectModal addSubject={addSubject}/>
            <div className="subject-filter-container">
                <TextField size="small" autoComplete="off" className="subject-filter-input" label="Filter Subjects"
                           value={filterText} onChange={e => setFilterText(e.currentTarget.value)}/>
                <FormControl>
                    <InputLabel id="filter-select-label">Sort</InputLabel>
                    <Select onChange={handleChange} value={filterIndex} size="small" autoWidth={true} label="filter"
                            labelId="filter-select-label">
                        {filterOptions.map((value, index) => {
                            return <MenuItem value={index} key={index}>{`Sort by ${value}`}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
        </div>
        <div className="subjects-list-container">
            {/*  If there are no subjects, a page saying you can add a subject b y clicking the + button else it will hide it
        and display the subjects*/}
            {subjects.filter(subject => filterSubjects(subject)).length === 0 ?
                <div
                    className="empty-subjects-container">{filterText.length === 0 ? "You currently have no subjects. Press the + button and fill out the form to add a subject" :
                    `You have no subjects starting with the characters "${filterText.toLowerCase()}"`}
                </div> :
                subjects.sort(sortSubjects).filter(subject => filterSubjects(subject)).map((subject, index) => {
                    return <SubjectView editSubject={updateSubject} removeSubject={removeSubject} subject={subject} key={index}/>
                })}
        </div>
    </div>
}


export default SubjectsPage;