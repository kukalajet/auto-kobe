import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto, GoogleAuthCredentialsDto } from './dto';

// test
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCrededentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCrededentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/signinwithgoogle')
  signInWithGoogle(
    @Body(ValidationPipe) googleAuthCredentialsDto: GoogleAuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signInWithGoogle(googleAuthCredentialsDto);
  }
}
