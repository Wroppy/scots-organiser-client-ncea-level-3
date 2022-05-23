import {Accordion} from "@mui/material";

export default function SubjectView(props) {
    let subject = props.subject;
    console.log(subject)

    return <div>
        {JSON.stringify(subject)}
    </div>
}