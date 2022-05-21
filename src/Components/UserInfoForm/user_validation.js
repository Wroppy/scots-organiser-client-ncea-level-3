const minimumNameLength = 3;

const minimumUsernamePasswordLength = 4;

function containsOnlyLettersAndNumbers(string, allowDashes) {
    console.log(`${string} ${allowDashes}`)
    if (allowDashes) {
        console.log(string);

        // Returns if the string contains only letters and numbers, and dashes
        if (/^[a-zA-Z0-9-]+$/.test(string)) {
            return {valid: true, error: ""}
        }
        return {valid: false, error: "Must contain only letters, numbers, and dashes"}
    }
    if (/^[a-zA-Z0-9]+$/.test(string)) {
        return {valid: true, error: ""}
    }
    return {valid: false, error: "Must contain only letters and numbers"}
}

export function isNameValid(name) {
    if (name.length < minimumNameLength) {
        return {valid: false, error: "Name must be at least 3 characters long"};
    }
    return containsOnlyLettersAndNumbers(name, false);
}

export function isUsernameValid(username) {
    // Validates the user
    // Password only includes characters and numbers

    if (username.length < minimumUsernamePasswordLength) {
        return {valid: false, error: `Username must be at least ${minimumUsernamePasswordLength} characters long`};
    }
    return containsOnlyLettersAndNumbers(username, true);
}

export function isPasswordValid(password) {
    if (password.length < minimumUsernamePasswordLength) {
        return {valid: false, error: `Password must be at least ${minimumUsernamePasswordLength} characters long`};
    }
    return containsOnlyLettersAndNumbers(password, false);
}

export function isEmailValid(email) {
    if (email.length > 100){
        return {valid: false, error: "Password must be at under 100 characters long"}
    }
}


