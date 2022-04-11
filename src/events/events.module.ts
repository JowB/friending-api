import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Events, EventsSchema } from './schema/events.schema';

@Module({
    controllers: [EventsController],
    providers: [EventsService],
    imports: [
        MongooseModule.forFeature([
            { name: Events.name, schema: EventsSchema },
        ]),
    ],
})
export class EventsModule {}
