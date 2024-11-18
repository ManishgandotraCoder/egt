import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../../../auth/jwt/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

import {
  AuthenticateDto,
  registerDto,
} from '../validation/validation.middleware';
import { messages } from '../../../helpers/messages';
import { unauthorizedUserError } from '../../../helpers/error';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    body: registerDto,
  ) {
    const newUser = await this.authService.register(
      body.firstName,
      body.lastName,
      body.password,
      body.email,
    );
    delete newUser.password;
    return { message: messages.USER_REGISTERED_SUCCESSFULLY, user: newUser };
  }

  @Post('authenticate')
  async authenticate(@Body() body: AuthenticateDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return unauthorizedUserError();
    } else {
      const response = await this.authService.login(user);
      return { ...response, message: messages.USER_AUTHENTICATED_SUCCESSFULLY };
    }
  }
}
