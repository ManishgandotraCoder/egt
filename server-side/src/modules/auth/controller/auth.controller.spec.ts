import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { HttpException, UnauthorizedException } from '@nestjs/common';
import { messages } from '../../../../src/helpers/messages';
import { ObjectId } from 'mongodb';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should successfully register a user and return the user without the password', async () => {
      const mockRegisterDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password@123',
      };

      const mockUser = {
        id: ObjectId.createFromTime(1),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'hashed_password',
      };

      jest.spyOn(authService, 'register').mockResolvedValue(mockUser);

      const result = await authController.register(mockRegisterDto);

      expect(authService.register).toHaveBeenCalledWith(
        mockRegisterDto.firstName,
        mockRegisterDto.lastName,
        mockRegisterDto.password,
        mockRegisterDto.email,
      );
      expect(result).toEqual({
        message: messages.USER_REGISTERED_SUCCESSFULLY,
        user: { ...mockUser, password: undefined },
      });
    });
  });

  describe('authenticate', () => {
    it('should successfully authenticate a user and return a token', async () => {
      const mockAuthenticateDto = {
        email: 'john.doe@example.com',
        password: 'Password@123',
      };

      const mockUser = {
        id: ObjectId.createFromTime(1),
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'hashed_password',
      };

      const mockTokenResponse = {
        token: 'jwt_token',
        user: {
          email: mockUser.email,
          id: mockUser.id,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
        },
      };

      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser);
      jest.spyOn(authService, 'login').mockResolvedValue(mockTokenResponse);

      const result = await authController.authenticate(mockAuthenticateDto);

      expect(authService.validateUser).toHaveBeenCalledWith(
        mockAuthenticateDto.email,
        mockAuthenticateDto.password,
      );
      expect(authService.login).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({
        ...mockTokenResponse,
        message: messages.USER_AUTHENTICATED_SUCCESSFULLY,
      });
    });

    it('should throw unauthorized error if user validation fails', async () => {
      const mockAuthenticateDto = {
        email: 'john.doe@example.com',
        password: 'wrongpassword',
      };

      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      await expect(
        authController.authenticate(mockAuthenticateDto),
      ).rejects.toThrowError(HttpException);

      expect(authService.validateUser).toHaveBeenCalledWith(
        mockAuthenticateDto.email,
        mockAuthenticateDto.password,
      );
      expect(authService.login).not.toHaveBeenCalled();
    });
  });
});
