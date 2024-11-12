import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { config } from 'src/config';
import { InjectModel } from '@nestjs/mongoose';
import { SignupRequestDto } from './dto/signup.dto';
import { SigninRequestDto } from './dto/signin.dto';
import { BadRequestException } from '@nestjs/common';
import { User } from 'src/database/schemas/user.schema';

const { mongooseConfig } = config;

export class AuthService {
  constructor(
    @InjectModel(User.name, mongooseConfig.database)
    private userModel: Model<User>,
  ) {}

  async singin(payload: SigninRequestDto) {
    const { email } = payload;

    const user = await this.userModel.findOne({ email }).exec();

    if (!user) throw new BadRequestException('User not found');

    return payload;
  }

  async signup(user: SignupRequestDto): Promise<any> {
    const [email, username] = [
      user.email.toLowerCase(),
      user.username.toLowerCase(),
    ];

    const existingUser = await this.userModel
      .findOne({
        $or: [{ email }, { username }],
      })
      .exec();

    if (existingUser) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new this.userModel({
      ...user,
      email,
      username,
      password: hashedPassword,
    });

    return await newUser.save();
  }
}
