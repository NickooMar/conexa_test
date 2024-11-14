import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { config } from '../../config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { SignupRequestDto, SignupResponseDto } from './dto/signup.dto';
import { SigninRequestDto } from './dto/signin.dto';
import { RpcException } from '@nestjs/microservices';
import { User } from '../../modules/auth/schemas/user.schema';

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

    if (!user) throw new RpcException('invalid_credentials');

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new RpcException('invalid_credentials');

    const jwtPayload = {
      sub: user._id,
      role: user.role,
      email: user.email,
      username: user.username,
    };

    return {
      accessToken: await this.jwtService.signAsync(jwtPayload),
    };
  }

  async signup(user: SignupRequestDto): Promise<SignupResponseDto> {
    const [email, username] = [
      user.email.toLowerCase(),
      user.username.toLowerCase(),
    ];

    const existingUser = await this.userModel
      .findOne({
        $or: [{ email }, { username }],
      })
      .exec();

    if (existingUser) throw new RpcException('user_already_exists');

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.userModel.create({
      ...user,
      email,
      username,
      password: hashedPassword,
    });

    const jwtPayload = {
      sub: newUser._id,
      role: newUser.role,
      email: newUser.email,
      username: newUser.username,
    };

    return {
      role: newUser.role,
      userId: newUser._id.toString(),
      userEmail: newUser.email,
      username: newUser.username,
      accessToken: await this.jwtService.signAsync(jwtPayload),
    };
  }
}
