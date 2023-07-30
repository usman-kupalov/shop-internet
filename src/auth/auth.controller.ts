import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegistrationDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService, private readonly userSerivece: UserService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/register')
  async register(@Body() dto:  RegistrationDto): Promise<User> {
    await this.userSerivece.checkUserExistByEmail(dto.email);
    return this.userSerivece.createUser(dto); 
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/login')
  async login(@Body() { email, password }: RegistrationDto) {
    const { password: userPassword } = await this.userSerivece.findUserByEmail(email);
    await this.authService.checkPassword(password, userPassword);
    return this.authService.login(email); 
  }
}
