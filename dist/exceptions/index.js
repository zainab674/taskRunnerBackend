"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION_MESSAGE = exports.REPUTATION_ERROR_MESSAGE = exports.ErrorCodesMeta = exports.LoggerMessages = exports.ResponseCode = exports.ResponseMessage = void 0;
__exportStar(require("./user-not-found.exception"), exports);
__exportStar(require("./page-type.exception"), exports);
__exportStar(require("./file-not-image.exception"), exports);
var ResponseMessage;
(function (ResponseMessage) {
    ResponseMessage["SUCCESS"] = "Success";
})(ResponseMessage || (exports.ResponseMessage = ResponseMessage = {}));
var ResponseCode;
(function (ResponseCode) {
    ResponseCode[ResponseCode["SUCCESS"] = 200] = "SUCCESS";
    ResponseCode[ResponseCode["CREATED_SUCCESSFULLY"] = 201] = "CREATED_SUCCESSFULLY";
    ResponseCode[ResponseCode["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
    ResponseCode[ResponseCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseCode[ResponseCode["CONTENT_NOT_FOUND"] = 204] = "CONTENT_NOT_FOUND";
    ResponseCode[ResponseCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseCode[ResponseCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseCode[ResponseCode["ALREADY_EXIST"] = 409] = "ALREADY_EXIST";
    ResponseCode[ResponseCode["FORBIDDEN"] = 403] = "FORBIDDEN";
})(ResponseCode || (exports.ResponseCode = ResponseCode = {}));
var LoggerMessages;
(function (LoggerMessages) {
    LoggerMessages["API_CALLED"] = "Api Has Been Called.";
})(LoggerMessages || (exports.LoggerMessages = LoggerMessages = {}));
exports.ErrorCodesMeta = {
    USER_ALREADY_EXISTS: {
        message: "User already exist with this email",
    },
    USER_ALREADY_EXISTS_PHONE: {
        message: "User already exist with this phone no.",
    },
    USER_ALREADY_EXISTS_WITH_USERNAME: {
        message: "User already exist with this userName",
    },
    USER_EMAIL_NOT_VERIFIED: {
        message: "User email is not verified!",
    },
    USER_ACCOUNT_BLOCKED: {
        message: "Your account has been blocked.",
    },
    USER_NOT_EXISTS_WITH_THIS_EMAIL: {
        message: "User not exist with this email",
    },
    USER_NOT_EXISTS_WITH_THIS_REF_CODE: {
        message: "User not exist with this Reference Code!",
    },
    YOUR_PASSWORD_IS_INCORRECT: {
        message: "Your password is incorrect",
    },
    INVALID_CREDENTIALS: {
        message: "Invalid credentials",
    },
    INVALID_OTP: {
        message: "Invalid OTP",
    },
    BAD_REQUEST: {
        message: "Bad Request",
    },
    UNAUTHORIZED: {
        message: "Unauthorized",
    },
    PAYMENT_REQUIRED: {
        message: "Payment Required",
    },
    FORBIDDEN: {
        message: "Forbidden",
    },
    NOT_FOUND: {
        message: "Not Found",
    },
    NOT_ALLOWED: {
        message: "Not Allowed",
    },
    CONFLICT: {
        message: "Conflict",
    },
    INTERNAL_SERVER_ERROR: {
        message: "Internal Server Error",
    },
    ERROR: {
        message: "Error",
    },
    QUESTION_REACHED_MAXIMUM_NUMBER_ANSWERS: {
        message: "Question Has Reached The Maximum Number Of Answers",
    },
    IMAGE_REQUIRED: {
        message: "image Required",
    },
    ROOM_NOT_AVAILABLE: {
        message: "Room is already booked between the given dates",
    },
    HOUSE_NOT_AVAILABLE: {
        message: "Place is already booked between the given dates",
    },
    REVIEW_SUBMITTED: {
        message: "You have already submitted a review.",
    },
    QUESTION_OR_ANSWER_NOT_FOUND: {
        message: "Question Or Answer Not Found",
    },
    PLEASE_CHOOSE_FILTER: {
        message: "Filter Is Required",
    },
    KEYWORD_REQUIRED: {
        message: "keyword Is Required",
    },
    PRICE_RANGE_REQUIRED: {
        message: "Price Range Is Required",
    },
    FAILED_TO_SEND_MESSAGE_TO_WEBSOCKET_SERVER: {
        message: "Failed To Send Message To WebSocket Server",
    },
};
const REPUTATION_ERROR_MESSAGE = (minReputation) => `Reputation Points Must Be At Least ${minReputation} To Create A Post`;
exports.REPUTATION_ERROR_MESSAGE = REPUTATION_ERROR_MESSAGE;
const NOTIFICATION_MESSAGE = (userName, type, response) => `${userName} ${type} to your ${response}`;
exports.NOTIFICATION_MESSAGE = NOTIFICATION_MESSAGE;
//# sourceMappingURL=index.js.map