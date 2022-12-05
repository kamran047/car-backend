import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './components/cars/cars.module';
import { CategoriesModule } from './components/categories/categories.module';
import { UserModule } from './components/user/user.module';
import { Connection } from './database/connection';

@Module({
  imports: [CarsModule, CategoriesModule, UserModule],
  controllers: [AppController],
  providers: [AppService, ...Connection],
})
export class AppModule { }
