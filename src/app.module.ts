import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/friending'),
        EventsModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
