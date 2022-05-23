import "./SubjectsPage.scss";
import List from "@mui/material/List";
import {
    FormControl,
    InputLabel,
    ListItem,
    ListSubheader,
    MenuItem,
    Select,
    SvgIcon,
    Table, TableBody, TableCell, TableHead,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import {useEffect, useState} from "react";
import React from "react";
import AddSubjectModal from "./AddSubjectModal/AddSubjectModal";
import serverFetch from "../../Fetches";
import SubjectView from "./SubjectView/SubjectView";


function SubjectsPage(props) {
    let filterOptions = [
        "name",
        "teacher",
        "date added"
    ];

    const [filterIndex, setFilterIndex] = useState(0);
    const [filterText, setFilterText] = useState("");

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        (async () => {
            let token = localStorage.getItem("userAuthToken");
            let response = await serverFetch("/get-subjects", {}, {userAuthToken: token});
            let data = await response.json();
            console.error(data);
            if (!data.valid) {
                console.error("Error getting subjects");
                return;
            }
            setSubjects(data.subjects);
        })()
    }, [])

    const handleChange = (event) => {
        setFilterIndex(event.target.value);
    };

    return <div className="subjects-page-container">
        <div className="subjects-navigation">
            <AddSubjectModal/>
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
            {subjects.length === 0 ?
                <div className="empty-subjects-container">You currently have no subjects. Press the + button and fill
                    out
                    the form to add a subject</div> :
                subjects.map((subject, index) => {
                    return <SubjectView subject={subject} key={index}/>
                })}
        </div>
    </div>
}


export default SubjectsPage;