// import { ApiProperty } from '@nestjs/swagger';
// import { Transform } from 'class-transformer';
// import { IsBoolean, IsOptional, IsString } from 'class-validator';
// import { JSONSchema } from 'class-validator-jsonschema';

// export class UpdatePostDto {


//     @IsString()
//     @IsOptional()
//     @ApiProperty()
//     @JSONSchema({
//       description: "title of the Post",
//       title: "title",
//     })
//     title: string;
  
//     @IsString()
//     @IsOptional()
//     @ApiProperty()
//     @JSONSchema({
//       description: "Description of Post",
//       title: "Description",
//     })
//     description: string;
  
//     @IsOptional()
//     @ApiProperty()
//     @JSONSchema({
//       description: "Images of Post",
//       title: "Images",
//       type: "array",
//       items: {
//         type: "string",
//       },
//     })
//     image: string[];
  
//     @IsString()
//     @IsOptional()
//     @ApiProperty()
//     @JSONSchema({
//       description: "city of Post",
//       title: "city",
//     })
//     city: string;
  
//     @IsString()
//     @IsOptional()
//     @ApiProperty()
//     @JSONSchema({
//       description: "streetAddress of Post",
//       title: "streetAddress",
//     })
//     streetAddress: string;
  
//     @IsString()
//     @IsOptional()
//     @ApiProperty()
//     @JSONSchema({
//       description: "state of Post",
//       title: "state",
//     })
//     state: string;
  
//     @IsString()
//     @IsOptional()
//     @ApiProperty()
//     @JSONSchema({
//       description: "state of Post",
//       title: "state",
//     })
//     zipCode: string;
  
//     @ApiProperty({
//       description: "Coordinates of the location [longitude, latitude]",
//       title: "Coordinates",
//     })
//     location: {
//       type: String;
//       coordinates: [number, number];
//     } = { type: "Point", coordinates: [0, 0] };
  
//     @IsBoolean()@IsOptional()
//     @Transform(({ value }) => value === "true")
//     @ApiProperty()
//     urgent: boolean;
  
//     @IsBoolean()@IsOptional()
//     @Transform(({ value }) => value === "true")
//     @ApiProperty()
//     helpfree: boolean;
  
//     @IsBoolean()@IsOptional()
//     @Transform(({ value }) => value === "true")
//     @ApiProperty()
//     obo: boolean;
  
//     @IsString()
//     @IsOptional()
//     @ApiProperty()
//     price: string;
// }