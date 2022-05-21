import "./SubjectsPage.scss";
import List from "@mui/material/List";
import {FormControl, InputLabel, ListItem, ListSubheader, MenuItem, Select, SvgIcon, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import {useState} from "react";


function SubjectsPage(props) {
    let filterOptions = [
        "name",
        "teacher",
        "date added"
    ];

    const [filterIndex, setFilterIndex] = useState(0);
    const [filterText, setFilterText] = useState("");

    const handleChange = (event) => {
        setFilterIndex(event.target.value);
    };

    return <div className="subjects-page-container">
        <div className="subjects-navigation">
            <Button className="subject-add-button" variant="contained">
                <Add/>
            </Button>
            <div className="subject-filter-container">
                <TextField size="small" autoComplete="off" className="subject-filter-input" label="Filter Subjects"
                           value={filterText} onChange={e => setFilterText(e.currentTarget.value)}/>
                <FormControl>
                    <InputLabel id="filter-select-label">Filter</InputLabel>
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

        </div>
    </div>
}


export default SubjectsPage;