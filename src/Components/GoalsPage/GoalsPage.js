import "./GoalsPage.scss";
import {useState, createContext, useEffect} from "react";
import GoalsPageHeader from "./GoalsPageHeader/GoalsPageHeader";
import serverFetch from "../../Fetches";
import GoalViewer from "./GoalViewer/GoalViewer";

export const GoalsContext = createContext([]);
export const LoadingContext = createContext(true);

export default function GoalsPage() {
    const [goals, setGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [goalFilter, setGoalFilter] = useState("");


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
                <div className="goals-list-container">
                    {goals.filter(filterGoal).map(
                        (goal, index) => {
                            return <GoalViewer key={index} goal={goal}/>
                        }
                    )}
                </div>
            </div>
        </LoadingContext.Provider>
    </GoalsContext.Provider>
}