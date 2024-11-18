import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { User } from './entity/user.entity'; // Import User entity
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../auth/jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Register User entity
    PassportModule,
    JwtModule.register({
      secret: 'EASY_GENERATOR_SECRET',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // Export if used in other modules
})
export class AuthModule {}
