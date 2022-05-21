const urlPrefixes = [
    "http://localhost:8000",
    "https://sc-organisation.herokuapp.com"
];


const urlPrefix = urlPrefixes[1];

async function fetchButLikeFetch(path) {
    // Sends a post request to the server

    const response = await fetch(`${urlPrefix}${path}`,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(["hi"]),
            }
        )
    ;
    return response;
}


export default fetchButLikeFetch;