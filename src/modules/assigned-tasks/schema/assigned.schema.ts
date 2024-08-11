import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import mongoose, { Document } from "mongoose";

export type AssignedTaskDocument = AssignedTaskEntity & Document;

@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
})
export class AssignedTaskEntity {
    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "PostEntity" })
    taskId: string;

    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    taskRunnerId: string;

    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    OwnerId: string;

    @ApiProperty()
    @Prop({ type: Boolean, default: false })
    isCompleted: boolean;

    @ApiProperty()
    @Prop({ type: Boolean, default: false })
    accepted: boolean;

    @ApiProperty()
    @Prop({ type: Number, min: 1, max: 5 })
    ownerRating: number;

    @ApiProperty()
    @Prop({ type: Number, min: 1, max: 5 })
    taskRunnerRating: number;

    @ApiProperty()
    @Prop({ type: String })
    ownerReview: string;

    @ApiProperty()
    @Prop({ type: String })
    taskRunnerRatingReview: string; // Review given by the owner to the  taskRunner

    @ApiProperty()
    @Prop({ type: Date })
    deadline: Date; // New field for the deadline

}

const AssignedTaskSchema = SchemaFactory.createForClass(AssignedTaskEntity);
// AssignedTaskSchema.index({ location: "2dsphere" });

// Virtual for id
AssignedTaskSchema.virtual("id").get(function (this: AssignedTaskDocument) {
    return this._id.toString();
});

export { AssignedTaskSchema };
export const userJsonSchema = validationMetadatasToSchemas();
