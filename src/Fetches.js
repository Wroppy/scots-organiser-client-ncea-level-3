const urlPrefixes = [
    "http://localhost:8000",
    "https://sc-organisation.herokuapp.com"
];


const urlPrefix = urlPrefixes[1];

async function fetchButLikeFetch(path) {
    const response = await fetch(`${urlPrefix}${path}`);
    return response;
}


export default fetchButLikeFetch;