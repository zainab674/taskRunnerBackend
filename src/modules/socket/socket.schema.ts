import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
    IsOptional,
    IsString,
    MinLength,
} from "class-validator";
import {
    JSONSchema,
    validationMetadatasToSchemas,
} from "class-validator-jsonschema";

import mongoose, { Document } from 'mongoose';



export type SocketDocument = Socket & Document;
@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
})
export class Socket {
    id: string;

    // RECEPIANT ID
    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    recepientId: string;

    // SENDER ID
    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    senderId: string;


    //Message OF Socket
    @IsOptional()
    @ApiProperty()
    @IsString()
    @MinLength(5)
    @JSONSchema({
        description: "Message",
        title: "Message",
    })
    @Prop({ type: "string" })
    message: string;

    @Prop({ type: String, trim: true, required: false })
    @IsOptional()
    @IsString()
    @MinLength(3)
    @ApiProperty({
        description: 'Image URL or path for the chat message',
        type: 'string',
        format: 'binary',
        required: false, // This is optional
    })
    @JSONSchema({
        description: 'Image for Chat',
        title: 'Image',
    })
    image: string;

    // handshake: any;







}





const SocketSchema = SchemaFactory.createForClass(Socket);
SocketSchema.index({ SocketName: "text" });


SocketSchema.virtual("id").get(function (this: SocketDocument) {
    return this._id.toString();
});
export { SocketSchema };
export const SocketJsonSchema = validationMetadatasToSchemas();
