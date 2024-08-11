import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  // ValidateNested,
} from "class-validator";
import {
  JSONSchema,
  validationMetadatasToSchemas,
} from "class-validator-jsonschema";
import mongoose, { Document } from "mongoose";
import { CommentEntity } from "src/modules/comments/schema/comments.schema";

export type PostDocument = PostEntity & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class PostEntity {
  id: string;


  // USER ID
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  userId: string;

  @IsString()
  @MinLength(1)
  @ApiProperty()
  @JSONSchema({
    description: "title of the Post",
    title: "title",
  })
  @Prop({ type: "string", required: true, trim: true })
  title: string;

  @IsString()
  @MinLength(1)
  @ApiProperty()
  @JSONSchema({
    description: "Description of Post",
    title: "Description",
  })
  @Prop({ type: "string", required: true, trim: true })
  description: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary', // Ensures Swagger knows this is a file upload field
    },
    description: "Images for the post",
    title: "Images",
  })
  @JSONSchema({
    description: "Images for the post",
    title: "Images",
  })
  @Prop({
    type: [String],
    format: 'binary',
    required: false,
  })
  images: string[];



  //  city
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @ApiProperty()
  @JSONSchema({
    description: "City ",
    title: "City",
  })
  @Prop({ type: "string", trim: true, required: true, default: "" })
  city: string;

  //  state
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @ApiProperty()
  @JSONSchema({
    description: "State ",
    title: "State",
  })
  @Prop({ type: "string", trim: true, required: true, default: "" })
  state: string;

  //  zipcode
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @ApiProperty()
  @JSONSchema({
    description: "Zipcode ",
    title: "Zipcode",
  })
  @Prop({ type: "string", trim: true, required: true, default: "" })
  zipcode: string;

  //  zipcode
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @ApiProperty()
  @JSONSchema({
    description: "Street ",
    title: "Street",
  })
  @Prop({ type: "string", trim: true, required: true, default: "" })
  street: string;

  //  price
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @ApiProperty()
  @JSONSchema({
    description: "price ",
    title: "price",
  })
  @Prop({ type: "number", trim: true, required: true, default: "" })
  price: number;


  @ApiProperty()
  @Prop({ type: "Boolean", default: false })
  isUrgent: boolean;

  @ApiProperty()
  @Prop({ type: "Boolean", default: false })
  isFree: boolean;

  @ApiProperty()
  @Prop({ type: "Boolean", default: false })
  obo: boolean;

  @ApiProperty()
  @Prop({ type: "Boolean", default: false })
  isCompleted: boolean;


  @ApiProperty({
    // type: string,
    properties: {
      coordinates: {
        type: 'array',
        items: { type: 'number' },
        example: [40.7128, -74.0060],
        description: 'Array of coordinates: [longitude, latitude]',
      },
    },
  })
  @Prop({

    type: {
      type: String,
      enum: ['Point'],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (value) {
          return value.length === 2;
        },
        message: 'Coordinates must be an array of two numbers [longitude, latitude]',
      },
    },


  })
  location: {
    type: String,

    coordinates: [number, number];
    required: true;
  };


  @ApiProperty()
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentEntity' }])
  comments: CommentEntity[];
}





const PostSchema = SchemaFactory.createForClass(PostEntity);
PostSchema.index({ location: "2dsphere" });

// Hooks
PostSchema.virtual("id").get(function (this: PostDocument) {
  return this._id.toString();
});
export { PostSchema };
export const userJsonSchema = validationMetadatasToSchemas();
//console.log('schemas=>', JSON.stringify(userJsonSchema)); logger , exclude fileds, test cases
