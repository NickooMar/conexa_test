import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { config } from 'src/config';
import { InjectModel } from '@nestjs/mongoose';
import { SignupRequestDto } from './dto/signup.dto';
import { SigninRequestDto } from './dto/signin.dto';
import { User } from 'src/modules/auth/schemas/user.schema';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

const { mongooseConfig } = config;

export class AuthService {
  constructor(
    @InjectModel(User.name, mongooseConfig.database)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async singin(payload: SigninRequestDto) {
    const { email, password } = payload;

    const user = await this.userModel.findOne({ email }).exec();

    if (!user) throw new RpcException('user_not_found');

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new RpcException('invalid_password');

    const jwtPayload = {
      sub: user._id,
      email: user.email,
      username: user.username,
    };

    return {
      userId: user._id,
      userEmail: user.email,
      username: user.username,
      accessToken: await this.jwtService.signAsync(jwtPayload),
    };
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

    if (existingUser) throw new RpcException('User already exists');

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
