import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ResidenteModule } from './residente/residente.module';
import { VigilanciaModule } from './vigilancia/vigilancia.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'apps/back/.env' }),
    DatabaseModule,
    AuthModule,
    AdminModule,
    ResidenteModule,
    VigilanciaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
