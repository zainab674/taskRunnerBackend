import { MailerService } from "@nestjs-modules/mailer";
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(user: any, token: string): Promise<void>;
    sendForgetPasswordEmail(user: any): Promise<string>;
    sendVerifyEMailEmail(user: any): Promise<string>;
}
