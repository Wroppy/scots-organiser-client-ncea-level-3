import React, {useEffect, useState} from "react";
import serverFetch from "../../Fetches";

export default function TestingTemplate() {
    const [text, setText] = useState("")

    useEffect(() => {
            // Sends a fetch request to the server to get the data
        console.log("Fetching data");
        (async () => {
                try {
                    console.log("starting fetch")
                    const token = localStorage.getItem("userAuthToken");
                    let headers = {userAuthToken: token};
                    let response = await serverFetch("/template-testing", {text: "hello there"}, headers);
                    let data = await response.json();
                    console.log(JSON.stringify(data))
                    setText(JSON.stringify(data.text.username));
                } catch (e) {
                    console.log(e);
                    setText(e.message);
                }
            })()
        }, [])

    return <div>
        <div>Template</div>
        <div>{text}</div>
    </div>
}