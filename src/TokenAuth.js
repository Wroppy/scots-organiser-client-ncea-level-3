// This handles all the token auth for the client and changes the path based on whether the token is valid or not


import serverFetch from "./Fetches";

export default async function TokenAuth() {
    let token = localStorage.getItem("userAuthToken");
    if (token == null) {
        // Redirects to the login page
        window.location.href = "/login";
    }
    // Checks if the token is valid
    let response = await serverFetch("/is-token-valid", {}, {userAuthToken: token});
    let data = await response.json();
    if (!data.valid) {
        // Redirects to the login page
        window.location.href = "/login";
        // Clears the token
        localStorage.removeItem("userAuthToken");
    }

}