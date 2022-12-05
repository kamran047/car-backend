import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: "secret", 
      signOptions: { expiresIn: 432000 + 's' },
    }),
  ],
  providers: [
    AuthService,
    AuthStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
  exports: [
    AuthService,
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: 432000 + 's' },
    }),
  ],
})
export class AuthModule { }
