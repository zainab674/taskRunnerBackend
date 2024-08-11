import { diskStorage } from "multer";
import { extname } from "path";
import { FilesInterceptor } from "@nestjs/platform-express";

export function MultipleFileUpload(fieldName: string, maxCount: number) {
    const dest = 'uploads/';
    return FilesInterceptor(fieldName, maxCount, {
        storage: diskStorage({
            destination: dest,
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join("");
                return cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
    });
}
