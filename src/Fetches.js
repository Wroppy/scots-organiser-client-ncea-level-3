const urlPrefixes = [
    "http://localhost:8000",
    "https://sc-organisation.herokuapp.com"
];


const urlPrefix = urlPrefixes[0];

async function serverFetch(path, body, headers) {
    // Sends a post request to the server
    headers = {...headers, "Content-Type": "application/json"};
    console.log(headers)
    console.log(`Sending request to ${urlPrefix}${path}`)

    const response = await fetch(`${urlPrefix}${path}`,
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            }
        )
    ;
    return response;
}


export default serverFetch;