export declare const AppConfig: {
    bucketName: string;
    mongooseConfig: {
        uri: string;
    };
    authConfig: {
        privateKey: string;
        publicKey: string;
        jwtExpirationTime: string;
    };
    documentationEnabled: string;
    userReputationConfig: {
        upVote: string;
        downVote: string;
        updateUpVote: string;
        updateDownVote: string;
    };
    firebaseServerKeyConfig: {
        firebaseServerKey: string;
    };
    appConfig: {
        port: string | number;
        version: string;
    };
    sendGridConfig: {
        host: string;
        secure: string | boolean;
        port: string | number;
        user: string;
        password: string;
        email: string;
    };
    isDevelopment: string;
    isProduction: string;
    isTest: string;
    nodeEnv: string;
};
