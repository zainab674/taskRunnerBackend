import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import {
  JSONSchema,
  validationMetadatasToSchemas,
} from "class-validator-jsonschema";
import { Document } from "mongoose";
import { generateHash } from "../../common/utils";
import { RoleType } from "../../constants/role-type";
export type UserDocument = User & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @ApiProperty()
  @JSONSchema({
    description: "Full Name of User",
    title: "Name",
  })
  @Prop({ type: "string", trim: true, })
  fullName: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @ApiProperty()
  @JSONSchema({
    description: "Display Name of User",
    title: "Name",
  })
  @Prop({ type: "string", trim: true, required: false })
  displayName: string;

  @ApiProperty()
  @IsEmail()
  @JSONSchema({
    description: "Email of User",
    title: "Email",
  })
  @Prop({
    type: "string",
    required: false,
    trim: true,
    lowercase: true,
    default: "",
  })
  email: string;


  @IsString()
  @ApiProperty()
  @IsString()
  @MinLength(5)
  @JSONSchema({
    description: "Password of User",
    title: "Password",
  })
  @Prop({ type: "string", trim: true, })
  password: string;



  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(5)
  @JSONSchema({
    description: "Information about User",
    title: "About",
  })
  @Prop({ type: "string", required: false })
  about: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(5)
  @JSONSchema({
    description: "City of User",
    title: "City",

  })
  @Prop({ type: "string", required: false })
  city: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(5)
  @JSONSchema({
    description: "Address of User",
    title: "Address",
  })
  @Prop({ type: "string", required: false })
  address: string;

  @ApiProperty()
  @JSONSchema({
    description: "User email verification",
    title: "Email Verify",
  })
  @Prop({ type: "boolean", default: false, required: false })
  verify: boolean;


  @ApiProperty()
  @JSONSchema({
    description: "User Status",
    title: "Status ",
  })
  @Prop({ type: "boolean", default: false, required: false })
  status: boolean;

  @IsEnum(RoleType)
  @IsOptional()
  @ApiProperty()
  @JSONSchema({
    description: "Role of User",
    title: "Role",
  })
  @Prop({ type: "string", required: false, trim: true, default: RoleType.USER })
  role: string;

  @ApiProperty()
  @Prop({ type: "string", trim: true, })
  otp: string;

  @ApiProperty()
  @Prop({ type: "Boolean", default: false })
  isOtpUsed: boolean;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    type: 'string',
    format: 'binary', // Ensures Swagger knows this is a file upload field
    description: "Avatar of User",
    title: "Avatar",
  })
  @JSONSchema({
    description: "Avatar of User",
    title: "Avatar",
  })
  @Prop({
    type: "string",
    format: 'binary', trim: true, required: false
  })
  avatar: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @JSONSchema({
    description: "phone",
    title: "phone",
  })
  @Prop({ type: "string", trim: true, required: false })
  phone: string;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ userName: "text" });
// Hooks
UserSchema.pre<UserDocument>("save", async function (next) {
  this.password = generateHash(this.password);
  this.email = this.email.toLowerCase();
  next();
});

UserSchema.virtual("id").get(function (this: UserDocument) {
  return this._id.toString();
});
export { UserSchema };
export const userJsonSchema = validationMetadatasToSchemas();
