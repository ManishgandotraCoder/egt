import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppLogger } from './logger';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Specify the path to your .env file (default is '.env')

      isGlobal: true, // Makes the ConfigModule available globally
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb://localhost:27017/nestjs-auth`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoLoadEntities: true,
      logging: true, // Enable query logging
      retryAttempts: 5, // Retry on failure
      retryDelay: 3000, // Delay between retries
    }),

    AuthModule,
  ],
  providers: [AppLogger], // Register AppLogger here
  exports: [AppLogger], // Export if needed in other modules
})
export class AppModule {}
