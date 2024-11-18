import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { badRequestError } from '../../../helpers/error';
import { messages } from '../../../helpers/messages';
import { encryptPassword } from '../../../helpers/utils';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>, // Inject User Repository
    private readonly jwtService: JwtService,
  ) {}

  findUserByEmail = async (email: string) => {
    return this.userRepo.findOne({ where: { email } });
  };

  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    !user && badRequestError(messages.USER_NOT_FOUND);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    !isPasswordValid && badRequestError(messages.INVALID_CREDENTIALS);
    return user;
  }

  async register(
    firstName: string,
    lastName: string,
    password: string,
    email: string,
  ) {
    const existingUser = await this.findUserByEmail(email);
    existingUser && badRequestError(messages.EMAIL_ALREADY_EXISTS);

    const hashedPassword = await encryptPassword(password);

    const user = this.userRepo.create({
      firstName,
      lastName,
      password: hashedPassword,
      email,
    });

    return this.userRepo.save(user);
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      token: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
