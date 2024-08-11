import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import mongoose, { Document } from 'mongoose';

export type CommentDocument = CommentEntity & Document;

@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
})
export class CommentEntity {
    @ApiProperty()
    @JSONSchema({
        description: "comment ",
        title: "comment",
    })
    @Prop({ type: String, required: true })
    content: string;

    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: string;


    @ApiProperty()
    @JSONSchema({
        description: "ID of the Post",
        title: "postID",
    })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PostEntity', required: true })
    postId: string;


    @ApiProperty()
    @JSONSchema({
        description: "parent of the comment",
        title: "parentCommentId",
    })
    @IsOptional()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CommentEntity', required: false, default: null })
    parentCommentId: string;


    @ApiProperty()
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentEntity' }])
    replies: CommentEntity[];
}

export const CommentSchema = SchemaFactory.createForClass(CommentEntity);
