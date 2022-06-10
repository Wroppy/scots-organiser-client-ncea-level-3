import {useState} from "react";
import "./TimetableListView.scss";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import Button from "@mui/material/Button";

// export default function TimetableListView(props) {
//     const days = [
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday", 1,
//     ]
//     const [weekIndex, setWeekIndex] = useState(0);
//     const [dayIndex, setDayIndex] = useState(0);
//     const onWeekChange = (e, newValue) => {
//         setWeekIndex(newValue);
//     }
//
//     const onDayChange = (e, newValue) => {
//         setDayIndex(newValue);
//     }
//
//     return <div className="timetable-list-view">
//         {/*<div className="timetable-week-nav">*/}
//         {/*    <Tabs tabItemContainerStyle={{width: "400px"}} onChange={onWeekChange} value={weekIndex}*/}
//         {/*          variant="scrollable" className="timetable-week-header" scrollButtons="auto" allowScrollButtonsMobile>*/}
//         {/*        <Tab label="Week A"/>*/}
//         {/*        <Tab label="Week B"/>*/}
//         {/*    </Tabs>*/}
//         {/*</div>*/}
//         <div className="timetable-day-nav">
//             <Tabs onChange={onDayChange} value={dayIndex} variant="scrollable"
//                   allowScrollButtonsMobile={true} scrollButtons={true}>
//                 {days.map((day, index) => {
//                     return <Tab label={day} key={index}/>
//                 })}
//             </Tabs>
//         </div>
//     </div>
// }

export default function TimetableListView(props) {
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
    ]
    const [weekIndex, setWeekIndex] = useState(0);
    const [dayIndex, setDayIndex] = useState(0);

    const changeWeek = (e) => {
        // if week = 0, then newValue = 1
        if (weekIndex === 0) {
            setWeekIndex(1);
        }
        else {
            setWeekIndex(0);
        }
    }

    const increaseDay = (e) => {
        if (dayIndex === 4) {
            setDayIndex(0);
        }
        else {
            setDayIndex(dayIndex + 1);
        }
    }
    const decreaseDay = (e) => {
        if (dayIndex === 0) {
            setDayIndex(4);
        }
        else {
            setDayIndex(dayIndex - 1);
        }
    }


    return <div className="timetable-list-view">
        <div className="timetable-week-nav">
            <Button onClick={changeWeek}>
                <KeyboardArrowLeft/>
            </Button>
            <div className="timetable-week-heading">
                {weekIndex === 0  ? "Week A" : "Week B"}
            </div>
            <Button onClick={changeWeek}>
                <KeyboardArrowRight/>
            </Button>
        </div>
        <div className="timetable-day-nav">
            <Button onClick={decreaseDay}>
                <KeyboardArrowLeft/>
            </Button>
            <div className="timetable-day-heading">
                {days[dayIndex]}
            </div>
            <Button onClick={increaseDay}>
                <KeyboardArrowRight/>
            </Button>
        </div>
    </div>
}