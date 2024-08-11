"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVariableName = exports.stringDecode = exports.stringEncode = exports.validateHash = exports.getCharacterString = exports.generateHash = void 0;
const passwordHash = require("password-hash");
function generateHash(password) {
    return passwordHash.generate(password);
}
exports.generateHash = generateHash;
function getCharacterString() {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
}
exports.getCharacterString = getCharacterString;
function validateHash(password, hash) {
    if (!password || !hash) {
        return Promise.resolve(false);
    }
    return passwordHash.verify(password, hash);
}
exports.validateHash = validateHash;
function stringEncode(valueToEncode, numberOfTimes) {
    for (let i = 0; i < numberOfTimes; i++) {
        valueToEncode = Buffer.from(valueToEncode, 'utf8').toString('base64');
    }
    return valueToEncode;
}
exports.stringEncode = stringEncode;
function stringDecode(valueToDecode, numberOfTimes) {
    for (let i = 0; i < numberOfTimes; i++) {
        valueToDecode = Buffer.from(valueToDecode, 'base64').toString('utf8');
    }
    return valueToDecode;
}
exports.stringDecode = stringDecode;
function getVariableName(getVar) {
    const m = /\(\)=>(.*)/.exec(getVar.toString().replace(/(\r\n|\n|\r|\s)/gm, ''));
    if (!m) {
        throw new Error("The function does not contain a statement matching 'return variableName;'");
    }
    const fullMemberName = m[1];
    const memberParts = fullMemberName.split('.');
    return memberParts[memberParts.length - 1];
}
exports.getVariableName = getVariableName;
//# sourceMappingURL=utils.js.map