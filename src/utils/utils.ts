//format dd-MM-YYYY
function dateFormat(date: Date): String {    
    return  `${parseDigitFix(date.getDate(), 2)}-${parseDigitFix(date.getMonth() + 1, 2) }-${date.getFullYear()}T${date.getHours}`;
}

//Fixed (2) digit: 1 ---> '01'
function parseDigitFix(dig: number, fix: number): String {
    return (`0${dig}`).slice(-fix);
}

export const utils = {
    dateFormat,
    parseDigitFix,
}