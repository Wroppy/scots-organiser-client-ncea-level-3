import "./GoalsPage.scss";
import {useState, createContext, useEffect} from "react";
import GoalsPageHeader from "./GoalsPageHeader/GoalsPageHeader";
import serverFetch from "../../Fetches";

export const GoalsContext = createContext([]);
export const LoadingContext = createContext(true);

export default function GoalsPage() {
    const [goals, setGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

            }
            else{
                console.log(response);
            }

        })();
    }, [])


    return <GoalsContext.Provider value={[goals, setGoals]}>
        <LoadingContext.Provider value={isLoading}>
            <div className="goals-page-container">
                <GoalsPageHeader/>
            </div>
        </LoadingContext.Provider>
    </GoalsContext.Provider>;
}