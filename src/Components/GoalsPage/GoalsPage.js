import "./GoalsPage.scss";
import {useState, createContext, useEffect} from "react";
import GoalsPageHeader from "./GoalsPageHeader/GoalsPageHeader";
import serverFetch from "../../Fetches";
import GoalViewer from "./GoalViewer/GoalViewer";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import React from "react";

export const GoalsContext = createContext([]);
export const LoadingContext = createContext(true);

export default function GoalsPage() {
    const [goals, setGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [goalFilter, setGoalFilter] = useState("");

    const editGoal = (goalData) => {
        let goalID = goalData.goal_id;
        // Gets the goal
        let i;
        for (i = 0; i < goals.length; i++) {
            let goal = goals[i];
            if (goal.goal_id === goalID) {
                break
            }
        }

        let newGoals = [...goals];
        newGoals[i] = goalData;
        setGoals(newGoals);
    }
    const removeGoal = (goalID) => {
        for (let i = 0; i < goals.length; i++) {
            let goal = goals[i]
            if (goal.goal_id === goalID) {
                let newGoals = [...goals];
                newGoals.splice(i, 1)
                setGoals(newGoals);
            }
        }
    }

    const filterGoal = (goal) => {
        if (goalFilter.length === 0) {
            return true;
        }
        return goal.name.toLowerCase().startsWith(goalFilter.toLowerCase());

    }

    useEffect(() => {
        (async () => {
            let token = localStorage.getItem("userAuthToken");
            const response = await serverFetch("/get-goals", {}, {userAuthToken: token});
            if (response.status === 200) {
                let data = await response.json();
                if (data.valid) {
                    setGoals(data.goals);
                    setIsLoading(false);
                }
            } else {
                console.log(response);
            }
        })();
    }, [])


    return <GoalsContext.Provider value={[goals, setGoals]}>
        <LoadingContext.Provider value={isLoading}>
            <div className="goals-page-container">
                <GoalsPageHeader filterState={[goalFilter, setGoalFilter]}/>
                {/*When it is loading, show a loading symbol. If there are no goals, so text*/}

                {isLoading ?
                    <div style={{flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <LoadingIcon width="30" height="30"/></div> :
                    goals.length === 0 ?
                        <div style={{flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                            You currently have no goals. Press the + button and fill out the form to add a goal
                        </div> :
                        <div className="goals-list-container">
                            {goals.filter(filterGoal).length === 0 ? <div
                                style={{flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                {`You currently have no goals starting with "${goalFilter}"`}
                            </div> : goals.filter(filterGoal).map((goal, index) => {
                                return <GoalViewer editGoal={editGoal} removeGoal={removeGoal} key={index} goal={goal}/>
                            })}
                        </div>
                }
            </div>
        </LoadingContext.Provider>
    </GoalsContext.Provider>
}