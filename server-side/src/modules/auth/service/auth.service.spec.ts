import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'test-jwt-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should hash password and return the user object', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null); // Simulate no existing user
      jest.spyOn(userRepository, 'save').mockResolvedValue({
        id: ObjectId.createFromTime(1),
        email: 'test@example.com',
        password: 'hashed-password',
        firstName: 'Test',
        lastName: 'User',
      });

      const user = await service.register(
        'Test',
        'User',
        'password',
        'test@example.com',
      );
      expect(user).toEqual({
        id: ObjectId.createFromTime(1),
        email: 'test@example.com',
        password: 'hashed-password',
        firstName: 'Test',
        lastName: 'User',
      });
    });

    it('should throw an error if the email already exists', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: ObjectId.createFromTime(1),
        email: 'test@example.com',
        password: 'hashed-password',
        firstName: 'Test',
        lastName: 'User',
      });

      await expect(
        service.register('Test', 'User', 'password', 'test@example.com'),
      ).rejects.toThrow('Email already exists');
    });
  });

  describe('validateUser', () => {
    it('should return the user data if credentials are valid', async () => {
      const hashedPassword = await bcrypt.hash('password', 10);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: ObjectId.createFromTime(1),
        email: 'test@example.com',
        password: hashedPassword,
        firstName: 'Test',
        lastName: 'User',
      });

      const user = await service.validateUser('test@example.com', 'password');
      expect(user).toEqual({
        id: ObjectId.createFromTime(1),
        email: 'test@example.com',
        password: hashedPassword,
        firstName: 'Test',
        lastName: 'User',
      });
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.validateUser('nonexistent@example.com', 'password'),
      ).rejects.toThrow('User not found');
    });

    it('should throw an error if the password is invalid', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: ObjectId.createFromTime(1),
        email: 'test@example.com',
        password: 'hashed-password',
        firstName: 'Test',
        lastName: 'User',
      });

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(
        service.validateUser('test@example.com', 'wrong-password'),
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('login', () => {
    it('should return a JWT token for a valid user', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      };

      const result = await service.login(user);
      expect(result).toEqual({
        token: 'test-jwt-token',
        user,
      });
    });
  });
});
