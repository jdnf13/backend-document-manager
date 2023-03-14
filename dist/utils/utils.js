"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
//format dd-MM-YYYY
function dateFormat(date) {
    return `${parseDigitFix(date.getDate(), 2)}-${parseDigitFix(date.getMonth() + 1, 2)}-${date.getFullYear()}T${date.getHours}`;
}
//Fixed (2) digit: 1 ---> '01'
function parseDigitFix(dig, fix) {
    return (`0${dig}`).slice(-fix);
}
exports.utils = {
    dateFormat,
    parseDigitFix,
};
