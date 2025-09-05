/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    try {
      const { name, email, password, role } = signUpDto;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        role
      });

      const token = this.jwtService.sign({ id: user._id });
      console.log('signUpToken is=>', token);

      return { token };
    } catch (error) {
      console.error('SignUp Error:', error);
      throw new InternalServerErrorException('Failed to sign up');
    }
  }

  // async login(loginDto: LoginDto): Promise<{ token: string }> {
  //     const { email, password } = loginDto;

  //     const user = await this.userModel.findOne({ email });

  //     if (!user) {
  //       throw new InternalServerErrorException('Invalid email or password');
  //     }

  //     const isPasswordMatched = await bcrypt.compare(password, user.password);

  //     if (!isPasswordMatched) {
  //       throw new InternalServerErrorException('Invalid email or password');
  //     }

  //     const token = this.jwtService.sign({ id: user._id });
  //     console.log('Login Token:', token);

  //     return { token };

  // }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    try {
      const token = this.jwtService.sign({ id: user._id });
      console.log('Login Token:', token);

      return { token };
    } catch (error) {
      console.error('Token generation failed:', error);
      throw new InternalServerErrorException('Could not generate token');
    }
  }
}
