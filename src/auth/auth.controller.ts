/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('/signup')
  signUp(
    @Body()
    signUpDto: SignUpDto,
  ): Promise<{ token: string }> {
    return this.authservice.signUp(signUpDto);
  }

  @Post('/login')
  login(
    @Body()
    loginDto: LoginDto,
  ): Promise<{ token: string }> {
    return this.authservice.login(loginDto);
  }
}
