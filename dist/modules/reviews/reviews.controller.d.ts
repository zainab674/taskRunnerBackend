import { ReviewsService } from "./reviews.service";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Review } from "./entities/review.entity";
import { User } from "../user/user.schema";
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(user: User, createReviewDto: Review): Promise<import("./entities/review.entity").ReviewDocument>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateReviewDto: UpdateReviewDto): string;
    remove(id: string): string;
}
