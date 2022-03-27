export function hasNumber(value) {
    return (/\d/.test(value)) ? true : false;
}

export function hasLowercaseLetter(value) {
    return (/[a-z]/.test(value)) ? true : false;
}

export function hasCapitalcaseLetter(value) {
    return (/[A-Z]/.test(value)) ? true : false;
}