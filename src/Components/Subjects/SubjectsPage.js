import "./SubjectsPage.scss";
import List from "@mui/material/List";
import {ListItem, ListSubheader, SvgIcon, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Add from  "@mui/icons-material/Add";



function SubjectsPage(props) {

    return <div className="subjects-page-container">
        <List className="subjects-list">
            <ListSubheader className="subject-input-container">
                <form className="subject-form" onSubmit={e => e.preventDefault()}>
                    <TextField className="subject-text-field">

                    </TextField>
                    <Button variant="contained">
                        <SvgIcon>
                            <Add/>
                        </SvgIcon>
                    </Button>
                </form>
            </ListSubheader>
        </List>
    </div>
}


export default SubjectsPage;