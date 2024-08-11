import { MailService } from "./mail.service";
import { ContactUsDto, UserReportDetailsDto } from "./schema/mail.schema";
import { User } from "../user/user.schema";
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    reportUser(data: UserReportDetailsDto, user: User): Promise<string>;
    contactUs(data: ContactUsDto, user: User): Promise<string>;
}
