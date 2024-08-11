export * from "./user-not-found.exception";
export * from "./page-type.exception";
export * from "./file-not-image.exception";
export declare enum ResponseMessage {
    SUCCESS = "Success"
}
export declare enum ResponseCode {
    SUCCESS = 200,
    CREATED_SUCCESSFULLY = 201,
    INTERNAL_ERROR = 500,
    NOT_FOUND = 404,
    CONTENT_NOT_FOUND = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    ALREADY_EXIST = 409,
    FORBIDDEN = 403
}
export declare enum LoggerMessages {
    API_CALLED = "Api Has Been Called."
}
export declare const ErrorCodesMeta: {
    USER_ALREADY_EXISTS: {
        message: string;
    };
    USER_ALREADY_EXISTS_PHONE: {
        message: string;
    };
    USER_ALREADY_EXISTS_WITH_USERNAME: {
        message: string;
    };
    USER_EMAIL_NOT_VERIFIED: {
        message: string;
    };
    USER_ACCOUNT_BLOCKED: {
        message: string;
    };
    USER_NOT_EXISTS_WITH_THIS_EMAIL: {
        message: string;
    };
    USER_NOT_EXISTS_WITH_THIS_REF_CODE: {
        message: string;
    };
    YOUR_PASSWORD_IS_INCORRECT: {
        message: string;
    };
    INVALID_CREDENTIALS: {
        message: string;
    };
    INVALID_OTP: {
        message: string;
    };
    BAD_REQUEST: {
        message: string;
    };
    UNAUTHORIZED: {
        message: string;
    };
    PAYMENT_REQUIRED: {
        message: string;
    };
    FORBIDDEN: {
        message: string;
    };
    NOT_FOUND: {
        message: string;
    };
    NOT_ALLOWED: {
        message: string;
    };
    CONFLICT: {
        message: string;
    };
    INTERNAL_SERVER_ERROR: {
        message: string;
    };
    ERROR: {
        message: string;
    };
    QUESTION_REACHED_MAXIMUM_NUMBER_ANSWERS: {
        message: string;
    };
    IMAGE_REQUIRED: {
        message: string;
    };
    ROOM_NOT_AVAILABLE: {
        message: string;
    };
    HOUSE_NOT_AVAILABLE: {
        message: string;
    };
    REVIEW_SUBMITTED: {
        message: string;
    };
    QUESTION_OR_ANSWER_NOT_FOUND: {
        message: string;
    };
    PLEASE_CHOOSE_FILTER: {
        message: string;
    };
    KEYWORD_REQUIRED: {
        message: string;
    };
    PRICE_RANGE_REQUIRED: {
        message: string;
    };
    FAILED_TO_SEND_MESSAGE_TO_WEBSOCKET_SERVER: {
        message: string;
    };
};
export declare const REPUTATION_ERROR_MESSAGE: (minReputation: number) => string;
export declare const NOTIFICATION_MESSAGE: (userName: string, type: string, response: string) => string;
