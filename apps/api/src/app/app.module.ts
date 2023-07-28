import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { StackModule } from 'src/stack/stack.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule, StackModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
