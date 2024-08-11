import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { getCharacterString } from "../../common/utils";
import {
  ErrorCodesMeta,
  ResponseCode,

} from "../../exceptions";
import type { Optional } from "../../types";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument, } from "./user.schema";
import { VerifyAccountDto } from "../auth/dto/verify-account.dto";
import { UserSignupDto } from "../auth/dto/user.signup.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,

  ) { }



  /////////////LOGOUT
  async logout(userId: string): Promise<any> {
    return await this.userModel
      .findByIdAndUpdate(userId, { tokens: [] })
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
  }

  ////////VERIFY BY OTP
  async verifyAccount(dto: VerifyAccountDto): Promise<any> {
    const accExist = await this.findOne({
      email: dto.email,
      otp: dto.otp,
    });
    if (!accExist) {
      throw new HttpException(
        ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL,
        ResponseCode.UNAUTHORIZED
      );
    }
    const data = await this.userModel.updateOne(
      { email: dto.email, otp: dto.otp },
      {
        $set: {
          verify: "true",
          isOtpUsed: "false",
        },
      }
    );

    if (data) {
      return accExist;
    }
  }

  //FIND BY ID
  async getOne(id: string): Promise<User> {
    const data = await this.userModel.findById({ _id: id }).catch((err) => {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    });

    (data.password = ""), (data.otp = "");
    return data;
  }


  //  SINGLE USER
  async findOne(findData: any): Promise<User | null> {
    const user = await this.userModel.findOne(findData).catch((err) => {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    });
    return user;
  }


  //  GET  USER BY EMAIL
  async findByEmail(
    options: Partial<{ email: string }>
  ): Promise<Optional<User>> {
    const user = await this.userModel
      .findOne({ email: options.email })
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    return user;
  }

  async generateString(length) {
    let result = "";
    const characters = getCharacterString();
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  //  CREATE USER
  async createUser(userRegisterDto: UserSignupDto): Promise<UserSignupDto> {
    const createdUser = await new this.userModel(userRegisterDto)
      .save()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    if (createdUser) {
      const getFourDigitRandomNumber = this.generateString(4);
      await this.userModel.findOneAndUpdate(
        { email: userRegisterDto.email },
        {
          $set: {
            otp: (await getFourDigitRandomNumber).toString(),
            isOtpUsed: false,
          },
        }
      );

      return createdUser;
    }
  }


  /////////////UPDATE
  async update(userId: string, userUpdateDto: UpdateUserDto) {
    const returnObj = await this.userModel
      .findByIdAndUpdate(userId, userUpdateDto, { new: true })
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    return { data: returnObj };
  }


  ////////////GET PPROFILE
  async getProfileData(userId: string) {
    const data = await this.userModel
      .findById(userId)
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    data.password = "";
    return data;
  }


  ////////////DELETE USER
  async delete(userId: string) {
    return await this.userModel
      .findByIdAndDelete(userId)
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
  }




  ///////////////////////ALL users
  async findall() {

    const data = await this.userModel.find()
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });

    return {

      data: data,
    };
  }
}
